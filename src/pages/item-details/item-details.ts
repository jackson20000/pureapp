import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
//import { Storage } from '@ionic/storage';
import { CartProvider } from '../../providers/cart/cart';

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
 
  selectProduct: any;
  productCount: number = 1;
  cartItems: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private cartService: CartProvider, public toastCtrl: ToastController) {

    if (this.navParams.get("product")) {
      window.localStorage.setItem('selectedProduct', JSON.stringify(this.navParams.get("product")));
    } 
  }

  
  homeGo(){
    this.navCtrl.setRoot(HomePage)
  }
  
  ionViewDidEnter(){
    this.getSingleProduct();
  }
 

  getSingleProduct() {
    if (window.localStorage.getItem('selectedProduct') != 'undefined') {
      this.selectProduct = JSON.parse(window.localStorage.getItem('selectedProduct'))
    }
  }
 
  ionViewDidLoad() {
    this.selectProduct = this.navParams.get("product");
    this.cartService.getCartItems().then((val) => {
      this.cartItems = val;
    })
 
  }
  
 
  addToCart(product) {
    var productPrice = this.productCount * parseInt(product.unitPrice);
    let cartProduct = {
      product_id: product.productId,
      name: product.productName,
      thumb: product.image,
      count: this.productCount,
      unitprice: product.unitPrice,
      totalPrice: productPrice
    };
    this.cartService.addToCart(cartProduct).then((val) => {
      this.presentToast(cartProduct.name);
    });
  }
 
 
  presentToast(name) {
    let toast = this.toastCtrl.create({
      message: `${name} has been added to cart`,
      showCloseButton: true,
      closeButtonText: 'View Cart',
      duration: 2000
    });
 
    toast.onDidDismiss((data, role) => {
      if (role== "close") {
      this.navCtrl.setRoot('CartPage');  
      }       
    });
    toast.present();
  }

//   increment1(){         
//       if(this.itemCount1 < 6)
//       this.itemCount1 ++;
//      this.newitemCount1 =  this.itemCount1;    
//   }

//   decrement1(){         
//     if(this.itemCount1 > 0)
//     this.itemCount1 --;
//    this.newitemCount1 =  this.itemCount1;  
// }
  

}
