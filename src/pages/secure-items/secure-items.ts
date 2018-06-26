import { NavController, NavParams, Button, ModalController } from 'ionic-angular';
import clipboard from 'clipboard-polyfill'
import { Identified } from '../../types/identified';
import { ItemEditorPage } from '../item-editor/item-editor';
import hash from "object-hash"
import { StorageID } from '../../app/app.component';
import { KeychainProvider, StorageResponse } from '../../providers/keychain/keychain';
import { AuthenticatePage } from '../authenticate/authenticate';
import { NewKeychainPage } from '../new-keychain/new-keychain';

export abstract class SecureItemsPage<T extends Identified> {

    /**
     * Object Defaults
     */
    abstract objectDefaults:T;

    /**
     * Items being shown
     */
    private shownItems: {[uuid : string] : null} = {}
  
    /**
     * Raw items
     */
    private rawItems:T[] = []
    /**
     * List of items
     */
    private itemGroups: {[url : string] : T[]} = {}
  
  /**
   * Intializes __PasswordsPage__
   * @param modalCtrl Modal Controller
   * @param keychain Keychain Provider
   * @param schema Validation Schema
   * @param storageID Storage ID
   */
    constructor(
      private modalCtrl : ModalController, private keychain: KeychainProvider,
       private schema: {}, private storageID : StorageID) {
        const additionalFunction = (passphase : string) => {
          this.rawItems = this.keychain.getKeychain(this.storageID) as T[]
          this.itemGroups = this.sortItems(this.rawItems)
        }
        this.authenticate(additionalFunction)

    }


    authenticate(additionalFunction : Function){

      this.keychain.storage.get('keychain').then((encrypted : string) => {

      if (encrypted){
        let authenticateModal = this.modalCtrl.create(AuthenticatePage,{},{ enableBackdropDismiss: false });
        const crytoKey = this.keychain.crypto.getTokenFromCookie("cryptoKey")
  
        if (crytoKey){
          this.setKeychain(crytoKey, additionalFunction)
        }else{
          authenticateModal.onDidDismiss((passphase : string) => {
            if (passphase !== undefined && passphase !== null){
              this.setKeychain(passphase,additionalFunction)
            }
          })
          authenticateModal.present()
        }
      }else{
        let importModal = this.modalCtrl.create(NewKeychainPage,{},{ enableBackdropDismiss: false });
        
        importModal.onDidDismiss((encrypted : string) => {
          if (encrypted !== undefined && encrypted !== null){
            this.keychain.storage.set('keychain',encrypted)
            const additionalFunction = (passphase : string) => {
              this.rawItems = this.keychain.getKeychain(this.storageID) as T[]
              this.itemGroups = this.sortItems(this.rawItems)
            }
            this.authenticate(additionalFunction)
          }
        })
        importModal.present()

      }
      
    })

    }

    setKeychain(passphase : string, additonalFunction : Function){
      const keychainUnlocked = this.keychain.unlockKeychain(passphase)
      if (keychainUnlocked){
        return keychainUnlocked.then((isValid : StorageResponse) => {
          if (isValid === StorageResponse.SUCCESS){
            additonalFunction(passphase)
            this.keychain.crypto.setTokenInCookie("cryptoKey",passphase,180*1000)
          }else{
            this.keychain.crypto.deleteCookie("cryptoKey")
            this.authenticate(additonalFunction)
          }
        })
      }
    }


    
    /**
     * Sorts items by url
     * @param items All Items 
     */
    sortItems(items : T[]):{[url : string] : T[]}{      
      const itemGroups:{[property : string] : T[] } = {}
      items.forEach(item => {
        if (itemGroups[item.url]){
          itemGroups[item.url].push(item)
        }else{
          itemGroups[item.url] = []
          itemGroups[item.url].push(item)
        }
      });
      return itemGroups
    }
  
    /**
     * Gets all item groups
     * @param itemGroups Item groups
     */
    itemGroupsNames(itemGroups : {[url : string] : T[]}):string[]{
      return Object.keys(itemGroups)
    }
  
    /**
     * Shows a specific item
     * @param uuid UUID of item
     */
    showItem(uuid : string){
      this.shownItems[uuid] = null
    }
  
    /**
     * Hides a specific item
     * @param uuid UUID of item
     */
    hideItem(uuid : string){
      delete this.shownItems[uuid]
    }
  
    /**
     * Copies string to clipboard
     * @param stringToCopy String to copy
     */
    private copyToClipboard(stringToCopy : string){
      clipboard.writeText(stringToCopy);
    }
  
    /**
     * Edits item
     * @param item __Identified<T>__
     */
    private editItem(item : T){
      const oldChecksum = hash(item)
        let editModal = this.modalCtrl
          .create(ItemEditorPage, { item: JSON.parse(JSON.stringify(item)) as T, addItem : false, schema : this.schema });
        editModal.onDidDismiss((newItem : T) => {
          if (newItem !== undefined && newItem !== null){
            const newChecksum = hash(newItem)
            if (oldChecksum !== newChecksum){

              const additionalFunction = (passphase : string) => {
                this.rawItems = this.rawItems.filter(
                  (filtered : T) =>  filtered.uuid !== newItem.uuid)
                this.rawItems.push(newItem)
                this.itemGroups = this.sortItems(this.rawItems)
                this.keychain.setKeychainProperty(passphase,this.storageID,this.rawItems)

              }

              this.authenticate(additionalFunction)

            }
          }
        })
        editModal.present();
    }
  
    /**
     * Delete item
     * @param uuid Identifier of item
     */
    private deleteItem(uuid : string){
      this.rawItems = this.rawItems.filter(
        (item : T) =>  item.uuid !== uuid);
      this.itemGroups = this.sortItems(this.rawItems)
    }
  
    /**
     * Adds item
     */
    private addItem(){
      const epoch = (new Date).getTime();
      const uuid = hash(epoch + "com.krossykey.identifier")
      const defaults = (JSON.parse(JSON.stringify(this.objectDefaults)) as T)
      defaults.uuid = uuid

      let editModal = this.modalCtrl
        .create(ItemEditorPage, { item: defaults , addItem : true, schema : this.schema});
      editModal.onDidDismiss((item : T)=> {
        if (item !== undefined && item !== null && (
            this.rawItems.filter(
              (filtered : T) =>  filtered.uuid === item.uuid).length === 0)){
            const additionalFunction = (passphase : string) => {
              this.rawItems.push(item)
              this.itemGroups = this.sortItems(this.rawItems)
              this.keychain.setKeychainProperty(passphase,this.storageID,this.rawItems)
            }
            this.authenticate(additionalFunction)
          }
      });
      editModal.present();
    }
  
  }
  