import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the LocalizedToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalizedToastProvider {

  constructor(public translate: TranslateService, private toastCtrl: ToastController) {

  }

  displayToastFor(i18n : string){
    this.translate.get(i18n).subscribe((res: string) => {
  
      let toast = this.toastCtrl.create({
        message: res,
        duration: 3000,
        position: 'bottom'
      });

      toast.present();    
    });
  }

}
