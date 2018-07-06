import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PasswordGeneratorProvider, PasswordOption } from '../../providers/password-generator/password-generator';

/**
 * Generated class for the PasswordGeneratorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-generator',
  templateUrl: 'password-generator.html',
})
export class PasswordGeneratorPage {

  private passwordLength = 20;
  private options = [PasswordOption.numeric,PasswordOption.upper,PasswordOption.lower,PasswordOption.special];
  private generatedPassword = "";
  constructor(private viewCtrl: ViewController, private passwordGenerator : PasswordGeneratorProvider) {
    this.generatedPassword = this.passwordGenerator.generate(this.passwordLength,this.options);
  }



  private updatePassword(){
    this.generatedPassword = this.passwordGenerator.generate(this.passwordLength,this.options);
  }

  /**
   * Dismisses Page 
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  /**
   * Sets password that was generated
   * @param password Password to set
   */
  setPassword(password : string){
    this.viewCtrl.dismiss(password);

  }

}
