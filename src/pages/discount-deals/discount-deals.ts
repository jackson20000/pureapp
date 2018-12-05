import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ItemDetailsPage } from '../item-details/item-details';
import { HomePage } from '../home/home';
import { HTTP } from '@ionic-native/http';


@IonicPage()
@Component({
  selector: 'page-discount-deals',
  templateUrl: 'discount-deals.html',
})
export class DiscountDealsPage {
  data: Observable<any>;
  dealproducts: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  public eachProduct(event ,item ){
    this.navCtrl.push(ItemDetailsPage,{product:item});
    }


    homeGo(){
      this.navCtrl.setRoot(HomePage)
    }

  ionViewDidLoad() {

        // For testing in chrome use HTTPClient

   
        this.data = this.http.get('http://192.168.2.21:8069/newreach/product')
        this.data.subscribe(data => {
          this.dealproducts = data.products;
          console.log(this.dealproducts)    
       
        });
  


    // For testing in mobile use Ionic native HTTP


    // this.http.get('http://192.168.2.21:8069/newreach/product', {}, {})
    // .then(data => {
  
    // var json= data.data; // data received by server
    // let obj = JSON.parse(json);
  
    // this.dealproducts = obj.products;
    // })
    // .catch(error => {
  
  
    // });
  
  }


}
