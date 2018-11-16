import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  countryList: any = [];
  states: any = [];
  idtype: any = [];
  data: Observable<any>;
  idtypedata: Observable<any>;
  adult: any;

 
  firstname: string;
  lastname: string;
  sex: string;
  dob: number;
  addr1: string;
  addr2: string;
  city: string;
  countrySelect: string;
  zip: number;
  email: string;
  customerType: string;
  idtypeName: any;
  medicalidtypeName:string;  
  idnum: number;
  expiry: number;
  issuedPlace: string;
  physicianName:string;
  physicianID:number;
  
  // Uploads
  myphoto:any;

  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, private camera: Camera, private transfer: FileTransfer, private file: File, private loadingCtrl: LoadingController) {

  }

 
 
  takePhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  getImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  // cropImage() {
  //   const options: CameraOptions = {
  //     quality: 70,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     saveToPhotoAlbum: false,
  //     allowEdit:true,
  //     targetWidth:300,
  //     targetHeight:300
  //   }

  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64:
  //     this.myphoto2 = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     // Handle error
  //   });
  // }

  uploadImage(){
  //  let url="sddsa";
  //  let postData = new FormData();
  //  postData.append('file', this.myphoto);
  //  let data.Observable<any> = this.http.post(url, postData);
  //  data.subscribe(result) => {
  //    console.log(result);
  //  }
  }


  register() {    
 
    console.log("firstname: " + this.firstname);
    console.log("lastname: " + this.lastname);
    console.log("sex: " + this.sex);
    console.log("dob: " + this.dob);
    console.log("addr1: " + this.addr1);
    console.log("addr2: " + this.addr2);
    console.log("city: " + this.city);
    console.log("countrySelect: " + this.countrySelect);
    console.log("zip: " + this.zip);
    console.log("email: " + this.email);
    console.log("Customertype: " + this.customerType);
    console.log("idtypeName: " + this.idtypeName);
    console.log("MedicalidtypeName: " + this.medicalidtypeName);
    console.log("idnum: " + this.idnum);
    console.log("expiry: " + this.expiry);
    console.log("issuedPlace: " + this.issuedPlace);
    console.log("physicianName: " + this.physicianName);
    console.log("physicianID: " + this.physicianID);

  }



  // postData(){
  //   var url = 'http://198.199.67.147:8075/newreach/customer/create';
  //   let postData =new FormData();
  //   postData.append('name', name);
  //   postData.append('login', 'indgfffggia@gmail.com');  
  //   postData.append('email', 'indgfffggia@gmail.com');  
  //   postData.append('firstname', 'indggiddda');  

  //   this.data = this.http.post(url, postData);
  //   this.data.subscribe(data =>{
  //     console.log(data)
  //   })
  //   }




  ionViewDidLoad() {
    var url = 'http://192.168.0.23:8066/newreach/country/details';
    this.data = this.http.get(url);
    this.data.subscribe(data => {
      this.countryList = data.country;
      this.states = data.country[10].states;

      console.log(this.countryList)
      console.log(this.states)

    })

    var url2 = 'http://192.168.0.23:8066/newreach/idtype';
    this.idtypedata = this.http.get(url2);
    this.idtypedata.subscribe(idtypedata => {
      this.idtype = idtypedata.val;
      console.log(this.idtype)
    })
  }


}

