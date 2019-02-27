import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ItemDetailsPage } from '../item-details/item-details';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { HTTP } from '@ionic-native/http';
import { AuthProvider } from '../../providers/auth/auth';
import { ApiDetailsProvider } from '../../providers/api-details/api-details';


@IonicPage()
@Component({
  selector: 'page-daily-deals',
  templateUrl: 'daily-deals.html',
})
export class DailyDealsPage {
  data: Observable<any>;
  dealproducts: any = [];

  constructor(private authService: AuthProvider, public navCtrl: NavController, 
    public navParams: NavParams,  public http: HTTP,
    private loadingCtrl: LoadingController, private apiData:ApiDetailsProvider) {
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

    this.http.get(this.apiData.api+'/newreach/product', {}, {})
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
