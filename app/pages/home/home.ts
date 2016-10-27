import { Component} from '@angular/core';
import { NavController,Platform} from 'ionic-angular';

import {InputPage} from '../input/input';

import{AdInfo} from '../../providers/ad-info';
import{UserData} from '../../providers/user-data';
import {InAppPurchase} from 'ionic-native';


//declare var AdMob;


@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [AdInfo,UserData]
})


export class HomePage {
    
   /*private admobId: any;
   private banner_pub_id_android: string;
   private interstatial_pub_id_android: string;
   private banner_pub_id_ios: string;
   private interstatial_pub_id_ios: string;*/

  
   public appPurchased:boolean;
  
  constructor(public navCtrl: NavController,private platform: Platform,public adInfo: AdInfo,public userData: UserData ) {
      console.log("Home page entered");
      console.log("navigation views count  at home page is "+this.navCtrl.length());
        
      this.platform = platform;
      
      
      
      this.userData.hasPurchased().then((value) =>{
            this.appPurchased = value;
            if(this.appPurchased){
                this.adInfo.hideBanner();
            }else{
                this.adInfo.showBanner();
            }
      });
      
      //console.log(" Is purchased"+this.userData.setPurchased());
      
       //webtalk445 account details for admob Android
      /*this.banner_pub_id_android = 'ca-app-pub-1542644798135048/9464427615';
      this.interstatial_pub_id_android = 'ca-app-pub-1542644798135048/9464427615'*/
       //Tureya admob details - Android
      /*this.banner_pub_id_android = 'ca-app-pub-4088114868017530/8693649605';
      this.interstatial_pub_id_android = 'ca-app-pub-4088114868017530/8693649605';*/


       //webtalk445 account details for admob ios
      /* this.banner_pub_id_ios =  'ca-app-pub-1542644798135048/3573854418';
      this.interstatial_pub_id_ios = 'ca-app-pub-1542644798135048/3573854418';*/

      //Tureya admob details - ios
      /*this.banner_pub_id_ios =  'ca-app-pub-4088114868017530/3966390005';
      this.interstatial_pub_id_ios = 'ca-app-pub-4088114868017530/3966390005';*/
      
        //To be uncommented for Final release
        /*if(/(android)/i.test(navigator.userAgent)) {
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
                    
        });*/
        
  }
  goToInputPage(event) {
    console.log("Get started clicked")
     this.navCtrl.push(InputPage);
  }
  ionViewDidEnter(){
    this.userData.hasPurchased().then((value) =>{
            this.appPurchased = value;
            if(this.appPurchased){
                this.adInfo.hideBanner();
            }else{
                this.adInfo.showBanner();
            }
      });
  }
    
}



