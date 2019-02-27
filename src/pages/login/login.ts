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


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: any;
  authForm : FormGroup;
  constructor(public events: Events,private fb: FormBuilder,public alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams, public http: HTTP, 
    private loadingCtrl: LoadingController, private storage: Storage,
    private apiData: ApiDetailsProvider) {

    this.authForm = fb.group({
		  'username' : [null, Validators.compose([Validators.required, Validators.minLength(5)])],
		  'password': [null, Validators.compose([Validators.required])]
		});
  }

  goLogin(){
    this.navCtrl.push(SignupPage)
  }

  login() {

    //this.storage.set('name', this.username);

    this.events.publish('loginSideBar');
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

    this.http.post(this.apiData.api+'/api/login', data, headers)
      .then((data) => {
     
       let val = JSON.parse(data.data);
        if(val.status == 500){
          const alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Invalid Login Credential',
            buttons: ['OK']
          });
          alert.present();
        
        }
        else if(val.status == 1){
          //alert("Invalid login");
          let loginData  =[];
          loginData=[{email:val.login, uid:val.uid}];
          // alert(JSON.stringify(loginData));
          this.storage.set('userData', loginData);
          this.navCtrl.setRoot(HomePage);
        }
        else{
          const alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Please Try Again',
            buttons: ['OK']
          });
          alert.present();
        }
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

  show(){
    this.storage.get('name').then((val) => {
      alert('Your name is' + val);
    });
  }

  ionViewDidLoad() {

  }


}
