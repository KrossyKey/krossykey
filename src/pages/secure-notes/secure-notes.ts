import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Page for displaying secure notes
 */

@IonicPage()
@Component({
  selector: 'page-secure-notes',
  templateUrl: 'secure-notes.html',
})
export class SecureNotesPage {


  /**
   * Intializes __SecureNotesPage__
   * @param navCtrl Nav Controller
   * @param navParams Nav Params
   */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
