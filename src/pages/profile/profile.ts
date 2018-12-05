import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  data: Observable<any>;
  profileInfo: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

    // For testing in mobile use Ionic native HTTP

    // List user info

    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",
      duration: 2000
    });
    loader.present();

    let data = {
      'db': "newreach",
      'username': "newreach",
      'password': "newreach"
    };

    let headers = {
      'Content-Type': 'application/json'
    };

    this.http.post('http://192.168.2.21:8069/newreach/customer', data, headers)
      .then((data) => {
       this.profileInfo = JSON.parse(data.data); 
           loader.dismiss();
  
      })
      .catch((error) => {
        console.log(error);
      });

  }

}
