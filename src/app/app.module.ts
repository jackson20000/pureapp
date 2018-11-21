import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { CartPage } from '../pages/cart/cart';
import { CategoryPage } from '../pages/category/category';
import { DailyDealsPage } from '../pages/daily-deals/daily-deals';
import { HomePage } from '../pages/home/home';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { SignupPage } from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { HTTP } from '@ionic-native/http';


@NgModule({
  declarations: [
    MyApp,
    CartPage,
    CategoryPage,
    DailyDealsPage,
    HomePage,
    ItemDetailsPage,
    LoginPage,
    ProfilePage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CartPage,
    CategoryPage,
    DailyDealsPage,
    HomePage,
    ItemDetailsPage,
    LoginPage,
    ProfilePage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,FileTransfer, File, FileChooser, HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
