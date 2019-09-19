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
import { ToastController } from 'ionic-angular';
import { PendingPaymentPage } from '../pages/pending-payment/pending-payment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any, icon: any }>;
  data: Observable<any>;
  count: number = 0;
  orderDetails: any;
  profData: any;
  check:boolean;
  dismissing: boolean;
  spamming: boolean;
  lastBack: any;

  constructor(public events: Events, private auth: AuthProvider,
    public alertCtrl: AlertController, public platform: Platform,
    public app: App, private loadingCtrl: LoadingController,
    public statusBar: StatusBar, public splashScreen: SplashScreen,
    public storage: Storage, public http: HTTP, private apiData: ApiDetailsProvider,
    public dataprov: PublicDataProvider, private toast: ToastController) {

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
      const nav = app.getActiveNavs()[0];
      const active = nav.getActive();

      if (active.name === "HomePage") {

      let closeDelay = 2000;
      let spamDelay = 500;

      if (active.isOverlay) {
        if (!this.dismissing) {
          active.dismiss().then(() => this.dismissing = false);
        }
        this.dismissing = true;
      } else if (((Date.now() - this.lastBack) < closeDelay) &&
        (Date.now() - this.lastBack) > spamDelay) {
        platform.exitApp();
      } else {
        if (!this.spamming) {
          let t = toast.create({
            message: "Press back again to exit",
            duration: closeDelay,
            dismissOnPageChange: true
          });
          t.onDidDismiss(() => this.spamming = false);
          t.present();
        }
        this.spamming = true;
      }
      this.lastBack = Date.now();

    }
    else {
      nav.pop();
    }
    });
  }


  logout() {
  localStorage.clear();
  this.nav.setRoot(LoginPage);
  }


  loginGo() {
    this.nav.push(LoginPage)
  }

  signupGo() {
    this.nav.push(SignupPage)
  }

  pendingpayGo() {
    this.nav.push("PendingPaymentPage")
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

  cartGo() {localStorage
    this.nav.setRoot("CartPage")
  }

  dailydealsGo() {
    this.nav.push(DailyDealsPage)
  }

  ionViewDidLoad(){
    this.check= this.auth.check;
  }

}
