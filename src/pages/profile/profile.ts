import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { SearchPage } from '../search/search';
import { ApiDetailsProvider } from '../../providers/api-details/api-details';
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  data: Observable<any>;
  profileInfo: any = [];
  dealproducts: any = [];
  usrData: any;
  constructor(private auth: AuthProvider, public navCtrl: NavController,
     public navParams: NavParams, public http: HTTP, private loadingCtrl: LoadingController,
     private apiData:ApiDetailsProvider, private storage: Storage) {
           
      let data = {
        'db': this.apiData.db,
        'username': this.auth.usrname,
        'password': this.auth.pwd,
      };
  
      let headers = {
        'Content-Type': 'application/json'
      };
  
      this.http.post(this.apiData.api+'/newreach/customer', data, headers)
        .then((data) => {
         this.profileInfo = JSON.parse(data.data); 
    
        })
        .catch((error) => {
          console.log(error);
        });
  
        //Search data
        this.http.get(this.apiData.api+'/newreach/product', {}, {})
        .then(data => {
    
        var json= data.data; // data received by server
        let obj = JSON.parse(json);
    
        this.dealproducts = obj.products;
          
        })
        .catch(error => {
          console.log(error);
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

}
