import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { CartProvider } from '../providers/cart/cart';
import { AuthProvider } from '../providers/auth/auth';
import { HTTP } from '@ionic-native/http';


import { MyApp } from './app.component';
import { CategoryPage } from '../pages/category/category';
import { DailyDealsPage } from '../pages/daily-deals/daily-deals';
import { HomePage } from '../pages/home/home';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { SearchPage } from '../pages/search/search';
import { SignupPage } from '../pages/signup/signup';
import { DiscountDealsPage } from '../pages/discount-deals/discount-deals';
import { CategoryListPage } from '../pages/category-list/category-list';
import { SearchPipe } from '../pipes/search/search';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';


@NgModule({
  declarations: [
    MyApp,
    CategoryPage,
    CategoryListPage,
    DailyDealsPage,
    DiscountDealsPage,
    HomePage,
    ItemDetailsPage,
    LoginPage,
    ProfilePage,
    SearchPage,
    SignupPage,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule, IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoryPage,
    CategoryListPage,
    DailyDealsPage,
    DiscountDealsPage,
    HomePage,
    ItemDetailsPage,
    LoginPage,
    ProfilePage,
    SearchPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,FileTransfer, File, FileChooser, HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CartProvider,
    AuthProvider
  ]
})
export class AppModule {}
