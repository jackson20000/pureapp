import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ApiDetailsProvider {

  public api: string ="http://45.33.40.210:8069";
  public db: string ="newreach_db";

  constructor(public http: HttpClient) {
    console.log('Hello ApiDetailsProvider Provider');
  }
}
