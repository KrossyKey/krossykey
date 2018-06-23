import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Password, PASSWORD_DEFAULT, SamplePassword } from '../../types/password';
import { SecureItemsPage } from '../secure-items/secure-items';
import { PASSWORD_SCHEMA } from '../../schema/password';
/**
 * Page for displaying passwords
 */

@IonicPage()
@Component({
  selector: 'page-passwords',
  templateUrl: 'passwords.html',
})
export class PasswordsPage extends SecureItemsPage<Password>{

  readonly objectDefaults = PASSWORD_DEFAULT

  /**
   * Intializes __PasswordsPage__
   * @param navCtrl Nav Controller
   * @param navParams Nav Params
   * @param modalCtrl Modal Controller
   */
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl : ModalController) {
      super(navCtrl,navParams,modalCtrl, PASSWORD_SCHEMA)
  }


}
