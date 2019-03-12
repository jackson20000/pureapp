import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";


@Injectable()
export class AuthProvider {

  public uid: number;
  public usrname:string;
  public pwd:string;

  constructor(public storage: Storage) {
              // this.storage.set('userData', this.loginData);
  }

  // public isLoggedIn(){
  // return this.storage.get('userData').then((val) => {
  //     return val;
  //   });
  //   }

    

}
