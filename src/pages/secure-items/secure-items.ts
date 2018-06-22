import { NavController, NavParams, Button, ModalController } from 'ionic-angular';
import clipboard from 'clipboard-polyfill'
import { Identified } from '../../types/identified';
import { ItemEditorPage } from '../item-editor/item-editor';
import { Password } from '../../types/password';
import { SecureNote } from '../../types/secure-note';
import { TwoFactor } from '../../types/two-factor';

export abstract class SecureItemsPage<T extends Password  | SecureNote | TwoFactor> {

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
    private _rawItems:Identified<T>[] = []
    /**
     * List of items
     */
    private itemGroups: {[url : string] : Identified<T>[]} = {}
  
    /**
     * Intializes __SecureItemsPage__
     * @param navCtrl Nav Controller
     * @param navParams Nav Params
     */
    constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      public modalCtrl : ModalController, rawItems : Identified<T>[]) {
      this._rawItems = rawItems
      this.itemGroups = this.sortItems(this._rawItems)
    }
  


    /**
     * Sorts items by url
     * @param items All Items 
     */
    sortItems(items : Identified<T>[]):{[url : string] : Identified<T>[]}{
      const checksums:{[checksum : string] : Identified<T>} = {}
      
      const itemGroups:{[property : string] : Identified<T>[] } = {}
      items.forEach(items => {
        if (itemGroups[items.model.url]){
          itemGroups[items.model.url].push(items)
        }else{
          itemGroups[items.model.url] = []
          itemGroups[items.model.url].push(items)
        }
      });
      return itemGroups
    }
  
    /**
     * Gets all item groups
     * @param itemGroups Item groups
     */
    itemGroupsNames(itemGroups : {[url : string] : Identified<T>[]}):string[]{
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
    private editItem(item : Identified<T>){
        let editModal = this.modalCtrl
          .create(ItemEditorPage, { item: item, addItem : false });
        editModal.present();
    }
  
    /**
     * Delete item
     * @param uuid Identifier of item
     */
    private deleteItem(uuid : string){
      this._rawItems = this._rawItems.filter(
        (item : Identified<T>) =>  item.uuid !== uuid);
      this.itemGroups = this.sortItems(this._rawItems)
    }
  
    /**
     * Adds item
     */
    private addItem(){
      let editModal = this.modalCtrl
        .create(ItemEditorPage, { item: new Identified(JSON.parse(JSON.stringify(this.objectDefaults))) , addPass : true});
      editModal.onDidDismiss((item : Identified<T>)=> {
        if (item !== undefined && (
            this._rawItems.filter(
              (filtered : Identified<T>) =>  filtered.uuid === item.uuid).length === 0)){
            this._rawItems.push(item)
            this.itemGroups = this.sortItems(this._rawItems)
          }
      });
      editModal.present();
    }
  
  }
  