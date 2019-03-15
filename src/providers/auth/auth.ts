import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";


@Injectable()
export class AuthProvider {

  public uid: number;
  public usrname:string;
  public pwd:string;
  public check: boolean = false;

  constructor(public storage: Storage) {
  }
    

}
