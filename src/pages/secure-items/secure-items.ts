import { ModalController, Platform } from 'ionic-angular';
import clipboard from 'clipboard-polyfill';
import { Identified } from '../../types/identified';
import { ItemEditorPage } from '../item-editor/item-editor';
import hash from "object-hash";
import { StorageID } from '../../app/app.component';
import { KeychainProvider, StorageResponse } from '../../providers/keychain/keychain';
import { AuthenticatePage } from '../authenticate/authenticate';
import { NewKeychainPage } from '../new-keychain/new-keychain';


export enum KeychainAction{
  EDIT,
  ADD,
  DELETE,
  READ
}


export abstract class SecureItemsPage<T extends Identified> {


    
    /**
     * Object Defaults
     */
    abstract objectDefaults:T;

    /**
     * Items being shown
     */
    private shownItems: {[uuid : string] : null} = {};
  
    private isAuthenticating = false;

    private itemGroups:{[url : string] : T[]} = {};



    /**
     * Raw items
     */
    private rawItems:T[] = [];

  /**
   * Intializes __PasswordsPage__
   * @param modalCtrl Modal Controller
   * @param keychain Keychain Provider
   * @param schema Validation Schema
   * @param storageID Storage ID
   */
    constructor(
      private modalCtrl : ModalController, private keychain: KeychainProvider,
       private schema: {}, private storageID : StorageID, private platform : Platform) {
        this.platform.ready().then(() => {
          this.authenticate(KeychainAction.READ);
           


          this.platform.pause.subscribe(() => {

            this.clearKeychainData();
            
          });
        });

    }


    private clearKeychainData(){
      this.keychain.removePassphraseSecurely();
      this.rawItems = [];
      this.itemGroups = {};
      if (!(this.isAuthenticating)){
        this.authenticate(KeychainAction.READ);
      }
        
    }
  

    private authenticate(keychainAction : KeychainAction, item? : T){
        this.keychain.keychainIsEmpty().then((isEmpty : boolean) => {
          if (!(isEmpty)){
            const afterUnlock = (passphrase : string) =>{
              this.isAuthenticating = true;
              if (passphrase !== undefined && passphrase !== null){
                const keychainUnlocked = this.keychain.unlockKeychain(passphrase);
                  return keychainUnlocked.then((isValid : StorageResponse) => {
                    if (isValid === StorageResponse.SUCCESS){
                      this.keychain.getKeychain(this.storageID, passphrase).then((rawItems : T[]) => {
                        if (item){
                          switch(keychainAction) {
                            case KeychainAction.ADD:
                              this.rawItems = rawItems;
                              this.rawItems.push(item);
                              this.keychain.setKeychainProperty(passphrase,this.storageID,this.rawItems);
                              break;
                            case KeychainAction.EDIT:
                              this.rawItems = rawItems.filter(
                                (filtered : T) =>  filtered.uuid !== item.uuid);
                              this.rawItems.push(item);
                              this.keychain.setKeychainProperty(passphrase,this.storageID,this.rawItems);
                              break;
                            case KeychainAction.DELETE:
                              this.rawItems = this.rawItems.filter(
                                (item : T) =>  item.uuid !== item.uuid);
                              this.keychain.setKeychainProperty(passphrase,this.storageID,this.rawItems);
                              break;
                            default:
                              break;
                            
                          }
                          this.keychain.storePassphraseSecurely(passphrase);
                          this.itemGroups = this.getItemGroups(this.rawItems);
                        }else{
                          if (keychainAction === KeychainAction.READ){
                            this.rawItems = rawItems;
                            this.keychain.storePassphraseSecurely(passphrase);
                            this.itemGroups = this.getItemGroups(this.rawItems);
                          }
                        }

                      });
                    }else{
                      this.keychain.removePassphraseSecurely();
                      this.authenticate(keychainAction,item);
                    }
                });
              }
            };
            this.keychain.fetchPassphraseSecurely().then((passphraseFromStorage : string) => {
              if (passphraseFromStorage !== null && passphraseFromStorage !== undefined){
                afterUnlock(passphraseFromStorage);
              }else{
                
                const authenticateModal = this.modalCtrl.create(AuthenticatePage,{},{ enableBackdropDismiss: false });
                authenticateModal.onDidDismiss((passphrase : string) => {
                  afterUnlock(passphrase);
                  this.isAuthenticating = false;
                });
                authenticateModal.present();

              }
            });

        }else{
          this.configureKeychain();
        }
      });
    }


    private configureKeychain(){
      const importModal = this.modalCtrl.create(NewKeychainPage,{},{ enableBackdropDismiss: false });
        
      importModal.onDidDismiss((encrypted : string) => {
        if (encrypted !== undefined && encrypted !== null){
          this.keychain.setRawKeychain(encrypted).then(() => {
            this.authenticate(KeychainAction.READ);
            this.isAuthenticating = false;
          })
        }
      });
      importModal.present();
    }




    
    /**
     * Sorts items by url
     * @param items All Items 
     */
    private getItemGroups(items : T[]):{[url : string] : T[]}{      
      const itemGroups:{[property : string] : T[] } = {};
      items.forEach(item => {
        if (itemGroups[item.url]){
          itemGroups[item.url].push(item);
        }else{
          itemGroups[item.url] = [];
          itemGroups[item.url].push(item);
        }
      });
      return itemGroups;
    }

  
    /**
     * Gets all item groups
     * @param itemGroups Item groups
     */
    private itemGroupsNames(itemGroups : {[url : string] : T[]}):string[]{
      return Object.keys(itemGroups);
    }
  
    /**
     * Shows a specific item
     * @param uuid UUID of item
     */
    showItem(uuid : string){
      this.shownItems[uuid] = null;
    }
  
    /**
     * Hides a specific item
     * @param uuid UUID of item
     */
    private hideItem(uuid : string){
      delete this.shownItems[uuid];
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
      const oldChecksum = hash(item);
        const editModal = this.modalCtrl
          .create(ItemEditorPage, { item: JSON.parse(JSON.stringify(item)) as T, addItem : false, schema : this.schema });
        editModal.onDidDismiss((newItem : T) => {
          if (newItem !== undefined && newItem !== null){
            const newChecksum = hash(newItem);
            if (oldChecksum !== newChecksum){
              this.authenticate(KeychainAction.EDIT, newItem);
            }
          }
        });
        editModal.present();
    }
  
    /**
     * Delete item
     * @param uuid Identifier of item
     */
    private deleteItem(item : T){
      this.authenticate(KeychainAction.DELETE, item);
      // Gooz
      // this.itemGroups = this.sortItems(this.rawItems)
    }
  
    /**
     * Adds item
     */
    private addItem(){
      const date = new Date();
      const epoch = date.getTime();
      const uuid = hash(epoch + "com.krossykey.identifier");
      const defaults = (JSON.parse(JSON.stringify(this.objectDefaults)) as T);
      defaults.uuid = uuid;

      const editModal = this.modalCtrl
        .create(ItemEditorPage, { item: defaults , addItem : true, schema : this.schema});
      editModal.onDidDismiss((newItem : T)=> {
        if (newItem !== undefined && newItem !== null && (
            this.rawItems.filter(
              (filtered : T) =>  filtered.uuid === newItem.uuid).length === 0)){
                this.authenticate(KeychainAction.ADD, newItem);
              }
      });
      editModal.present();
    }
  
  }
  