import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP, private loadingCtrl: LoadingController, public storage: Storage) {
  }

  login() {
    
    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",
      // duration: 2000
    });
    loader.present();

    console.log("username: " + this.username);
    console.log("password: " + this.password);

    let data = {
      'username': this.username,
      'password': this.password,
      'db': "cannabis_db"
    };
    let headers = {
      'Content-Type': 'application/json'
    };

    this.http.post('http://198.199.67.147:8075/api/login', data, headers)
      .then((data) => {
        console.log(data);

        alert('Logged in successfully!');

        this.storage.set('name', data);
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error) => {
        console.log(error);
      });
      loader.dismiss();

  }

  ionViewDidLoad() {

  }

}
