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
  count: number = 0; 
  orderDetails: any;
  constructor(public events: Events, private auth: AuthProvider,
     public alertCtrl: AlertController, public platform: Platform, 
     public app: App, private loadingCtrl: LoadingController, 
     public statusBar: StatusBar, public splashScreen: SplashScreen, 
     public storage: Storage, public http: HTTP, private apiData:ApiDetailsProvider) {
     

    this.initializeApp();
    let data = {
      'db': this.apiData.db,
      'username': "admin",
      'password': "*LeoMax418777"
    };

    let headers = {
      'Content-Type': 'application/json'
    };
    this.http.post(this.apiData.api+'/newreach/customer', data, headers)
      .then((data) => {
        this.datas = JSON.parse(data.data);
      })
      .catch((error) => {
        console.log(error);
      });

       this.events.subscribe('loginSideBar', () => {
      this.profileInfo = this.datas;
    });
    this.events.subscribe('logoutSideBar', () => {
      this.profileInfo.profile_name = null;
      this.profileInfo.image = null;
    });


    //Back Button
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

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

   
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

  
  orderGo(){    

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
    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",
      duration: 2000
    });
    loader.present();
    this.nav.push(DailyDealsPage)
  }

  

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }


}
