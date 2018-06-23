import { NavController, NavParams, Button, ModalController } from 'ionic-angular';
import clipboard from 'clipboard-polyfill'
import { Identified } from '../../types/identified';
import { ItemEditorPage } from '../item-editor/item-editor';
import hash from "object-hash"
import { StorageID } from '../../app/app.component';
import { KeychainProvider } from '../../providers/keychain/keychain';

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
        this.keychain.doneLoading.then(() => {
          this.rawItems = keychain.getKeychain(this.storageID) as T[]
          this.itemGroups = this.sortItems(this.rawItems)
        })
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
              this.rawItems = this.rawItems.filter(
                (filtered : T) =>  filtered.uuid !== newItem.uuid)
              this.rawItems.push(newItem)
              this.itemGroups = this.sortItems(this.rawItems)
              this.keychain.setKeychain(this.storageID,this.rawItems)
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
            this.rawItems.push(item)
            this.itemGroups = this.sortItems(this.rawItems)
            this.keychain.setKeychain(this.storageID,this.rawItems)
          }
      });
      editModal.present();
    }
  
  }
  