import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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
  constructor(public navCtrl: NavController, public navParams: NavParams) {      
  
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

increment2(){  
       
  if(this.itemCount2 < 6)
  this.itemCount2 ++;
 this.newitemCount2 =  this.itemCount2; 

}

decrement2(){  
   
if(this.itemCount2 > 0)
this.itemCount2 --;
this.newitemCount2 =  this.itemCount2; 

}

goCart(){
  
}


    
  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
  }


}