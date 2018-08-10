import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewKeychainPage } from './new-keychain';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    NewKeychainPage,
  ],
  imports: [
    IonicPageModule.forChild(NewKeychainPage)
    
  ],
})
export class NewKeychainPageModule {}
