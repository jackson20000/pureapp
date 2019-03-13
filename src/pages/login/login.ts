import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Events } from 'ionic-angular';
import { ApiDetailsProvider } from '../../providers/api-details/api-details';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: any;
  authForm: FormGroup;
  usrData: any;

  constructor(public events: Events, private fb: FormBuilder, public alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams, public http: HTTP,
    private loadingCtrl: LoadingController, private storage: Storage,
    private apiData: ApiDetailsProvider, private auth: AuthProvider) {

    this.authForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'password': [null, Validators.compose([Validators.required])]
    });
  }

  goLogin() {
    this.navCtrl.push(SignupPage)
  }

  login() {

    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",
    });
    loader.present();

    let data = {
      'username': this.username,
      'password': this.password,
      'db': this.apiData.db
    };
    let headers = {
      'Content-Type': 'application/json'
    };

    this.http.post(this.apiData.api + '/api/login', data, headers)
      .then((data) => {
        let val = JSON.parse(data.data);
        if (val.resp == "0") {
          const alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Invalid Login Credential',
            buttons: ['OK']
          });
        }
        else if (val.resp == "1") {
          this.usrData = { username: val.username, password: val.password, uid: val.uid };
          this.storage.set('userData', this.usrData);
          this.navCtrl.setRoot(HomePage);
        }
        loader.dismiss();
      })
      .catch((error) => {
        const alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'Please Try Again',
          buttons: ['OK']
        });
        alert.present();
      });
    loader.dismiss();
  } 
}
