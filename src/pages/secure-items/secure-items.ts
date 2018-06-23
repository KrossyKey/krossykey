import { NavController, NavParams, Button, ModalController } from 'ionic-angular';
import clipboard from 'clipboard-polyfill'
import { Identified } from '../../types/identified';
import { ItemEditorPage } from '../item-editor/item-editor';
import hash from "object-hash"

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
     * Intializes __SecureItemsPage__
     * @param navCtrl Nav Controller
     * @param navParams Nav Params
     */
    constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      public modalCtrl : ModalController, private schema: {}) {
        if (navParams.get('rawItems') as T[]){
          this.rawItems = navParams.get('rawItems') as T[]
          console.log(this.rawItems)
          this.itemGroups = this.sortItems(this.rawItems)
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
        let editModal = this.modalCtrl
          .create(ItemEditorPage, { item: item, addItem : false, schema : this.schema });
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
        if (item !== undefined && (
            this.rawItems.filter(
              (filtered : T) =>  filtered.uuid === item.uuid).length === 0)){
            this.rawItems.push(item)
            this.itemGroups = this.sortItems(this.rawItems)
          }
      });
      editModal.present();
    }
  
  }
  