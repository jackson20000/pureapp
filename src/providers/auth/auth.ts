import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";


@Injectable()
export class AuthProvider {

  constructor(public storage: Storage) {
    
  }

  public isLoggedIn(){
  return this.storage.get('userData').then((val) => {
      return val;
    });
    }

}
