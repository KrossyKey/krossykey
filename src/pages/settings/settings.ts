import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { KeychainProvider, StorageResponse } from '../../providers/keychain/keychain';
import { LocalizedToastProvider } from '../../providers/localized-toast/localized-toast';



@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  private oldPass = "";
  private newPass = "";
  private confPass = "";

  constructor(private keychainProvider : KeychainProvider, private localizedToast : LocalizedToastProvider){
  }

  /**
   * Changes language of App
   */
  changePassword(oldPass : string, newPass : string){

    this.keychainProvider.changePassphrase(oldPass,newPass).then((resp : StorageResponse) => {
      if (resp === StorageResponse.SUCCESS){
        this.localizedToast.displayToastFor("validation.successPassChange");
        this.oldPass = "";
        this.newPass = "";
        this.confPass = "";
      }else{
        this.localizedToast.displayToastFor("validation.failedPassChange");
      }
    });
  }
  exportKeychain(){
    
  }


}
