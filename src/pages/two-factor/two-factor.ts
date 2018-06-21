import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Page for displaying two factor codes
 */

@IonicPage()
@Component({
  selector: 'page-two-factor',
  templateUrl: 'two-factor.html',
})
export class TwoFactorPage {


  /**
   * Intializes __TwoFactorPage__
   * @param navCtrl Nav Controller
   * @param navParams Nav Params
   */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
