import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Password, PASSWORD_DEFAULT, SamplePassword } from '../../types/password';
import { SecureItemsPage } from '../secure-items/secure-items';
import { PASSWORD_SCHEMA } from '../../schema/password';
import { KeychainProvider } from '../../providers/keychain/keychain';
import { StorageID } from '../../app/app.component';
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
   * @param modalCtrl Modal Controller
   * @param keychain Keychain Provider
   */
  constructor(
    modalCtrl : ModalController, keychain : KeychainProvider) {
      super(modalCtrl,keychain, PASSWORD_SCHEMA, StorageID.passwords)
  }


}
