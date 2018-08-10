import { Component } from '@angular/core';
import { IonicPage, ModalController, Platform } from 'ionic-angular';
import { SecureItemsPage } from '../secure-items/secure-items';
import { SECURE_NOTE_DEFAULT, SecureNote } from '../../types/secure-note';
import { SECURE_NOTE_SCHEMA } from '../../schema/secure-note';
import { KeychainProvider } from '../../providers/keychain/keychain';
import { StorageID } from '../../app/app.component';

/**
 * Page for displaying passwords
 */

@IonicPage()
@Component({
  selector: 'page-secure-notes',
  templateUrl: 'secure-notes.html',
})
export class SecureNotesPage extends SecureItemsPage<SecureNote>{

  readonly objectDefaults = SECURE_NOTE_DEFAULT;

  /**
   * Intializes __SecureNotesPage__
   * @param modalCtrl Modal Controller
   * @param keychain Keychain Provider
   */
  constructor(
    modalCtrl : ModalController, keychain : KeychainProvider, platform : Platform) {
      super(modalCtrl,keychain, SECURE_NOTE_SCHEMA, StorageID.secureNotes,platform);
  }


}
