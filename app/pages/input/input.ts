import { Component } from '@angular/core';
import { NavController,NavParams,ViewController,Platform,AlertController,LoadingController} from 'ionic-angular';
import {Validators, FormBuilder,FormControl,FormGroup} from '@angular/forms';

import { Control, ControlGroup} from '@angular/common';

import {ResultPage} from '../result/result';
import {InAppPurchase} from 'ionic-native';

import{UserData} from '../../providers/user-data';
import{AdInfo} from '../../providers/ad-info';

//import {AdMob} from 'ionic-native';

//declare var AdMob: any;

@Component({
  templateUrl: 'build/pages/input/input.html',
  providers: [UserData,AdInfo]
  
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
  //private admobId: any;

  fName:FormControl;
  mName:FormControl;
  lName:FormControl;

  /* Admob related variables */
   /*private banner_pub_id_android: string;
   private interstatial_pub_id_android: string;
   private banner_pub_id_ios: string;
   private interstatial_pub_id_ios: string;
   private setPyth : boolean;*/
   public appPurchased:boolean;
   public free_tries: number;
   public max_tries: number;
   private showBuyButton : boolean;

  constructor(public navCtrl: NavController, private platform: Platform,private navParams: NavParams,
              private formBuilder: FormBuilder,public alertCtrl: AlertController,
              public userData: UserData,public loadingCtrl: LoadingController,public adInfo:AdInfo) {
      
      console.log("Input  page entered:-->");
      console.log("navigation views count  at input page is "+this.navCtrl.length());
      this.userData.hasPurchased().then((value) =>{
            this.appPurchased = value;
            if(this.appPurchased){
                this.adInfo.hideBanner();
            }else{
                this.adInfo.showBanner();
            }
      });
      this.max_tries = this.userData.TRIAL_ALLOWED;
      //this.userData.setFreeCounter(0);
      this.userData.getCount().then((value) =>{
            console.log("Value in cosntr ----> "+value);
            this.free_tries = value;
            if (value >= this.userData.TRIAL_ALLOWED && !this.appPurchased) {
                this.showBuyButton = true;
            }else {
                this.showBuyButton = false;
            }
      });
      

      //this.userData.setFreeCounter(0);
      //this.setPyth = false;
      //webtalk445 account details for admob Android
      /*this.banner_pub_id_android = 'ca-app-pub-1542644798135048/9464427615';
      this.interstatial_pub_id_android = 'ca-app-pub-1542644798135048/9464427615'*/
       //Tureya admob details - Android
    //   this.banner_pub_id_android = 'ca-app-pub-4088114868017530/8693649605';
    //   this.interstatial_pub_id_android = 'ca-app-pub-4088114868017530/8693649605';


       //webtalk445 account details for admob ios
      /* this.banner_pub_id_ios =  'ca-app-pub-1542644798135048/3573854418';
      this.interstatial_pub_id_ios = 'ca-app-pub-1542644798135048/3573854418';*/

      //Tureya admob details - ios
    //   this.banner_pub_id_ios =  'ca-app-pub-4088114868017530/3966390005';
    //   this.interstatial_pub_id_ios = 'ca-app-pub-4088114868017530/3966390005';
      
        //To be uncommented for Final release
       /* if(/(android)/i.test(navigator.userAgent)) {
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
                    //console.log("Admob exists and running, banne ad id"+this.admobId.banner)
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
        */
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
  ionViewDidEnter(){
    this.userData.getCount().then((value) =>{
        console.log("Value in  ionViewDidEnter loaded ----> "+value);
        this.free_tries = value;
        if (value >= this.userData.TRIAL_ALLOWED && !this.appPurchased) {
            this.showBuyButton = true;
        }else {
            this.showBuyButton = false;
        }
    });
    this.userData.hasPurchased().then((value) =>{
            this.appPurchased = value;
            if(this.appPurchased){
                this.adInfo.hideBanner();
            }else{
                this.adInfo.showBanner();
            }
      }); 
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
     // console.log("Value passed is"+value)
      value = Math.floor(value);
      while (value > 0 ) {
        sum += value % 10;
       // console.log("sum is "+sum);
        value = Math.floor(value / 10);
       // console.log("within while value is - "+value)
      }
     // console.log("Sum of a integer within number is :: "+sum);
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
            //console.log("fName entry value is "+this.chaldeanValues[entry]);
            nameSum += this.chaldeanValues[entry];
        }
      }else if (this.person.numrlgyMethod == 'P'){
        for (let entry of name) {
            //console.log("fName entry value  as per Pyth is "+this.pythValues[entry]);
            nameSum += this.pythValues[entry];
        }

      }
      //console.log("Total Sum for given name -->"+name+" is--> "+this.person.nameSum);
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
        //  console.log("Fname is "+this.person.fName);
        //  console.log("Fname is trime "+this.person.fName.replace(/\s+/g, ''));
         this.person.fNameValue = this.calculateSum(this.person.fName.replace(/\s+/g, '').toUpperCase().trim(),1);
         this.person.totalSum += this.person.fNameValue;
        //  console.log("Total Sum after fName is::"+this.person.totalSum);
         if(this.person.fNameValue >= 10 ){
            this.person.fNameValue = this.addTotal(this.person.fNameValue);
        }
     }
     if ( (this.person.mName).length){
         this.person.mNameValue =  this.calculateSum(this.person.mName.replace(/\s+/g, '').toUpperCase().trim(),2);
         this.person.totalSum += this.person.mNameValue;
        //  console.log("Total Sum after mName is::"+this.person.totalSum);
         if(this.person.mNameValue >= 10 ){
            this.person.mNameValue = this.addTotal(this.person.mNameValue);
         }
     }
     if ( (this.person.lName).length){
         this.person.lNameValue = this.calculateSum(this.person.lName.replace(/\s+/g, '').toUpperCase().trim(),3);
         this.person.totalSum += this.person.lNameValue;
        //  console.log("Total Sum after lName is::"+this.person.totalSum);
         if(this.person.lNameValue >= 10 ){
            
            this.person.lNameValue = this.addTotal(this.person.lNameValue);
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
      this.person.totalValueSum = this.addTotal(totalValue);
      if(!this.appPurchased){
            this.userData.getCount().then((value) =>{
                console.log("value from getter is =>"+value+"free trial count is--> "+this.free_tries)
                this.userData.setFreeCounter(value+1);
            });
      }
      
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
  
   pythBtnClicked2() : Promise <any>{
       return new Promise((res,rej)=>{
          res('P');
          rej('C')
       });
   };

   /**
    * Called when pyth Button is clicked
    * Check if product is already purchased using restoreProducts()
    * If bought then enable the flag
    * else buy the product 


    */
   pythBtnClicked1(): Promise <any> {
       return new Promise((res,rej)=>{
            var pythButtonValue = 'C';
            //var that = this;
            this.platform.ready().then(() => {
                    /*InAppPurchase.getProducts(['com.tureya.numerology.adfree1'])
                    .then(function (products) {
                            console.log('Products are '+JSON.stringify(products));
                            console.log(' method is '+that.person.numrlgyMethod);
                    })
                    .catch(function (err) {
                        console.log('Error in InAppPurchase getting products---> '+JSON.stringify(err));
                        console.log(' method-error is '+that.person.numrlgyMethod);
                    });*/
                    InAppPurchase.restorePurchases()
                        .then((restoreData)=>{
                            console.log("Product ID captured from restorePurchases is "+restoreData[0].productId);
                            if (!(restoreData[0].productId === "com.tureya.numerology.adfree")) {
                                console.log(" Product not bought,buy the ad free product from app store");

                                InAppPurchase.buy('com.tureya.numerology.adfree1')
                                    .then( (buyData) => {
                                        console.log('Data from apple app store is '+JSON.stringify(buyData));
                                        console.log(' method buy  '+this.person.numrlgyMethod);
                                        this.person.numrlgyMethod = 'P';
                                        res(this.person.numrlgyMethod);
                                    })
                                    .catch( (err) => {
                                        console.log(' method buy error  '+this.person.numrlgyMethod);   
                                        //this.person.numrlgyMethod = 'C';
                                        res(this.person.numrlgyMethod);
                                    });
                            }else {
                                this.person.numrlgyMethod = 'P';
                                res(this.person.numrlgyMethod);
                                console.log(" Item already bought, pyth value set to => "+this.person.numrlgyMethod);
                            }
                        })
                        .catch((err) => {
                                console.log(" Error in restoring purchases => ");
                        });


                    
                    /*InAppPurchase.getProducts(['com.tureya.numerology.adfree1']).then((products)=>{
                         console.log('Products are '+JSON.stringify(products));
                          console.log('Products are 1'+this.person.numrlgyMethod);
                    }).catch((err)=>{
                         console.log('Error in InAppPurchase getting products---> '+JSON.stringify(err));
                    });*/
                    
                    /*InAppPurchase.restorePurchases()
                        .then((restoreData)=>{
                            console.log("Product ID captured from restorePurchases is "+restoreData[0].productId);
                            if (!(restoreData[0].productId === "com.tureya.numerology.adfree")) {
                                console.log(" Product not bought,buy the ad free product from app store");
                            }else {
                                this.person.numrlgyMethod = 'P';
                                console.log(" Item already bought, pyth value set to => "+this.person.numrlgyMethod);
                            }
                        })
                        .catch((err) => {

                        });*/

                    //InAppPurchase.getProduct
                    /*InAppPurchase.getProducts(['com.tureya.numerology.adfree'])
                    .then(function (products) {
                            console.log('Products are '+JSON.stringify(products));
                    })
                    .catch(function (err) {
                        console.log('Error in InAppPurchase getting products---> '+JSON.stringify(err));
                    });*/


                    //console.log("get products is done ");
                    /*InAppPurchase.restorePurchases().then(function(restoreData){
                        console.log("Data captured from restorePurchases is "+JSON.stringify(restoreData));
                        console.log("Product ID captured from restorePurchases is "+restoreData[0].productId);
                        console.log("pyth button value is "+pythButtonValue);

                        //if (!(restoreData[0].productId === "com.tureya.numerology.adfree")) {
                            console.log(" Buy the ad free product from app store");
                            
                            // Buy the product from App Store
                            
                            InAppPurchase.buy('com.tureya.numerology.adfree').then(function (buyData) {
                                console.log('Data from apple app store is '+JSON.stringify(buyData));
                                //this.person.numrlgyMethod = 'P';
                                pythButtonValue = 'P';
                                res('P');
                                console.log("pyth as-->"+pythButtonValue);
                                if(AdMob)  {
                                    AdMob.hideBanner();
                                    console.log('Admob is disabled , all banners hidden');
                                }
                                
                            })
                            .catch(function (err) {
                                //this.person.numrlgyMethod = 'C';
                                pythButtonValue = 'C';
                                rej('C');
                                console.log("pyth within error buy as-->"+pythButtonValue);
                                console.log("Error in buy InAppPurchase"+JSON.stringify(err));
                                if(err.errorCode){
                                    console.log("Error code is "+err.errorCode);
                                    let alert = this.alertCtrl.create({
                                        title: 'Error!',
                                        subTitle: 'Something went wrong!!!',
                                        buttons: ['OK']
                                        });
                                    alert.present();
                                }
                                
                            });
                        /*}else {
                            //console.log("product already purchased ::"+this.setPyth);
                            //this.person.numrlgyMethod = 'P';
                            pythButtonValue = 'P';
                            res('P');
                            console.log("pyth in else is -->"+pythButtonValue);
                            return pythButtonValue;
                        }
                    });*/

            });
    
        });
       
        //    var products = InAppPurchase.getProducts(['com.tureya.numerology.adfree']);
        //   console.log('products are '+JSON.stringify(products));
        
        /**/
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
  pythBtnClicked3(){
      //console.log("Pyth Button Clicked");
      console.log("Pyth Button Clicked and before value is "+this.person.numrlgyMethod);
      this.pythBtnClicked1().then((data) =>{
          this.person.numrlgyMethod = data;
          console.log('data in pyth1 JSON is '+JSON.stringify(data));
          
      }).catch(function (err) {
          this.person.numrlgyMethod = err;
        console.log("Error in pyth1"+JSON.stringify(err));
      });

      
        console.log("Pyth Button Clicked and after value is "+this.person.numrlgyMethod);
  }
  pythBtnClicked(){
     // Not Purchased
      if (this.appPurchased){
          console.log('Product purchased already '+this.appPurchased);
          this.person.numrlgyMethod = 'P';
      }else{

        let confirm = this.alertCtrl.create({
            title: 'Full Version',
            message: 'Please download this feature to access application adfree and unlimited calculations using both technique',
            buttons: [
                {
                text: 'Disagree',
                handler: () => {
                    console.log('Disagree clicked');
                    this.person.numrlgyMethod = 'C';
                    }
                },
                {
                text: 'Agree',
                handler: () => {
                    console.log('Agree clicked');
                    InAppPurchase.getProducts(['com.tureya.numerology.adfree','com.tureya.numerology.adfreeone'])
                        .then(function (products) {
                                console.log('Products are '+JSON.stringify(products));
                        })
                        .catch(function (err) {
                            console.log('Error in InAppPurchase getting products---> '+JSON.stringify(err));
                        });

                    InAppPurchase.restorePurchases()
                        .then((restoreData)=>{
                            
                            console.log("Product ID captured from restorePurchases is "+restoreData[0].productId);
                            if (!(restoreData[0].productId === "com.tureya.numerology.adfree")) {
                                console.log(" Product not bought,buy the ad free product from app store");
                                                
                                InAppPurchase.buy('com.tureya.numerology.adfree')
                                    .then( (buyData) => {
                                        console.log('Data from apple app store is '+JSON.stringify(buyData));
                                        this.person.numrlgyMethod = 'P';
                                        this.userData.setPurchased();
                                        this.appPurchased = true;
                                        this.showBuyButton = false;
                                        let alert = this.alertCtrl.create({
                                                    title: 'Pythagorean feature unlocked!',
                                                    subTitle: 'Congratulations!!!',
                                                    buttons: ['OK']
                                                    });
                                        alert.present();
                                    })
                                    .catch( (err) => {
                                        console.log(' method buy error  '+JSON.stringify(err));   
                                        this.person.numrlgyMethod = 'C';
                                        let alert = this.alertCtrl.create({
                                                    title: 'Error!',
                                                    subTitle: err.errorMessage,
                                                    buttons: ['OK']
                                                    });
                                        alert.present();
                                        });
                            }else {
                                this.person.numrlgyMethod = 'P';
                                this.userData.setPurchased();
                                this.appPurchased = true;
                                this.showBuyButton = false;
                                //res(this.person.numrlgyMethod);
                                console.log(" Item already bought, pyth value set to => "+this.person.numrlgyMethod);
                            }
                        })
                        .catch((err) => {
                                console.log(" Error in restoring purchases => "+JSON.stringify(err));
                        });
                }
                }
            ]
            });
            confirm.present();   
      }
  }
  
}