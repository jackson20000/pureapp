import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingPaymentPage } from './pending-payment';

@NgModule({
  declarations: [
    PendingPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingPaymentPage),
  ],
})
export class PendingPaymentPageModule {}
