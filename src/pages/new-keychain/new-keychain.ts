import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CryptoProvider } from '../../providers/crypto/crypto';
import { KEYCHAIN_DEFAULT } from '../../types/keychain';

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

  private passphrase:string = "";

  constructor(private viewCtrl: ViewController, private navParams: NavParams, private crypto : CryptoProvider) {
  }


  createKeychain(passphrase : string){
    this.crypto.encryptObject(passphrase, KEYCHAIN_DEFAULT).then((encrypted : string) =>{
      this.viewCtrl.dismiss(encrypted)
    })       
  }

  importKeychain(file : File){

    var reader = new FileReader();
    reader.readAsText(file);
    const viewCtrl = this.viewCtrl;
    reader.onload=function(){ 
      viewCtrl.dismiss(reader.result)
    }

  }

}
