import { Component } from '@angular/core';
import { NavController,NavParams,ViewController,Platform,AlertController} from 'ionic-angular';
import {Validators, FormBuilder,FormControl,FormGroup} from '@angular/forms';

import { Control, ControlGroup} from '@angular/common';

import {ResultPage} from '../result/result';
import {InAppPurchase} from 'ionic-native';

//import {AdMob} from 'ionic-native';

declare var AdMob: any;

@Component({
  templateUrl: 'build/pages/input/input.html'
  
})
export class InputPage {

   public person;
   public chaldeanValues;
   public pythValues;
   private fValueSum = 0 ;
   private mValueSum = 0 ;
   private lValueSum = 0 ;
   private totalValueSum = 0;
   private totalSum = 0;
   private paidAppBtn: boolean = false; // For free app Chaldean is available else Pythagorean
   private numrlgyMethod: string = "C"; // For  Chaldean (C)  else {P} for Pythagorean
  // private userinputform;
  public userform;
  private admobId: any;
   private IAP;

  fName:FormControl;
  mName:FormControl;
  lName:FormControl;

  /* Admob related variables */
   private banner_pub_id_android: string;
   private interstatial_pub_id_android: string;
   private banner_pub_id_ios: string;
   private interstatial_pub_id_ios: string;

  constructor(public navCtrl: NavController, private platform: Platform,private navParams: NavParams,private formBuilder: FormBuilder,public alertCtrl: AlertController) {
      
      console.log("Input  page entered:-->");
      console.log("navigation views count  at input page is "+this.navCtrl.length());

      this.IAP = {
        list: [ "adfree"]
      };
      //webtalk445 account details for admob Android
      /*this.banner_pub_id_android = 'ca-app-pub-1542644798135048/9464427615';
      this.interstatial_pub_id_android = 'ca-app-pub-1542644798135048/9464427615'*/
       //Tureya admob details - Android
      this.banner_pub_id_android = 'ca-app-pub-4088114868017530/8693649605';
      this.interstatial_pub_id_android = 'ca-app-pub-4088114868017530/8693649605';


       //webtalk445 account details for admob ios
      /* this.banner_pub_id_ios =  'ca-app-pub-1542644798135048/3573854418';
      this.interstatial_pub_id_ios = 'ca-app-pub-1542644798135048/3573854418';*/

      //Tureya admob details - ios
      this.banner_pub_id_ios =  'ca-app-pub-4088114868017530/3966390005';
      this.interstatial_pub_id_ios = 'ca-app-pub-4088114868017530/3966390005';
      
        //To be uncommented for Final release
        if(/(android)/i.test(navigator.userAgent)) {
            this.admobId = {
                banner: this.banner_pub_id_android,
                interstitial: this.interstatial_pub_id_android
            };
        } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
                this.admobId = {
                    banner: this.banner_pub_id_ios,
                    interstitial: this.interstatial_pub_id_ios
                };
        }
        this.platform.ready().then(() => {
            console.log(" platform ready event in input.ts"+AdMob);
                if(AdMob)  {
                    console.log("Admob exists and running, banne ad id"+this.admobId.banner)
                    AdMob.createBanner(
                        {
                        adId:this.admobId.banner,
                        isTesting:true,//comment this out before publishing the app,
                        position:AdMob.AD_POSITION.BOTTOM_CENTER,
                        autoShow:true
                        } 
                    );
                }
                    
        });

      this.person = {
        fName : '',
        fNameValue :'',
        mName : '',
        mNameValue :'',
        lName : '',
        lNameValue :'',
        totalValueSum: '',
        totalSum:'',
        numrlgyMethod:'C'
    };
    
    this.chaldeanValues = {
         "0" : 0, "1" : 1, "2" : 2, "3" : 3, "4" : 4, "5" : 5,
         "6" : 6, "7" : 7, "8" : 8, "9" : 9, "A" : 1, "B" : 2,
         "C" : 3, "D" : 4, "E" : 5, "F" : 8, "G" : 3, "H" : 5,
         "I" : 1, "J" : 1, "K" : 2, "L" : 3, "M" : 4, "N" : 5,
         "O" : 7, "P" : 8, "Q" : 1, "R" : 2, "S" : 3, "T" : 4,
         "U" : 6, "V" : 6, "W" : 6, "X" : 5, "Y" : 1, "Z" : 7
    };
    this.pythValues = {
         "0" : 0, "1" : 1, "2" : 2, "3" : 3, "4" : 4, "5" : 5,
         "6" : 6, "7" : 7, "8" : 8, "9" : 9, "A" : 1, "B" : 2,
         "C" : 3, "D" : 4, "E" : 5, "F" : 6, "G" : 7, "H" : 8,
         "I" : 9, "J" : 1, "K" : 2, "L" : 3, "M" : 4, "N" : 5,
         "O" : 6, "P" : 7, "Q" : 8, "R" : 9, "S" : 1, "T" : 2,
         "U" : 2, "V" : 4, "W" : 5, "X" : 6, "Y" : 7, "Z" : 8
     };
    
