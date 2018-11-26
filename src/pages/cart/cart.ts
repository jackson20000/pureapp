import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { CartProvider } from "../../providers/cart/cart";
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: "page-cart",
  templateUrl: "cart.html"
})
export class CartPage {
  cartItems: any[] = [];
  totalAmount: number = 0;
  isCartItemLoaded: boolean = false;
  isEmptyCart: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartProvider,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.loadCartItems();
  }

  homeGo(){
    this.navCtrl.setRoot(HomePage)
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
            this.totalAmount += parseInt(v.totalPrice);
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

  checkOut() {    
  }

  removeItem(itm) {
 
    this.cartService.removeFromCart(itm).then(() => {      
      this.cartService
        .getCartItems()
        .then(val => {
          this.cartItems = val;
          if (this.cartItems.length > 0) {
            this.cartItems.forEach((v, indx) => {
              this.totalAmount += parseInt(v.totalPrice);
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
}
