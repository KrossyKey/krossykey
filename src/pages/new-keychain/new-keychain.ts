import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { CryptoProvider } from '../../providers/crypto/crypto';
import { KEYCHAIN_DEFAULT } from '../../types/keychain';
import { Storage } from '@ionic/storage';
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

  constructor(private viewCtrl: ViewController,
    private crypto : CryptoProvider, private storage : Storage) {
  }


  createKeychain(passphrase : string){
    this.crypto.encryptObjectFromPhrase(passphrase, KEYCHAIN_DEFAULT).then((encrypted : string) =>{
      this.viewCtrl.dismiss(encrypted);
    });       
  }

  importKeychain(file : File){
    if (file['path']){
      this.storage.set('keychainFilePath',file['path']);
    }
    const reader = new FileReader();
    reader.readAsText(file);
    const viewCtrl = this.viewCtrl;
    reader.onload= () => {
      viewCtrl.dismiss(reader.result);
    };

  }

}
