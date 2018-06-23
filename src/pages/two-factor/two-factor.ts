import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SecureItemsPage } from '../secure-items/secure-items';
import { TwoFactor, TWO_FACTOR_DEFAULT, SampleTwoFactor } from '../../types/two-factor';
import notp from 'notp'
import base32 from 'thirty-two'
import qrcode from 'qrcode';
import { DomSanitizer } from '@angular/platform-browser';
import { KeychainProvider } from '../../providers/keychain/keychain';
import { PASSWORD_SCHEMA } from '../../schema/password';
import { StorageID } from '../../app/app.component';
import { TWO_FACTOR_SCHEMA } from '../../schema/two-factor';

/**
 * Page for displaying passwords
 */

@IonicPage()
@Component({
  selector: 'page-two-factor',
  templateUrl: 'two-factor.html',
})
export class TwoFactorPage extends SecureItemsPage<TwoFactor>{

  readonly step = 30;

  /**
   * Two factor defaults
   */
  readonly objectDefaults = TWO_FACTOR_DEFAULT

  /**
   * Barcode Images
   */
  private imgs:{[uuid : string] : string} = {}

  /**
   * Time remaining
   */
  private timeRemaining:number = 0;
  

  /**
   * Intializes __PasswordsPage__
   * @param sanitizer DOM Sanitizer
   * @param modalCtrl Modal Controller
   * @param keychain Keychain Provider
   */
  constructor(public sanitizer : DomSanitizer,
    modalCtrl : ModalController, keychain : KeychainProvider) {
      super(modalCtrl,keychain, TWO_FACTOR_SCHEMA, StorageID.twoFactors)
      this.calcTimeRemaining()
  }


    /**
     * Generates Token from secret key
     * @param twoFactorModel Model of Two Factor Identified
     */
    generateToken(twoFactorModel : TwoFactor):number{
      // var key = 'gknj ocwm qh7o sace 6vpy ytgt mlwa vuxt'
      const unformatted = twoFactorModel.key.replace(/\W+/g, '').toUpperCase();
      const bin = base32.decode(unformatted);
      return notp.totp.gen(bin)
    }

    loadPercentage(timeLeft : number):number{
      return ((this.step - timeLeft)/30)*100
    }

    /**
     * Generates QR Code
     * @param twoFactor Two Factor Identified
     */
    generateQrCode(twoFactor : TwoFactor){
      qrcode.toDataURL(this.barCodeUrl(twoFactor), (err, imageUrl) => {
        if (imageUrl) {
          this.imgs[twoFactor.uuid] = imageUrl
          console.log( this.imgs)
        }
      });
    }

    calcTimeRemaining() {
      const epoch = (new Date).getTime();
      this.timeRemaining = this.step - Math.floor(epoch / 1000) % this.step

      setTimeout( () => {
        this.calcTimeRemaining()
      }, 1000);
    }

    /**
     * Shows barcode
     * @param twoFactor Two Factor Identified
     */
    showBarCode(twoFactor : TwoFactor){
      this.generateQrCode(twoFactor)
      this.showItem(twoFactor.uuid)
    }

    /**
     * Barcode URL
     * @param twoFactorModel Two Factor Identified Model
     * @returns Bar code url
     */
    barCodeUrl (twoFactorModel : TwoFactor):string {
      return 'otpauth://totp/'
        + encodeURI(twoFactorModel.userName || '')
        + '?secret=' + twoFactorModel.key.replace(/[\s\.\_\-]+/g, '').toUpperCase()
        + '&algorithm=' + ('SHA1')
        + '&digits=' + (6)
        + '&period=' + (this.step)
        ;  
    };
}
