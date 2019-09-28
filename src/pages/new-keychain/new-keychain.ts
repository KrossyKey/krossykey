import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { CryptoProvider } from '../../providers/crypto/crypto';
import { KEYCHAIN_DEFAULT } from '../../types/keychain';
import { KeychainProvider } from '../../providers/keychain/keychain';
/**
 * Generated class for the NewKeychainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-keychain',
  templateUrl: 'new-keychain.html',
})

export class NewKeychainPage {

  private passphrase = "";
  private keychainString = "";
  constructor(private viewCtrl: ViewController,
    private crypto : CryptoProvider, private keychainProvider : KeychainProvider) {
  }


  createKeychain(passphrase : string){
    this.crypto.encryptObjectFromPhrase(passphrase, KEYCHAIN_DEFAULT).then((encrypted : string) =>{
      this.viewCtrl.dismiss(encrypted);
    });       
  }

  setKeychainfromRawText(){
    this.viewCtrl.dismiss(this.keychainString);
  }

  importKeychain(file : File){
    if (file['path']){
      this.keychainProvider.setKeychainPath(file['path'])
    }
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload= () => {
      this.viewCtrl.dismiss(reader.result);
    };

  }

}
