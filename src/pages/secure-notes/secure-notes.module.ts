import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecureNotesPage } from './secure-notes';

@NgModule({
  declarations: [
    SecureNotesPage,
  ],
  imports: [
    IonicPageModule.forChild(SecureNotesPage),
  ],
})
export class SecureNotesPageModule {}
