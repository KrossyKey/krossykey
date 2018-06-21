import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordsPage } from './passwords';

@NgModule({
  declarations: [
    PasswordsPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordsPage),
  ],
})
export class PasswordsPageModule {}
