import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TwoFactorPage } from './two-factor';

@NgModule({
  declarations: [
    TwoFactorPage,
  ],
  imports: [
    IonicPageModule.forChild(TwoFactorPage),


  ],
})
export class TwoFactorPageModule {}
