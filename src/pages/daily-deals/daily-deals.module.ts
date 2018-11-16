import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyDealsPage } from './daily-deals';

@NgModule({
  declarations: [
    DailyDealsPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyDealsPage),
  ],
})
export class DailyDealsPageModule {}
