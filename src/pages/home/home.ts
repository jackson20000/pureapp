import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DailyDealsPage } from '../daily-deals/daily-deals'
import { CategoryPage } from '../category/category'
import { ProfilePage } from '../profile/profile'
import { ItemDetailsPage } from '../item-details/item-details'
import { HTTP } from '@ionic-native/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: Observable<any>;
  dealproducts: any = [];


  constructor(public navCtrl: NavController, public http: HTTP) {

  }

  profileGo(){
    this.navCtrl.push(ProfilePage)
  }

  itemGo(){
    this.navCtrl.push(ItemDetailsPage)
  }

  categoryGo(){
    this.navCtrl.push(CategoryPage)
  }

  dailydealsGo(){
    this.navCtrl.push(DailyDealsPage)
  }

  eachProduct(i){
    
  }

  ionViewDidLoad() {
  //   this.data = this.http.get('http://198.199.67.147:8075/newreach/product')
  //   this.data.subscribe(data => {
  //     this.dealproducts = data.products;
  //     console.log(this.dealproducts)
  //   });  
  // }  

  this.http.get('http://198.199.67.147:8075/newreach/product', {}, {})
  .then(data => {

   alert(data.data); // data received by server
   alert(JSON.parse(data.data))


  })
  .catch(error => {

    alert(error.status);
    alert(error.error); // error message as string
    alert(error.headers);

  });
  }
}
