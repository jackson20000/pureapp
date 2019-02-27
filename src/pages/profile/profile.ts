import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { SearchPage } from '../search/search';
import { ApiDetailsProvider } from '../../providers/api-details/api-details';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  data: Observable<any>;
  profileInfo: any = [];
  dealproducts: any = [];

  constructor(private authService: AuthProvider, public navCtrl: NavController,
     public navParams: NavParams, public http: HTTP, private loadingCtrl: LoadingController,
     private apiData:ApiDetailsProvider) {
  }

  

  public profileGo() {
    this.authService.isLoggedIn().then(val => {
      if(val== null){
        this.navCtrl.push(LoginPage)
      }else{
        this.navCtrl.push(ProfilePage)
      }
    });
  }
  public searchGo() {
    this.navCtrl.push(SearchPage, { items: this.dealproducts });
  }

  homeGo() {
    this.navCtrl.setRoot(HomePage)
  }

  cartGo() {
    this.navCtrl.setRoot("CartPage")
  }

  ionViewDidLoad() {

    // For testing in mobile use Ionic native HTTP

    // List user info

    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",
    });
    loader.present();

    let data = {
      'db': "cannabis_db",
      'username': "admin",
      'password': "admin"
    };

    let headers = {
      'Content-Type': 'application/json'
    };

    this.http.post(this.apiData.api+'/newreach/customer', data, headers)
      .then((data) => {
       this.profileInfo = JSON.parse(data.data); 
           loader.dismiss();
  
      })
      .catch((error) => {
        console.log(error);
      });

      //for search data
      this.http.get(this.apiData.api+'/newreach/product', {}, {})
      .then(data => {
  
      var json= data.data; // data received by server
      let obj = JSON.parse(json);
  
      this.dealproducts = obj.products;
        
      })
      .catch(error => {
      });


  }

}
