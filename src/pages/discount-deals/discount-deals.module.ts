import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscountDealsPage } from './discount-deals';

@NgModule({
  declarations: [
    DiscountDealsPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscountDealsPage),
  ],
})
export class DiscountDealsPageModule {}
