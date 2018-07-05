import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PasswordsPage } from '../pages/passwords/passwords';
import { TwoFactorPage } from '../pages/two-factor/two-factor';
import { SecureNotesPage } from '../pages/secure-notes/secure-notes';
import { TranslateService } from '@ngx-translate/core';
import { KeychainProvider } from '../providers/keychain/keychain';
import { SettingsPage } from '../pages/settings/settings';
import { PasswordGeneratorProvider } from '../providers/password-generator/password-generator';

/**
 * Storage IDs
 */
export enum StorageID{
  passwords = "passwords",
  twoFactors = "twoFactors",
  secureNotes = "secureNotes"
}

/**
 * App Mode
 */
export enum Mode{
  desktop,
  mobile,
  browser
}


/**
 * App Component
 */

@Component({
  templateUrl: 'app.html'
})
export class AppComponent {


  /**
   * States what mode keychain is set for
   */
  static readonly mode:Mode = Mode.desktop;

  /**
   * Navigation
   */
  @ViewChild(Nav) nav: Nav;

  /**
   * Root Page
   */
  rootPage: any = PasswordsPage;

  /**
   * All Pages
   */
  pages: Array<{title: string, component: any}>;

  /**
   * Intializes AppComponent
   * @param translate Translation Service
   * @param platform Platform
   * @param statusBar Status Bar
   * @param splashScreen Splash Screen
   */
  constructor(translate : TranslateService, 
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private keychainProvider : KeychainProvider) {
    this.initializeApp();

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
    // used for an example of ngFor and navigation
    translate.get('titles').subscribe((titles: any) => {
      this.pages = [
        { title: titles.passwords, component: PasswordsPage },
        { title: titles.twoFactor, component: TwoFactorPage },
        { title: titles.secureNotes, component: SecureNotesPage },
        { title: titles.settings, component: SettingsPage }
      ];
    });
    
  }
  /**
   * Intializes App
   */
  initializeApp() {
    this.platform.ready().then(() => {
      this.keychainProvider.removePassphraseSecurely()
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * Opens Pages
   * @param page Page to open
   */
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
