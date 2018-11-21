import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home'


@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  itemCount1: number = 0;
  newitemCount1: number = 0;
  itemCount2: number = 0;
  newitemCount2: number = 0;
  value:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {      
    this.value = navParams.get('item');
  }

  
  homeGo(){
    this.navCtrl.setRoot(HomePage)
  }
  
  increment1(){  
       
      if(this.itemCount1 < 6)
      this.itemCount1 ++;
     this.newitemCount1 =  this.itemCount1; 
   
  }

  decrement1(){  
       
    if(this.itemCount1 > 0)
    this.itemCount1 --;
   this.newitemCount1 =  this.itemCount1; 
 
}

goCart(){
}


    
  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
  }


}
