import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    HistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryPage), NgxQRCodeModule
  ],
})
export class HistoryPageModule {}
