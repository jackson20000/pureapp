import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 
const CART_KEY = 'cartItems';
 
@Injectable()
export class CartProvider {

  public purchaseDetails: any;
 
  constructor(public storage: Storage) {
 
  }
 
  addToCart(product) {
    return this.getCartItems().then(result => {
      if (result) {
        if (!this.containsObject(product, result)) {
          result.push(product);
          return this.storage.set(CART_KEY, result);
        } else {         
          let index = result.findIndex(x => x.product_id == product.product_id);
          let prevQuantity = parseInt(result[index].count);
          let count = parseInt(product.count)
          product.count = prevQuantity + count;
          let currentPrice = (parseInt(product.totalPrice) * product.count);
          product.totalPrice =currentPrice;
           result.splice(index, 1);
          result.push(product);
          return this.storage.set(CART_KEY, result);
        } 
      } else {
        return this.storage.set(CART_KEY, [product]);
      }
    })
  }


  removeFromCart(product) {
    return this.getCartItems().then(result => {
    if (result) {
    result.forEach((item, index) => {
    if (item.product_id === product.product_id) {
    result.splice(index, 1)
    return this.storage.set(CART_KEY, result);
    }
    })
    }
    })    
    }   
  
 
  removeAllCartItems() {
    return this.storage.remove(CART_KEY).then(res => {
      return res;
    });
  }
 
 
  containsObject(obj, list): boolean {
    if (!list.length) {
      return false;
    }
 
    if (obj == null) {
      return false;
    }
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].product_id == obj.product_id) {
        return true;
      }
    }
    return false;
  }
 
  getCartItems() {
    return this.storage.get(CART_KEY);
  }
}