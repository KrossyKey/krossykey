import { Component } from '@angular/core';
import { IonicPage, ModalController, Platform } from 'ionic-angular';
import { Account, ACCOUNT_DEFAULT } from '../../types/account';
import { SecureItemsPage } from '../secure-items/secure-items';
import { ACCOUNT_SCHEMA } from '../../schema/account';
import { KeychainProvider } from '../../providers/keychain/keychain';
import { StorageID } from '../../app/app.component';
import notp from 'notp';
import base32 from 'thirty-two';
import qrcode from 'qrcode';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Page for displaying passwords
 */

 @Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage extends SecureItemsPage<Account>{

  /**
   * Two Factor step
   */
  readonly step = 30;

  /**
   * Barcode Images
   */
  private imgs:{[uuid : string] : string} = {};

  /**
   * Time remaining
   */
  private timeRemaining = 0;


  /**
   * Account defaults
   */
  readonly objectDefaults = ACCOUNT_DEFAULT;

  /**
   * Intializes __PasswordsPage__
   * @param modalCtrl Modal Controller
   * @param keychain Keychain Provider
   */

  
  constructor(
    modalCtrl : ModalController, keychain : KeychainProvider, platform : Platform, private sanitizer : DomSanitizer) {
      super(modalCtrl,keychain, ACCOUNT_SCHEMA, StorageID.accounts, platform);
      this.calcTimeRemaining();
  }

    /**
     * Generates Token from secret key
     * @param twoFactorModel Model of Two Factor Identified
     */
    generateToken(account : Account):number{
      if (account.twoFactor){
      const unformatted = account.twoFactor.replace(/\W+/g, '').toUpperCase();
      const bin = base32.decode(unformatted);
      return notp.totp.gen(bin);

      }else{
        return NaN;
      }

    }

    loadPercentage(timeLeft : number):number{
      return ((this.step - timeLeft)/30)*100;
    }

    /**
     * Generates QR Code
     * @param twoFactor Two Factor Identified
     */
    generateQrCode(account : Account){
      qrcode.toDataURL(this.barCodeUrl(account), (err, imageUrl) => {
        if (imageUrl) {
          this.imgs[account.uuid] = imageUrl;
        }
      });
    }

    calcTimeRemaining() {
      const date = new Date();
      const epoch = date.getTime();
      this.timeRemaining = this.step - Math.floor(epoch / 1000) % this.step;

      setTimeout( () => {
        this.calcTimeRemaining();
      }, 1000);
    }

    /**
     * Shows barcode
     * @param twoFactor Two Factor Identified
     */
    showCredentials(account : Account){
      this.generateQrCode(account);
      this.showItem(account.uuid);
    }

    /**
     * Barcode URL
     * @param twoFactorModel Two Factor Identified Model
     * @returns Bar code url
     */
    barCodeUrl (account : Account):string {
      if (account.twoFactor){
        return 'otpauth://totp/'
          + encodeURI(account.userName || '')
          + '?secret=' + account.twoFactor.replace(/[\s\.\_\-]+/g, '').toUpperCase()
          + '&algorithm=' + ('SHA1')
          + '&digits=' + (6)
          + '&period=' + (this.step)
          ;  
      }
    }


}
