import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { KeychainProvider } from '../../providers/keychain/keychain';

@IonicPage()
@Component({
  selector: 'page-authenticate',
  templateUrl: 'authenticate.html',
})
export class AuthenticatePage {

/**
 * Passphrase to authenticate
 */
private passphrase = "";

  /**
   * Intializes EditPasswordPage
   * @param viewCtrl View Controller
   * @param navParams Navigation Parameters
   */
  constructor(private keychainProvider : KeychainProvider, private viewCtrl: ViewController, private navParams: NavParams) {
  
  }

  /**
   * Passes Passphrase to keychain
   */
  passKeychain() {
    this.viewCtrl.dismiss(this.passphrase);
  }

  /**
   * Removes Keychain
   */
  removeKeychain() {
    this.keychainProvider.removeKeychain();
    location.reload();
  }


}
