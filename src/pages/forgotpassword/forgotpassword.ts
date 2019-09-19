import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiDetailsProvider } from '../../providers/api-details/api-details';
import { HTTP } from '@ionic-native/http';
import { ConfirmpasswordPage } from '../confirmpassword/confirmpassword';
/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  email:string;
  authForm: FormGroup;
  otp:boolean = false;
  otpnew: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,private fb: FormBuilder,public http: HTTP,
    private loadingCtrl: LoadingController,private apiData: ApiDetailsProvider) {
      this.authForm = fb.group({
        'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]
      });
  }
  forgotpassword(){
    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",
    });
    loader.present();

    let data ={
      'email': this.email,
      'username': 'admin',
      'password': 'admin',
      'db': "newreach_db"
    };

    let headers = {
      'Content-Type': 'application/json'
    };

    this.http.post(this.apiData.api+'/reset_password/customer', data, headers)
      .then((data) => {
        loader.dismiss();
        if(data.data == 0){
          const alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Invalid Email id',
            buttons: ['OK']
          });
          alert.present();
        }else{
          this.otp = true;
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
      loader.dismiss();
  }
  resetpwd(){

    let data ={
      'email': this.email,
      'otpnew':this.otpnew,
      'username': 'admin',
      'password': 'admin',
      'db': "newreach_db"
    };

    this.http.post(this.apiData.api+'/reset_password/customer/otp', data, {})
      .then((data) => {
        if(data.data == 0){
          const alerts = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Wrong OTP',
            buttons: ['OK']
          });
          alerts.present();
        }else{
          this.navCtrl.push(ConfirmpasswordPage,{email:this.email});
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
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

}
