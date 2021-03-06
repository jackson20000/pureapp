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
import { ApiDetailsProvider } from '../../providers/api-details/api-details';
import { AuthProvider } from '../../providers/auth/auth';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';

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
  authForm: FormGroup;

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
  myDate: String = new Date().toISOString();
  today: any = new Date();


  constructor(
    private fb: FormBuilder,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public http: HTTP,
    public navParams: NavParams,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    private fileChooser: FileChooser,
    private loadingCtrl: LoadingController,
    private apiData: ApiDetailsProvider,
    private auth: AuthProvider
  ) {
    this.authForm = fb.group({
      'firstname': [null, Validators.compose([Validators.required])],
      'lastname': [null, Validators.compose([Validators.required])],
      'sex': [null, Validators.compose([Validators.required])],
      'dob': [null, Validators.compose([Validators.required])],
      'addr1': [null, Validators.compose([Validators.required])],
      'city': [null, Validators.compose([Validators.required])],
      'countrySelect': [null, Validators.compose([Validators.required])],
      'zip': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      'idtypeName': [null, Validators.compose([Validators.required])],
      'idnum': [null, Validators.compose([Validators.required])],
      'issuedPlace': [null, Validators.compose([Validators.required])],
      'idexpiry': [null, Validators.compose([Validators.required])],
      'medidnum': [null, Validators.compose([])],
      'medexpiry': [null, Validators.compose([])],
      'county': [null, Validators.compose([])],
      'physicianName': [null, Validators.compose([])],
      'physicianID': [null, Validators.compose([])]
    });
    this.today.setFullYear( this.today.getFullYear() - 18 );
    this.today = this.today.toISOString();
  }

  stateSelect(i) {
    this.stateList = i.states;
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 70,
      targetWidth: 900,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.postPhoto1 = imageData;
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

  takePhoto1() {
    const options: CameraOptions = {
      quality: 70,
      targetWidth: 900,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.postPhoto3 = imageData;
      this.myProfilephoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

  getImage() {
    const options: CameraOptions = {
      quality: 70,
      targetWidth: 900,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.postPhoto1 = imageData;
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
      console.log(this.myphoto);
    }, (err) => {
    });
  }


  getImage1() {
    const options: CameraOptions = {
      quality: 70,
      targetWidth: 900,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.postPhoto2 = imageData;
      this.myphoto1 = 'data:image/jpeg;base64,' + imageData;
      console.log(this.myphoto1);
    }, (err) => {
    });
  }

  getImage2() {
    const options: CameraOptions = {
      quality: 70,
      targetWidth: 900,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.postPhoto3 = imageData;
      this.myphoto3 = 'data:image/jpeg;base64,' + imageData;
      console.log(this.myphoto1);
    }, (err) => {
    });
  }

  register() {

    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",
    });
    loader.present();

    let data = {
      'db': this.apiData.db,
      'username': this.auth.usrname,
      'password': this.auth.pwd,
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
      'state_id': this.stateSelection,
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
      'medicalIssueId': this.physicianID
    };

    let headers = {
      'Content-Type': 'application/json'
    };

    this.http.post(this.apiData.api + '/newreach/customer/create', data, headers)
      .then((data) => {
        loader.dismiss();
        const alerts = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Succesfully Registered!',
          buttons: ['OK']
        });
        alerts.present();
        this.navCtrl.setRoot(LoginPage);
        loader.dismiss();
      })
      .catch((error) => {
        const alerts = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Registration failed! Please try again later.',
          buttons: ['OK']
        });
        alert(JSON.stringify(error));
        alerts.present();
        loader.dismiss();
      });
  }

  ionViewDidLoad() {
    this.http.get(this.apiData.api + '/newreach/country/details', {}, {})
      .then(data => {
        var json = data.data;
        let obj = JSON.parse(json);
        this.countryList = obj.country;
      })
      .catch(error => {
      });

    // For getting the list of ID Types
    this.http.get(this.apiData.api + '/newreach/idtype', {}, {})
      .then(data => {
        var json = data.data;
        let obj = JSON.parse(json);
        this.idtype = obj.val;
      })
      .catch(error => {
      });
  }
}

