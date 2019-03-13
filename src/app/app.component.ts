import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from 'rxjs/Observable';
import { HTTP } from '@ionic-native/http';

import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { DailyDealsPage } from '../pages/daily-deals/daily-deals';
import { CategoryPage } from '../pages/category/category';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../providers/auth/auth';
import { CartPage } from '../pages/cart/cart';
import { Events } from 'ionic-angular';
import { HistoryPage } from '../pages/history/history';
import { ApiDetailsProvider } from '../providers/api-details/api-details';
import { PublicDataProvider } from '../providers/public-data/public-data';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, icon: any }>;
  data: Observable<any>;
  count: number = 0;
  orderDetails: any;
  profData: any;
  constructor(public events: Events, private auth: AuthProvider,
    public alertCtrl: AlertController, public platform: Platform,
    public app: App, private loadingCtrl: LoadingController,
    public statusBar: StatusBar, public splashScreen: SplashScreen,
    public storage: Storage, public http: HTTP, private apiData: ApiDetailsProvider,
    public dataprov: PublicDataProvider) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();      
      platform.ready().then(() => {
        if (platform.is('android')) {
          statusBar.overlaysWebView(false);
          statusBar.styleLightContent();
        }
      });
  

    })
    //Back Button Function

    platform.registerBackButtonAction(() => {

      let nav = app.getActiveNavs()[0];
      let activeView = nav.getActive();
      if (activeView.name === "HomePage") {

        if (nav.canGoBack()) {
          nav.pop();
        } else {
          if (this.count == 0) {
            const alert = this.alertCtrl.create({
              title: 'Confirmation',
              message: 'Do you want to close the app?',
              buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  this.count = 0;
                }
              }, {
                text: 'Close App',
                handler: () => {
                  this.platform.exitApp(); // Close this application
                }
              }]
            });
            alert.present();
          }
          this.count++;
        }
      }
      else {
        nav.pop();
      }
    }, 5);



  }


  logout() {

  }


  loginGo() {
    this.nav.push(LoginPage)
  }

  signupGo() {
    this.nav.push(SignupPage)
  }

  homeGo() {
    this.nav.setRoot(HomePage)
  }

  profileGo() {
    if (this.auth.uid == undefined || null || "") {
      const alerts = this.alertCtrl.create({
        title: 'Alert',
        subTitle: "Please Login",
        buttons: ['OK']
      });
      alerts.present();
      this.nav.push(LoginPage);
    }
    else {
      this.nav.push(ProfilePage);
    }
  }

  orderGo() {

    if (this.auth.uid == undefined || null || "") {
      const alerts = this.alertCtrl.create({
        title: 'Alert',
        subTitle: "Please Login",
        buttons: ['OK']
      });
      alerts.present();
      this.nav.push(LoginPage);
    }
    else {
      this.nav.push(HistoryPage);
    }
  }

  categoryGo() {
    this.nav.push(CategoryPage)
  }

  cartGo() {
    this.nav.setRoot("CartPage")
  }

  dailydealsGo() {
    this.nav.push(DailyDealsPage)
  }

}
