import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { CartProvider } from "../../providers/cart/cart";
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: "page-cart",
  templateUrl: "cart.html"
})
export class CartPage {
  cartItems: any[] = [];
  totalAmount: number = 0;
  totalCount: number = 0;
  isCartItemLoaded: boolean = false;
  isEmptyCart: boolean = true;
  temp: number = 0;

  dealproducts: any = [];
  data: Observable<any>;
  items: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartProvider,
    private loadingCtrl: LoadingController,
    public http: HttpClient
  ) {}

 
  homeGo(){
    this.navCtrl.setRoot(HomePage)
  }

  
  public searchGo() {
    this.navCtrl.push(SearchPage,{items: this.items});  
  }



  loadCartItems() {
    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",
      // duration: 5000
    });
    loader.present();
    this.cartService
      .getCartItems()
      .then(val => {
        this.cartItems = val;
        if (this.cartItems.length > 0) {
          this.cartItems.forEach((v, indx) => {
            this.totalAmount += parseFloat(v.totalPrice);
            this.totalCount += parseFloat(v.count);
            console.log(this.totalCount);
          });
          this.isEmptyCart = false;
        }
        else{
          this.totalAmount = 0;
          this.isEmptyCart = true;
        }
        this.isCartItemLoaded = true;
        loader.dismiss();
      })
      .catch(err => {});
  }

  
  removeItem(itm) {
 
    this.cartService.removeFromCart(itm).then(() => {      
      this.cartService
        .getCartItems()
        .then(val => {
          this.cartItems = val;
          if (this.cartItems.length > 0) {
            this.cartItems.forEach((i) => {
              this.totalAmount += parseInt(i.totalPrice); 
              this.totalCount += parseFloat(i.count);
            console.log(this.totalCount);
              this.navCtrl.setRoot('CartPage');         
            });            
            this.isEmptyCart = false;
          }
          else{
            this.totalAmount = 0;
            this.isEmptyCart = true;
          }
          this.isCartItemLoaded = true;
        })
        .catch(err => {});
    });
  }


  checkOut(){
   if(this.totalCount > 28.5){
     alert("You've exceeded the daily limit");
   }
   else
   {
    alert("Successfully placed the order");
   }
  }


  ionViewDidLoad() {

    this.loadCartItems();

    // For testing in chrome use HTTPClient

    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",
      duration: 2000
    });
    loader.present();


    this.data = this.http.get('http://198.199.67.147:8075/newreach/product')
    this.data.subscribe(data => {
      this.dealproducts = data.products;
      console.log(this.dealproducts)

      var productNames = []
      for (var i of this.dealproducts) {
        productNames.push(i.productName);
      }
      this.items = productNames;
    });
    loader.dismiss();


  }
}
