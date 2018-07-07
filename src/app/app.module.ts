import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AppComponent } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SecureNotesPage } from '../pages/secure-notes/secure-notes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ItemEditorPage } from '../pages/item-editor/item-editor';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { IonicStorageModule } from '@ionic/storage';
import { KeychainProvider } from '../providers/keychain/keychain';
import { LocalizedToastProvider } from '../providers/localized-toast/localized-toast';
import { AuthenticatePage } from '../pages/authenticate/authenticate';
import { CryptoProvider } from '../providers/crypto/crypto';
import { NewKeychainPage } from '../pages/new-keychain/new-keychain';
import {SecureStorage} from '@ionic-native/secure-storage';
import { SettingsPage } from '../pages/settings/settings';
import { PasswordGeneratorProvider } from '../providers/password-generator/password-generator';
import { PasswordGeneratorPage } from '../pages/password-generator/password-generator';
import { AccountsPage } from '../pages/accounts/accounts';

@NgModule({
  declarations: [
    AppComponent,
    SecureNotesPage,
    AccountsPage,
    ItemEditorPage,
    AuthenticatePage,
    NewKeychainPage,
    SettingsPage,
    PasswordGeneratorPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot({
      name: 'krossykey',
         driverOrder: ['sqlite', 'indexedb', 'websql',"localstorage"]
    }),
    
    NgCircleProgressModule.forRoot({
      // set defaults here
      outerStrokeWidth: 2,
      innerStrokeWidth: 2,
      showSubtitle: false,
      outerStrokeColor: "#488aff",
      innerStrokeColor: "rgba(0,0,0,0)",
      titleFontSize: "10",
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
    AccountsPage,
    ItemEditorPage,
    AuthenticatePage,
    NewKeychainPage,
    SettingsPage,
    PasswordGeneratorPage
  ],
  providers: [
    StatusBar,
    SecureStorage,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    KeychainProvider,
    LocalizedToastProvider,
    CryptoProvider,
    PasswordGeneratorProvider
    ]
})
export class AppModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}