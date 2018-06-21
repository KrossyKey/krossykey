import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Button, ModalController } from 'ionic-angular';
import { Password, SamplePassword, PASSWORD_DEFAULT } from '../../types/password';
import clipboard from 'clipboard-polyfill'
import { EditPasswordPage } from '../edit-password/edit-password';
import { Identified } from '../../types/identified';
/**
 * Page for displaying passwords
 */

@IonicPage()
@Component({
  selector: 'page-passwords',
  templateUrl: 'passwords.html',
})
export class PasswordsPage {

  /**
   * Passwords being shown
   */
  private shownPasswords: {[uuid : string] : null} = {}

  /**
   * Raw Passwords
   */
  private rawPasswords:Identified<Password>[] = [new Identified(SamplePassword)]
  /**
   * List of passwords
   */
  private passwordGroups: {[url : string] : Identified<Password>[]} = {}

  /**
   * Intializes __PasswordsPage__
   * @param navCtrl Nav Controller
   * @param navParams Nav Params
   */
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl : ModalController) {
    this.passwordGroups = this.sortPasswords(this.rawPasswords)
  }

  /**
   * Sorts passwords by url
   * @param passwords All Passwords 
   */
  sortPasswords(passwords : Identified<Password>[]):{[url : string] : Identified<Password>[]}{
    const checksums:{[checksum : string] : Identified<Password>} = {}
    
    const passwordGroups:{[property : string] : Identified<Password>[] } = {}
    passwords.forEach(password => {
      if (passwordGroups[password.model.url]){
        passwordGroups[password.model.url].push(password)
      }else{
        passwordGroups[password.model.url] = []
        passwordGroups[password.model.url].push(password)
      }
    });
    return passwordGroups
  }

  /**
   * Gets all password groups
   * @param passwordGroups Password Groups
   */
  passwordGroupsNames(passwordGroups : {[url : string] : Identified<Password>[]}):string[]{
    console.log(Object.keys(passwordGroups))
    return Object.keys(passwordGroups)
  }

  /**
   * Shows a specific password
   * @param uuid UUID of password
   */
  private showPassword(uuid : string){
    this.shownPasswords[uuid] = null
  }

  /**
   * Hides a specific password
   * @param uuid UUID of password
   */
  private hidePassword(uuid : string){
    delete this.shownPasswords[uuid]
  }

  /**
   * Copies string to clipboard
   * @param stringToCopy String to copy
   */
  private copyToClipboard(stringToCopy : string){
    clipboard.writeText(stringToCopy);
  }

  /**
   * Edits password
   * @param password __Identified<Password>__
   */
  private editPassword(password : Identified<Password>){
      let editModal = this.modalCtrl
        .create(EditPasswordPage, { password: password, addPass : false });
      editModal.present();
  }

  /**
   * Delete password
   * @param uuid Identifier of password
   */
  private deletePassword(uuid : string){
    this.rawPasswords = this.rawPasswords.filter(
      (password : Identified<Password>) =>  password.uuid !== uuid);
    this.passwordGroups = this.sortPasswords(this.rawPasswords)
  }

  /**
   * Adds password
   * @param password __Identified<Password>__
   */
  private addPassword(){
    let editModal = this.modalCtrl
      .create(EditPasswordPage, { password: new Identified({}) , addPass : true});
    editModal.onDidDismiss((password : Identified<Password>)=> {
      if (password !== undefined && (
          this.rawPasswords.filter(
            (filtered : Identified<Password>) =>  filtered.uuid === password.uuid).length === 0)){
          this.rawPasswords.push(password)
          this.passwordGroups = this.sortPasswords(this.rawPasswords)
        }
    });
    editModal.present();
  }

}
