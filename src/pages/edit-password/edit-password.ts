import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Password } from '../../types/password';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import hash from 'object-hash';
import { Identified } from '../../types/identified';
/**
 * Edit and add passwords
 */
@IonicPage()
@Component({
  selector: 'page-edit-password',
  templateUrl: 'edit-password.html',
})
export class EditPasswordPage {

  private form: FormGroup;
  private addPass:boolean;

  readonly previousVal:Identified<Password>;
  private password:Identified<Password>;
  /**
   * Intializes EditPasswordPage
   * @param viewCtrl View Controller
   * @param navParams Navigation Parameters
   */
  constructor(public viewCtrl: ViewController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.password = navParams.get('password') as Identified<Password>
    this.addPass = navParams.get('addPass') as boolean

    this.previousVal = JSON.parse(JSON.stringify(this.password));
    this.form = this.formBuilder.group({
      userName: new FormControl('', Validators.compose([
        Validators.minLength(1)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(1)
      ])),
      title: new FormControl('', Validators.compose([
        Validators.minLength(1)
      ])),
      url: new FormControl('', Validators.compose([
        Validators.minLength(1)
      ]))
    });
  
  }

  /**
   * Dismisses Page 
   */
  dismiss() {
    if (this.addPass){
      this.viewCtrl.dismiss();
    }else{
      this.password = this.previousVal
      this.viewCtrl.dismiss();
    }

  }


  /**
   * Dismisses Page 
   */
  save() {
    if (this.form.valid){
      this.viewCtrl.dismiss(this.password);
    }
  }

}
