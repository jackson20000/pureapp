import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController  } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HTTP } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ApiDetailsProvider } from '../../providers/api-details/api-details';



/**
 * Generated class for the ConfirmpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmpassword',
  templateUrl: 'confirmpassword.html',
})
export class ConfirmpasswordPage {
  email:string;
  npassword: any;
  cpassword: any;
  authForm: FormGroup;

  constructor(public navCtrl: NavController, private fb: FormBuilder,
    public navParams: NavParams, public http: HTTP, private loadingCtrl: LoadingController,
    public alertCtrl: AlertController,private apiData: ApiDetailsProvider) {
    this.authForm = fb.group({
      'npassword': [null, Validators.compose([Validators.required])]
    });

  }
  submitpwd(){
    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",
    });
    loader.present();

    let data ={
      'cpassword': this.cpassword,
      'username': 'admin',
      'password': 'admin',
      'db': "newreach_db"
    };

    let headers = {
      'Content-Type': 'application/json'
    };
    this.http.post(this.apiData.api+'/reset_password/customer/confirm', data, headers)
      .then((data) => {
        loader.dismiss();
        if(this.npassword != this.cpassword){
          const alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'New Password and Confirm Password Should be same',
            buttons: ['OK']
          });
          alert.present();
        }else{
          this.navCtrl.push(LoginPage);
        }
      })
      .catch((error) => {

        const alert = this.alertCtrl.create({
          title: 'error',
          subTitle: 'Please Check network Connection',
          buttons: ['OK']
        });
        alert.present();
      });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmpasswordPage');
  }

}
