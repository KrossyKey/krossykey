import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewKeychainPage } from './new-keychain';

@NgModule({
  declarations: [
    NewKeychainPage,
  ],
  imports: [
    IonicPageModule.forChild(NewKeychainPage),
  ],
})
export class NewKeychainPageModule {}
