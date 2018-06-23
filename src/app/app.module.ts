import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AppComponent } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SecureNotesPage } from '../pages/secure-notes/secure-notes';
import { TwoFactorPage } from '../pages/two-factor/two-factor';
import { PasswordsPage } from '../pages/passwords/passwords';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ItemEditorPage } from '../pages/item-editor/item-editor';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { IonicStorageModule } from '@ionic/storage';
import { KeychainProvider } from '../providers/keychain/keychain';
import { LocalizedToastProvider } from '../providers/localized-toast/localized-toast';

@NgModule({
  declarations: [
    AppComponent,
    SecureNotesPage,
    TwoFactorPage,
    PasswordsPage,
    ItemEditorPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot({
      name: 'krossykey',
         driverOrder: ['sqlite', 'indexdb', 'websql']
    }),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 2,
      innerStrokeWidth: 2,
      showSubtitle: false,
      outerStrokeColor: "#488aff",
      innerStrokeColor: "#488aaa",
      titleFontSize: "15",
      animationDuration: 300,
    }),
    IonicModule.forRoot(AppComponent),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    SecureNotesPage,
    TwoFactorPage,
    PasswordsPage,
    ItemEditorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    KeychainProvider,
    LocalizedToastProvider
  ]
})
export class AppModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}