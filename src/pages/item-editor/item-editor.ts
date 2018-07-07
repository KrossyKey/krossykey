import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, ToastController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation/validation';
import { LocalizedToastProvider } from '../../providers/localized-toast/localized-toast';
import { PasswordGeneratorPage } from '../password-generator/password-generator';
import { Account, ACCOUNT_DEFAULT } from '../../types/account';
import { ACCOUNT_SCHEMA } from '../../schema/account';
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
    ACCOUNT_SCHEMA.properties.password.minLength;
    this.properties = Object.keys(this.schema["properties"]).filter((propName : string) => !(this.schema["properties"][propName]["hidden"]) );
    const validatedFields = this.schema['required'].filter((propName : string) => !(this.schema["properties"][propName]["hidden"]) );
    this.properties.forEach(property => {
      if (!(this.item[property])){
        this.item[property] = "";
      }
      const validationRequirements = (validatedFields.indexOf(property) > -1) ?
        [
          Validators.minLength(1)
        ] : [Validators.minLength(0)];
        validators[property] =  new FormControl(Validators.compose(validationRequirements));
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
    this.properties.forEach(property => {
      if (this.item[property] === ""){
        delete this.item[property];
      }
    });
    if (this.form.valid && this.validationProvider.isValid){
      this.viewCtrl.dismiss(this.item);
    }else{
      this.localizedToastProvider.displayToastFor('validation.invalidForm');
    }
    
  }

}
