import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PasswordsPage } from '../pages/passwords/passwords';
import { TwoFactorPage } from '../pages/two-factor/two-factor';
import { SecureNotesPage } from '../pages/secure-notes/secure-notes';
import { TranslateService } from '@ngx-translate/core';

/**
 * App Component
 */

@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
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
  constructor(translate : TranslateService, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
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
        { title: titles.secureNotes, component: SecureNotesPage }
  
      ];
    });



  }
  /**
   * Intializes App
   */
  initializeApp() {
    this.platform.ready().then(() => {
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
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
