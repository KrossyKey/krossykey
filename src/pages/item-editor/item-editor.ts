import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, ToastController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation/validation';
import { LocalizedToastProvider } from '../../providers/localized-toast/localized-toast';
import { PasswordGeneratorPage } from '../password-generator/password-generator';
import { Account } from '../../types/account';
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
   * Validation Schema
   */
  private schema:{};

  /**
   * Validation Provider
   */
  private validationProvider:ValidationService<T>;
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
  readonly previousVal:T;
  /**
   * Item to be edited or added
   */
  private item:T;
  /**
   * Intializes EditPasswordPage
   * @param viewCtrl View Controller
   * @param navParams Navigation Parameters
   * @param formBuilder Form Builder
   * @param translate Translation Service
   */
  constructor(public viewCtrl: ViewController, public navParams: NavParams, 
    formBuilder: FormBuilder, private localizedToastProvider : LocalizedToastProvider, private modalCtrl : ModalController) {
    this.item = navParams.get('item') as T;
    this.addItem = navParams.get('addItem') as boolean;
    this.schema = navParams.get('schema') as boolean;

    this.validationProvider = new ValidationService(this.schema,this.item);

    this.previousVal = JSON.parse(JSON.stringify(this.item));
    const validators = {};
    this.properties = Object.keys(this.item).filter((item : string) => item !== "uuid" );
    this.properties.forEach(property => {
      
        validators[property] =  new FormControl('', Validators.compose([
          Validators.minLength(1)
        ]));
    });

    this.form = formBuilder.group(validators);
  
  }


  presentPasswordGenerator(id : string){
    const passwordGenModal = this.modalCtrl.create(PasswordGeneratorPage, {});
    passwordGenModal.onDidDismiss((genPassword : string) => {

      if (genPassword !== undefined && genPassword !== null){
        this.item["password"] = genPassword;
        
      }
    });
    passwordGenModal.present();
  }


  

  /**
   * Dismisses Page 
   */
  dismiss() {
    if (this.addItem){
      this.viewCtrl.dismiss();
    }else{
      this.viewCtrl.dismiss(this.previousVal);
    }

  }


  /**
   * Dismisses Page 
   */
  save() {
    if (this.form.valid && this.validationProvider.isValid){
      this.viewCtrl.dismiss(this.item);
    }else{
      this.localizedToastProvider.displayToastFor('validation.invalidForm');
    }
    
  }

}