   //this.ionViewLoaded();
  }
  
  ionViewLoaded() {
      console.log("ionicview loaded");
        this.fName = new FormControl('', Validators.compose([Validators.minLength(0),Validators.pattern('^[A-Za-z0-9- ]+$')]));  
        this.mName = new FormControl('', Validators.compose([Validators.minLength(0),Validators.pattern('^[A-Za-z0-9- ]+$')]));  
        this.lName = new FormControl('', Validators.compose([Validators.minLength(0),Validators.pattern('^[A-Za-z0-9- ]+$')])); 
        /*this.userform = this.formBuilder.group({
            fName: this.fName,
            mName: this.mName,
            lName: this.lName
        });*/
        this.userform = this.formBuilder.group({
            fName: this.fName,
            mName: this.mName,
            lName: this.lName
        });
        
        /*this.userform = new FormGroup({
            fName: new FormControl('', Validators.compose([Validators.minLength(0),Validators.pattern('^[A-Za-z0-9- ]+$')])),
            mName: new FormControl('', Validators.compose([Validators.minLength(0),Validators.pattern('^[A-Za-z0-9- ]+$')])),
            lName: new FormControl('', Validators.compose([Validators.minLength(0),Validators.pattern('^[A-Za-z0-9- ]+$')])),
        });
        console.log(this.userform.value);
        console.log(this.userform.status);*/
        
        //userform.pr({fName:'as',mName:'ad'})
  }
  
  /*logForm(){
    console.log(this.userform.value)
    this.person.fName = this.userform.controls['fName'].value   ;
    this.person.mName = this.userform.controls['mName'].value   ;
    this.person.lName = this.userform.controls['lName'].value   ;
    console.log("this person is "+JSON.stringify(this.person));
  }*/
  addTotal(value){
      var sum = 0;
      console.log("Value passed is"+value)
      value = Math.floor(value);
      while (value > 0 ) {
        sum += value % 10;
        console.log("sum is "+sum);
        value = Math.floor(value / 10);
        console.log("within while value is - "+value)
      }
      console.log("Sum of a integer within number is :: "+sum);
      if( sum > 9 )
            return this.addTotal( sum );
      else
            return sum;
      
      //return sum;
  }
  calculateSum(name: string ,position:number) {
      //console.log("Name in calculate sum is "+name);
      var nameSum = 0;
      if (this.person.numrlgyMethod == 'C') {
        for (let entry of name) {
            console.log("fName entry value is "+this.chaldeanValues[entry]);
            nameSum += this.chaldeanValues[entry];
        }
      }else if (this.person.numrlgyMethod == 'P'){
        for (let entry of name) {
            console.log("fName entry value  as per Pyth is "+this.pythValues[entry]);
            nameSum += this.pythValues[entry];
        }

      }
      console.log("Total Sum for given name -->"+name+" is--> "+this.person.nameSum);
      return nameSum;
        
  }
  

  showResult() {
      console.log(this.userform.value);
    this.person.fNameValue = 0 ;
    this.person.lNameValue = 0 ; 
    this.person.mNameValue = 0 ; 
    this.person.totalValueSum = 0
    this.person.totalSum = 0;
    /*console.log('Submitted value:::'+this.userinputform.value)
    //console.log('Submitted value: ', value);
    this.person.fName = this.userinputform.controls['fName'].value   ;
    this.person.mName = this.userinputform.controls['mName'].value   ;
    this.person.lName = this.userinputform.controls['lName'].value   ;
    console.log("Fname in showResult is->"+this.person.fName);*/

    //console.log("calculate clicked"+this.values["a"])

    this.person.fName = this.userform.controls['fName'].value  ;
    this.person.mName = this.userform.controls['mName'].value   ;
    this.person.lName = this.userform.controls['lName'].value  ;
    console.log("Fname is "+this.person.fName);
     if ( (this.person.fName).length){
         console.log("Fname is "+this.person.fName);
         console.log("Fname is trime "+this.person.fName.replace(/\s+/g, ''));
         this.person.fNameValue = this.calculateSum(this.person.fName.replace(/\s+/g, '').toUpperCase().trim(),1);
         this.person.totalSum += this.person.fNameValue;
         console.log("Total Sum after fName is::"+this.person.totalSum);
         if(this.person.fNameValue >= 10 ){
            this.person.fNameValue = this.addTotal(this.person.fNameValue);
        }
     }
     if ( (this.person.mName).length){
         this.person.mNameValue =  this.calculateSum(this.person.mName.replace(/\s+/g, '').toUpperCase().trim(),2);
         this.person.totalSum += this.person.mNameValue;
         console.log("Total Sum after mName is::"+this.person.totalSum);
         if(this.person.mNameValue >= 10 ){
            this.person.mNameValue = this.addTotal(this.person.mNameValue);
         }
     }
     if ( (this.person.lName).length){
         this.person.lNameValue = this.calculateSum(this.person.lName.replace(/\s+/g, '').toUpperCase().trim(),3);
         this.person.totalSum += this.person.lNameValue;
         console.log("Total Sum after lName is::"+this.person.totalSum);
         if(this.person.lNameValue >= 10 ){
             console.log("Last Name value before add is -"+this.person.lNameValue);
            this.person.lNameValue = this.addTotal(this.person.lNameValue);
            console.log("Last Name value after add is -"+this.person.lNameValue);
          }
     }
     /*if ( (this.person.fName).length || (this.person.mName).length || (this.person.lName).length ){
         this.calculateSum(this.person.fName+this.person.mName+this.person.lName,0);
     }*/
     
     //this.person.totalSum = this.person.fNameValue + this.person.mNameValue + this.person.lNameValue;
     
     
     
     //if(this.person.lNameValue >=10 ){
        //console.log("lName value is before:: "+this.person.lNameValue);
         //this.person.lNameValue = this.addTotal(this.person.lNameValue);
        // console.log("lName value is after:: "+this.person.lNameValue);
     //}
      let totalValue = this.person.fNameValue + this.person.mNameValue + this.person.lNameValue;
      this.person.totalValueSum = this.addTotal(totalValue)
      this.navCtrl.push(ResultPage,{user: this.person});
  }
  
  clearInput (){
      this.userform.controls['fName'].updateValue('');
      this.userform.controls['mName'].updateValue('');
      this.userform.controls['lName'].updateValue('');
  }
  numrlgyBtnClicked() {
      this.paidAppBtn = true;
      //this.numrlgyMethod = !this.numrlgyMethod;
  }
  chalBtnClicked() {
      this.person.numrlgyMethod = 'C';
      //console.log("Numerology method is -> "+this.numrlgyMethod);
  }
  pythBtnClicked(){
        
        InAppPurchase.getProducts(['com.tureya.numerology.adfree'])
            .then(function (products) {
                console.log('Products are '+JSON.stringify(products));
                /*
                [{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', price: '...' }, ...]
                */
            })
            .catch(function (err) {
                console.log('Error in InAppPurchase getting products---> '+JSON.stringify(err));
            });
        //    var products = InAppPurchase.getProducts(['com.tureya.numerology.adfree']);
        //   console.log('products are '+JSON.stringify(products));
        console.log("get products is done ")
        InAppPurchase.buy('com.tureya.numerology.adfree').then(function (data) {
                console.log('Data from apple app store is '+JSON.stringify(data));
                let alert = this.alertCtrl.create({
                    title: 'Full version added!',
                    subTitle: 'Congratulations !! Full version includes Pythagorean numerology method and its adfree!!!',
                    buttons: ['OK']
                });
                alert.present();
                if(AdMob)  {
                    AdMob.hideBanner();
                    console.log('Admob is disabled , all banners hidden');
                }
                this.person.numrlgyMethod = 'P';
                    /*
                    {
                        transactionId: ...
                        receipt: ...
                        signature: ...
                    }
                    */
                })
                .catch(function (err) {
                    this.person.numrlgyMethod = 'C';
                    console.log("Error in buy InAppPurchase"+JSON.stringify(err));
                });
      /*let alert = this.alertCtrl.create({
                title: 'Full Version!',
                subTitle: 'Full version includes Pythagorean numerology method and its adfree!!!',
                buttons: [
                    {
                        text: 'Disagree',
                        handler: () => {
                            console.log('Disagree clicked');
                        }
                    },
                    {
                        text: 'Agree',
                        handler: () => {
                            console.log('Agree clicked');
                            
                        }
                    }
                ]
       });
       alert.present();*/

       
      //console.log("Numerology method PythBtn is -> "+this.numrlgyMethod)
  }

  
}