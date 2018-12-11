import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ItemDetailsPage } from '../item-details/item-details';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { HTTP } from '@ionic-native/http';
import { CategoryPage } from '../category/category';
import { SearchPage } from '../search/search';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-discount-deals',
  templateUrl: 'discount-deals.html',
})
export class DiscountDealsPage {
  data: Observable<any>;
  dealproducts: any = [];
  constructor(private authService: AuthProvider,public navCtrl: NavController, public navParams: NavParams, public http: HTTP,private loadingCtrl: LoadingController) {
  }

  public eachProduct(event ,item ){
    this.navCtrl.push(ItemDetailsPage,{product:item});
    }


    homeGo() {
      this.navCtrl.setRoot(HomePage)
    }
  
    cartGo() {
      this.navCtrl.setRoot("CartPage")
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

  ionViewDidLoad() {

        // For testing in chrome use HTTPClient

   
        // this.data = this.http.get('http://192.168.2.21:8069/newreach/product')
        // this.data.subscribe(data => {
        //   this.dealproducts = data.products;
        //   console.log(this.dealproducts)    
       
        // });
  


    // For testing in mobile use Ionic native HTTP

    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",
     
    });
    loader.present();
    this.http.get('http://198.199.67.147:8075/newreach/product', {}, {})
    .then(data => {
  
    var json= data.data; // data received by server
    let obj = JSON.parse(json);
  
    this.dealproducts = obj.products;
    loader.dismiss();
    })
    .catch(error => {
      loader.dismiss();
  
    });
  
  }


}
