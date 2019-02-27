import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ApiDetailsProvider {

  public api: string = "http://192.168.1.222:8091";
  public db: string ="new_reach_dev";

  constructor(public http: HttpClient) {
    console.log('Hello ApiDetailsProvider Provider');
  }

}
