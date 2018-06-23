import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SecureItemsPage } from '../secure-items/secure-items';
import { SECURE_NOTE_DEFAULT, SecureNote, SampleSecureNote } from '../../types/secure-note';
import { SECURE_NOTE_SCHEMA } from '../../schema/secure-note';

/**
 * Page for displaying passwords
 */

@IonicPage()
@Component({
  selector: 'page-secure-notes',
  templateUrl: 'secure-notes.html',
})
export class SecureNotesPage extends SecureItemsPage<SecureNote>{

  readonly objectDefaults = SECURE_NOTE_DEFAULT

  /**
   * Intializes __SecureNotesPage__
   * @param navCtrl Nav Controller
   * @param navParams Nav Params
   * @param modalCtrl Modal Controller
   */

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl : ModalController) {
      super(navCtrl,navParams,modalCtrl, SECURE_NOTE_SCHEMA)
  }


}
