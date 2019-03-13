import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PublicDataProvider {

  public profileData: any;

  constructor(public http: HttpClient) {
    console.log('Hello PublicDataProvider Provider');
  }

}
