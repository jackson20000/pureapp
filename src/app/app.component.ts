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
import { DiscountDealsPage } from '../pages/discount-deals/discount-deals';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../providers/auth/auth';
import { CartPage } from '../pages/cart/cart';
import { Events } from 'ionic-angular';
import { HistoryPage } from '../pages/history/history';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, icon: any }>;

  data: Observable<any>;
  profileInfo: any = [];
  datas: any = [];
  constructor(public events: Events, private authService: AuthProvider, public alertCtrl: AlertController, public platform: Platform, public app: App, private loadingCtrl: LoadingController, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage, public http: HTTP) {
    this.initializeApp();
    let data = {
      'db': "cannabis_db",
      'username': "admin",
      'password': "admin"
    };

    let headers = {
      'Content-Type': 'application/json'
    };
    this.http.post('http://198.199.67.147:8075/newreach/customer', data, headers)
      .then((data) => {
        this.datas = JSON.parse(data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: HomePage, icon: 'home' },
    //   { title: 'Signup', component: SignupPage,  icon: 'person'  }
    // ];
    this.events.subscribe('loginSideBar', () => {
      this.profileInfo = this.datas;
    });
    this.events.subscribe('logoutSideBar', () => {
      this.profileInfo.profile_name = null;
      this.profileInfo.image = null;
    });




    platform.registerBackButtonAction(() => {
      // let nav = app.getActiveNavs()[0];
      // let active = nav.getActive();

      // if (active.instance instanceof HomePage) {
      //   const confirm = this.alertCtrl.create({
      //     title: 'Confirmation',
      //     message: 'Do you want to exit ?',
      //     buttons: [
      //       {
      //         text: 'Yes',
      //         handler: () => {
      //           platform.exitApp();
      //         }
      //       },
      //       {
      //         text: 'Cancel',
      //         handler: () => {

      //         }
      //       }
      //     ]
      //   });
      //   confirm.present();
      // }
      // if (active.instance instanceof CartPage) {
      //   this.nav.setRoot(HomePage)
      // }
      // nav.pop(); // this will work for other pages then the page name
      let nav = app.getActiveNavs()[0];
      let activeView = nav.getActive();

      if (activeView.name === "HomePage") {

        if (nav.canGoBack()) { //Can we go back?
          nav.pop();
        } else {
          const alert = this.alertCtrl.create({
            title: 'Confirmation',
            message: 'Do you want to close the app?',
            buttons: [{
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Application exit prevented!');
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
      }
      else if (activeView.instance instanceof CartPage) {
        this.nav.setRoot(HomePage)
      }
      else {
        nav.pop();
      }

    }, 5);

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    // For testing in mobile use Ionic native HTTP

    // List user info
  }

  logout() {
    if (this.storage.remove('userData')) {
      this.events.publish('logoutSideBar');
      const alerts = this.alertCtrl.create({
        title: 'Alert',
        subTitle: "you're logged out",
        buttons: ['OK']
      });
      alerts.present();
    }
    else {
      alert("error");
    }
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


  categoryGo() {
    this.nav.push(CategoryPage)
  }

  cartGo() {
    this.nav.setRoot("CartPage")
  }

  dailydealsGo() {
    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",
      duration: 2000
    });
    loader.present();
    this.nav.push(DailyDealsPage)
  }

  discountdealsGo() {
    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",
      duration: 2000
    });
    loader.present();
    this.nav.push(DiscountDealsPage)
  }


  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }


}
