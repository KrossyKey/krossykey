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
import { ReadPasswordProvider } from '../providers/read-password/read-password';
import { EditPasswordPage } from '../pages/edit-password/edit-password';

@NgModule({
  declarations: [
    AppComponent,
    SecureNotesPage,
    TwoFactorPage,
    PasswordsPage,
    EditPasswordPage
  ],
  imports: [
    BrowserModule,
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
    EditPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ReadPasswordProvider
  ]
})
export class AppModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}