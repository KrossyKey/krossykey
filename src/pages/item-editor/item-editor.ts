import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Identified } from '../../types/identified';
/**
 * Edit and add passwords
 */
@IonicPage()
@Component({
  selector: 'page-item-editor',
  templateUrl: 'item-editor.html',
})
export class ItemEditorPage<T> {

  /**
   * Form
   */
  private form: FormGroup;
  /**
   * Whether item is being added
   */
  private addItem:boolean;
  /**
   * Properties of item
   */
  private properties:string[];
  /**
   * Original value of item
   */
  readonly previousVal:Identified<T>;
  /**
   * Item to be edited or added
   */
  private item:Identified<T>;
  /**
   * Intializes EditPasswordPage
   * @param viewCtrl View Controller
   * @param navParams Navigation Parameters
   * @param formBuilder Form Builder
   */
  constructor(public viewCtrl: ViewController, public navParams: NavParams, formBuilder: FormBuilder) {
    this.item = navParams.get('item') as Identified<T>
    this.addItem = navParams.get('addItem') as boolean

    this.previousVal = JSON.parse(JSON.stringify(this.item));
    const validators = {}
    this.properties = Object.keys(this.item.model)
    this.properties.forEach(property => {
      
        validators[property] =  new FormControl('', Validators.compose([
          Validators.minLength(1)
        ]))
    });

    this.form = formBuilder.group(validators);
  
  }

  /**
   * Dismisses Page 
   */
  dismiss() {
    if (this.addItem){
      this.viewCtrl.dismiss();
    }else{
      this.item = this.previousVal
      this.viewCtrl.dismiss();
    }

  }


  /**
   * Dismisses Page 
   */
  save() {
    if (this.form.valid){
      this.viewCtrl.dismiss(this.item);
    }
  }

}
