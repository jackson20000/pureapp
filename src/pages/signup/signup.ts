import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { HTTP } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  countryList: any = [];
  stateList: any = [];
  idtype: any = [];
  data: Observable<any>;
  data1: Observable<any>;
  data3: Observable<any>;
  idtypedata: Observable<any>;
  authForm : FormGroup;

  firstname: string;
  lastname: string;
  sex: string;
  dob: any;
  addr1: string;
  addr2: string;
  city: string;
  countrySelect: string;
  stateSelection: string;
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
  myphoto3: any;
  myProfilephoto: any;
  postPhoto1: any;
  postPhoto2: any;
  postPhoto3: any;
  postPhoto4: any;

  constructor(private fb: FormBuilder,public alertCtrl: AlertController,public navCtrl: NavController, public http: HTTP, public navParams: NavParams, private camera: Camera, private transfer: FileTransfer, private file: File, private fileChooser: FileChooser, private loadingCtrl: LoadingController) {
    this.authForm = fb.group({
      'firstname' : [null, Validators.compose([Validators.required])],
      'lastname' : [null, Validators.compose([Validators.required])],
      'sex' : [null, Validators.compose([Validators.required])],
      'dob' : [null, Validators.compose([Validators.required])],
      'addr1' : [null, Validators.compose([Validators.required])],
      'city' : [null, Validators.compose([Validators.required])],
      'countrySelect' : [null, Validators.compose([Validators.required])],
      'zip' : [null, Validators.compose([Validators.required])],
      'email' : [null, Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      'idtypeName' : [null, Validators.compose([Validators.required])],
      'idnum' : [null, Validators.compose([Validators.required])],
      'issuedPlace' : [null, Validators.compose([Validators.required])],
      'idexpiry' : [null, Validators.compose([Validators.required])],
      'medidnum' : [null, Validators.compose([Validators.required])],
      'medexpiry' : [null, Validators.compose([Validators.required])],
      'county' : [null, Validators.compose([Validators.required])],
      'physicianName' : [null, Validators.compose([Validators.required])],
      'physicianID' : [null, Validators.compose([Validators.required])]
		});
  }


  stateSelect(i) {
    this.stateList = i.states;
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
      this.postPhoto1 = imageData;
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
      this.postPhoto3 = imageData;
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
      this.postPhoto1 = imageData;
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
      this.postPhoto2 = imageData;
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
      this.postPhoto3 = imageData;
      this.myphoto3 = 'data:image/jpeg;base64,' + imageData;
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

    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",
      // duration: 2000
    });
    loader.present();


    // console.log("firstname: " + this.firstname);
    // console.log("lastname: " + this.lastname);
    // console.log("Profile photo: " + this.myProfilephoto);
    // console.log("sex: " + this.sex);
    // console.log("dob: " + this.dob);
    // console.log("addr1: " + this.addr1);
    // console.log("addr2: " + this.addr2);
    // console.log("city: " + this.city);
    // console.log("countrySelect: " + this.countrySelect);
    // console.log("stateSelection: " + this.stateSelection);
    // console.log("zip: " + this.zip);
    // console.log("email: " + this.email);
    // console.log("Customertype: " + this.customerType);
    // console.log("idtypeName: " + this.idtypeName);
    // console.log("Idnum: " + this.idnum);
    // console.log("issuedPlace: " + this.issuedPlace);
    // console.log("idexpiry: " + this.idexpiry);
    // console.log("medidnum: " + this.medidnum);
    // console.log("medexpiry: " + this.medexpiry);
    // console.log("medicalCounty: " + this.county);
    // console.log("physicianName: " + this.physicianName);
    // console.log("physicianID: " + this.physicianID);


    let data = {
      'db': 'cannabis_db',
      'username': 'admin',
      'password': 'admin',
      'name': this.firstname,
      'login': this.email,
      'email': this.email,
      'firstname': this.firstname,
      'lastName': this.lastname,
      'image': this.postPhoto3,
      'dob': this.dob,
      'street': this.addr1,
      'street2': this.addr2,
      'city': this.city,
      'zip': this.zip,
      'gen': this.sex,
      'country_id': this.countrySelect,
       'state_id' : this.stateSelection,
      'customer_type': this.customerType,
      'idType': this.idtypeName,
      'idNumber': this.idnum,
      'idExpDate': this.idexpiry,
      'issuePlace': this.issuedPlace,
      'image1': this.postPhoto1,
      'medicalidNumber': this.medidnum,
      'medicalFirstName': this.firstname,
      'medicalLastName': this.lastname,
      'medicalCounty': this.county,
      'medicalDob': this.dob,
      'medicalIdExpDate': this.medexpiry,
      'medicalImage': this.postPhoto2,    
      'medicalCertificateImage': this.postPhoto3,
      'medicalIssueName': this.physicianName,
      'medicalIssueId': this.physicianID,
      

    };

    let headers = {
      'Content-Type': 'application/json'
    };

    this.http.post('http://198.199.67.147:8075/newreach/customer/create', data, headers)
      .then((data) => {
        console.log(data);
        loader.dismiss();
        //alert('Succesfully Registered!');
        const alerts = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Succesfully Registered!',
          buttons: ['OK']
        });
        alert(JSON.stringify(data));
        alerts.present();
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error) => {
        console.log(error);
      });


    // Other Method

    // var url2 = 'http://192.168.2.21:8069/newreach/customer/medicalid';
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

    // For testing in mobile use Ionic native HTTP


    // For getting the list of countries

    this.http.get('http://198.199.67.147:8075/newreach/country/details', {}, {})
      .then(data => {

        var json = data.data; // data received by server
        let obj = JSON.parse(json);

        this.countryList = obj.country;
      })
      .catch(error => {

      });


    // // For getting the list of ID Types

    this.http.get('http://198.199.67.147:8075/newreach/idtype', {}, {})
      .then(data => {

        var json = data.data; // data received by server
        let obj = JSON.parse(json);

        this.idtype = obj.val;
      })
      .catch(error => {

      });



    // For testing in chrome use HTTPClient


    // this.data = this.http.get('http://192.168.2.21:8069/newreach/country/details')
    // this.data.subscribe(data => {
    //   this.countryList = data.country;
    //   console.log(this.countryList);

    // });

    // this.data1 = this.http.get('http://192.168.2.21:8069/newreach/idtype')
    // this.data1.subscribe(data1 => {
    //   this.idtype = data1.val;
    //   console.log(this.idtype)
    // });

  }
}

