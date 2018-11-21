import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';

import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  countryList: any = [];
  states: any = [];
  idtype: any = [];
  data: Observable<any>;
  data1: Observable<any>;
  data3: Observable<any>;
  idtypedata: Observable<any>;

  firstname: string;
  lastname: string;
  sex: string;
  dob: any;
  addr1: string;
  addr2: string;
  city: string;
  countrySelect: string;
  zip: any;
  email: string;
  customerType: string;
  idtypeName: any;
  idnum: any;
  issuedPlace: string;
  idexpiry: any;
  medidnum: any;
  medexpiry: any;
  county: string;
  physicianName: string;
  physicianID: any;

  // Uploads
  myphoto: any;
  myphoto1: any;
  myphoto2: any;
  myProfilephoto: any;
  
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, private camera: Camera, private transfer: FileTransfer, private file: File, private fileChooser: FileChooser, private loadingCtrl: LoadingController) {

  }



  takePhoto() {
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

  takePhoto1() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myProfilephoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  getImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
      console.log(this.myphoto);
    }, (err) => {
      // Handle error
    });
  }


  getImage1() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto1 = 'data:image/jpeg;base64,' + imageData;
      console.log(this.myphoto1);
    }, (err) => {
      // Handle error
    });
  }

  getImage2() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto1 = 'data:image/jpeg;base64,' + imageData;
      console.log(this.myphoto1);
    }, (err) => {
      // Handle error
    });
  }


  // choose() {
  //   this.fileChooser.open().then((uri) => {
  //     alert(uri);

  //     this.file.resolveLocalFilesystemUrl(uri).then((newUrl) => {
  //       alert(JSON.stringify(newUrl));

  //       let dirPath = newUrl.nativeURL;
  //       let dirPathSegments = dirPath.split('/')
  //       dirPathSegments.pop()
  //       dirPath = dirPathSegments.join('/')
  //       alert(dirPath);

  //     })
  //   })
  // }


  register() {

    console.log("firstname: " + this.firstname);
    console.log("lastname: " + this.lastname);
    console.log("Profile photo: " + this.myProfilephoto);
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
    console.log("Idnum: " + this.idnum);
    console.log("issuedPlace: " + this.issuedPlace);
    console.log("idexpiry: " + this.idexpiry);
    console.log("medidnum: " + this.medidnum);
    console.log("medexpiry: " + this.medexpiry);
    console.log("medicalCounty: " + this.county);
    console.log("physicianName: " + this.physicianName);
    console.log("physicianID: " + this.physicianID);


    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });

    // let body = {
    //   name: "julia",
    //   login: "mayhem4@gmail.com",
    //   email: "mayhem4@gmail.com",
    //   firstname: "julia",
    // }

    // this.http.post('http://198.199.67.147:8075/newreach/customer/create', JSON.stringify(body), { headers: headers })
    //   .subscribe(data => {
    //     console.log(data);
    //   });

    


    // var url = 'http://198.199.67.147:8075/newreach/customer/create';
    // let postData = new FormData();
    // postData.append('name', this.firstname);
    // postData.append('login', this.email);
    // postData.append('email', this.email);
    // postData.append('firstname', this.firstname);
    // postData.append('lastName', this.lastname);
    // postData.append('dob', this.dob);
    // postData.append('street', this.addr1);
    // postData.append('street2', this.addr2);
    // postData.append('city', this.city);
    // postData.append('zip', this.zip);
    // postData.append('gen', this.sex);
    // postData.append('country_id', this.countrySelect);
    // postData.append('customer_type', this.customerType);
    // postData.append('idType', this.idtypeName);
    // postData.append('idNumber', this.idnum);
    // postData.append('idExpDate', this.idexpiry);
    // postData.append('issuePlace', this.issuedPlace);
    // postData.append('image1', this.myphoto);
    // postData.append('medicalidNumber', this.medidnum);
    // postData.append('medicalFirstName', this.firstname);
    // postData.append('medicalLastName', this.lastname);
    // postData.append('medicalCounty', this.county);
    // postData.append('medicalDob', this.dob);
    // postData.append('medicalIdExpDate', this.medexpiry);
    // postData.append('medicalImage', this.myphoto1);
    // postData.append('medicalIssueName', this.physicianName);
    // postData.append('medicalIssueId', this.physicianID);

    // this.data3 = this.http.post(url, postData);
    // this.data3.subscribe(data3 => {
    //   console.log(data3)
    // })


  //   let data = {
  //     'name': this.firstname,
  //     'login': this.email,
  //     'email': this.email,
  //     'firstname': this.firstname,
  //     'lastName': this.lastname,
  //     'image' : this.myProfilephoto,
  //     'dob': this.dob,
  //     'street': this.addr1,
  //     'street2': this.addr2,
  //     'city': this.city,
  //     'zip': this.zip,
  //     'gen': this.sex,
  //     'country_id': this.countrySelect,
  //     'customer_type': this.customerType,
  //     'idType': this.idtypeName,
  //     'idNumber': this.idnum,
  //     'idExpDate': this.idexpiry,
  //     'issuePlace': this.issuedPlace,
  //     'image1': this.myphoto,
  //     'medicalidNumber': this.medidnum,
  //     'medicalFirstName': this.firstname,
  //     'medicalLastName': this.lastname,
  //     'medicalCounty': this.county,
  //     'medicalDob': this.dob,
  //     'medicalIdExpDate': this.medexpiry,
  //     'medicalImage': this.myphoto1,
  //     'medicalIssueName': this.physicianName,
  //     'medicalIssueId': this.physicianID
  // };

  // let headers = {
  //     'Content-Type': 'application/json'
  // };

  // this.http.post('http://198.199.67.147:8075/newreach/customer/create', data, headers)
  //             .then((data) => {
  //                 console.log(data);
  //                 alert('Succesfully Registered!');
  //                 this.navCtrl.setRoot(HomePage);
  //             })
  //             .catch((error) => {
  //                 console.log(error);
  //             });

   


    // var url = 'api/newreach/customer/create';
    //   let postData =new FormData();
    //   console.log(this.countrySelect);
    //   console.log(this.idtypeName);

    //   postData.append('name', 'mayy');
    //   postData.append('login', 'mayy@gmail.com');  
    //   postData.append('email', 'mayy@gmail.com');  
    //   postData.append('firstname', 'mayy'); 
    //   postData.append('lastName', 'june');
    //   postData.append('dob', '11-10-2018');    
    //   postData.append('street', 'july');  
    //   postData.append('street2', 'aug');  
    //   postData.append('city', 'sdfds');  
    //   postData.append('zip', '555555522');  
    //   postData.append('gen', 'male');  
    //   postData.append('country_id', this.countrySelect);  
    //   postData.append('customer_type', 'adult_customer');
    //   postData.append('idType', this.idtypeName);  
    //   postData.append('idNumber', '46465');  
    //   postData.append('idExpDate', '10-2-2018');
    //   postData.append('issuePlace', 'sfdsdf');   
    //   postData.append('db', 'cannabis');   

    //   this.data = this.http.post(url, postData);
    //   this.data.subscribe(data =>{
    //     console.log(data)
    //   })

    // var url2 = 'http://192.168.0.23:8066/newreach/customer/medicalid';
    // let postData2 =new FormData();    
    // postData2.append('username', "admin");
    // postData2.append('password', "admin"); 
    // postData2.append('db', 'falcon_db');
    // postData2.append('medicalidNumber', '45645');
    // postData2.append('medicalFirstName', 'may');  
    // postData2.append('medicalLastName', 'june');
    // postData2.append('medicalCounty', 'feb');
    // postData2.append('medicalDob', '11-10-2018'); 
    // postData2.append('medicalIdExpDate', '21-10-2018');  
    // postData2.append('medicalIssueName', 'jan');    
    // postData2.append('medicalIssueId', '45445');   

    // this.data2 = this.http.post(url2, postData2);
    // this.data2.subscribe(data2 =>{
    //   console.log(data2)
    // })



  }


  ionViewDidLoad() {

// For getting the list of countries

//   this.http.get('http://198.199.67.147:8075/newreach/country/details', {}, {})
//   .then(data => {

//   var json= data.data; // data received by server
//   let obj = JSON.parse(json);

//   this.countryList = obj.country;
//   })
//   .catch(error => {

//     // alert(error.status);
//     // alert(error.error); // error message as string
//     // alert(error.headers);

//   });


// // For getting the list of ID Types

//   this.http.get('http://198.199.67.147:8075/newreach/idtype', {}, {})
//   .then(data => {

//   var json= data.data; // data received by server
//   let obj = JSON.parse(json);

//   this.idtype = obj.val;
//   })
//   .catch(error => {

//     // alert(error.status);
//     // alert(error.error); // error message as string
//     // alert(error.headers);

//   });

    this.data = this.http.get('http://198.199.67.147:8075/newreach/country/details')
    this.data.subscribe(data => {
      this.countryList = data.country;
      console.log(this.countryList);

    });

    this.data1 = this.http.get('http://198.199.67.147:8075/newreach/idtype')
    this.data1.subscribe(data1 => {
      this.idtype = data1.val;
      console.log(this.idtype)
    });

  }
}

