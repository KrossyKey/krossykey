import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemEditorPage } from './item-editor';

@NgModule({
  declarations: [
    ItemEditorPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemEditorPage),
  ],
})
export class EditPasswordPageModule {}
