import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordGeneratorPage } from './password-generator';

@NgModule({
  declarations: [
    PasswordGeneratorPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordGeneratorPage),
  ],
})
export class PasswordGeneratorPageModule {}
