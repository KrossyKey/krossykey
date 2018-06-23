import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PasswordsPage } from '../pages/passwords/passwords';
import { TwoFactorPage } from '../pages/two-factor/two-factor';
import { SecureNotesPage } from '../pages/secure-notes/secure-notes';
import { TranslateService } from '@ngx-translate/core';
import { ReadKeychainProvider } from '../providers/read-keychain/read-keychain';

export enum PageID{
  password,
  twoFactor,
  secureNotes
}


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
  pages: Array<{title: string, component: any, id : PageID}>;

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
    private readKeychainProvider : ReadKeychainProvider) {
    this.initializeApp();
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    // used for an example of ngFor and navigation
    translate.get('titles').subscribe((titles: any) => {
      this.pages = [
        { title: titles.passwords, component: PasswordsPage, id : PageID.password },
        { title: titles.twoFactor, component: TwoFactorPage, id : PageID.twoFactor },
        { title: titles.secureNotes, component: SecureNotesPage, id : PageID.secureNotes }
  
      ];
      this.openPage(this.pages[0])

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
    this.readKeychainProvider.doneLoading.then(() =>{
      if (page.id === PageID.password){
        this.nav.setRoot(page.component, {rawItems : this.readKeychainProvider.keychain.passwords});
      }else if (page.id === PageID.twoFactor){
        this.nav.setRoot(page.component, {rawItems : this.readKeychainProvider.keychain.twoFactors});
      }else if (page.id === PageID.secureNotes){
        this.nav.setRoot(page.component, {rawItems : this.readKeychainProvider.keychain.secureNotes});
      }
    })
  }
}
