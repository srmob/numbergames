import { Component,Pipe, PipeTransform} from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { keyValueFilterPipe } from '../../pipes/pipes';


import {InputPage} from '../input/input';
declare var AdMob: any;



@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes:[keyValueFilterPipe]
})

export class HomePage {
  private admobId: any;
  private pythValues;
  /*createBanner() {
        this.platform.ready().then(() => {
            if(AdMob) {
                AdMob.createBanner({
                    adId: this.admobId.banner,
                    position:AdMob.AD_POSITION.BOTTOM_CENTER, 
                    autoShow:true
                });
            }
        });
    }
    showBanner(position) {
        this.platform.ready().then(() => {
            if(AdMob) {
                var positionMap = {
                    "bottom": AdMob.AD_POSITION.BOTTOM_CENTER,
                    "top": AdMob.AD_POSITION.TOP_CENTER
                };
                AdMob.showBanner(positionMap[position.toLowerCase()]);
            }
        });
    }*/
  constructor(public navCtrl: NavController,private platform: Platform) {
      console.log("Home page entered");

        
      this.platform = platform;
       this.pythValues = {
         "0" : 0, "1" : 1 , "2" : 2, "3" : 3 ,"4" : 4 , "5":5 ,"6":6 ,"7":7 , "8":8 ,"9":9,
         "A" : 1, "B": 2, "C": 3,  "D": 4,
         "E": 5,"F": 6 , "G":7 ,"H":8, 
          "I":9,"J":1, "K":2,"L":3 ,"M":4 ,
         "N":5,  "O":6, "P": 7,"Q":8 ,
         "R":9 ,"S": 1,"T":2 ,"U": 2,
         "V":4 ,"W":5 , "X": 6,"Y":7 ,"Z": 8
     }
    //this.pythValues = [{"0": 0}, {"1":1}, {"A" : 1}];
      /*if(/(android)/i.test(navigator.userAgent)) {
          this.admobId = {
              banner: 'ca-app-pub-1542644798135048/9464427615',
              interstitial: 'ca-app-pub-1542644798135048/9464427615'
          };
      }
      if(AdMob)  AdMob.createBanner( {
                 
                 adId:this.admobId.banner,
                 isTesting:true,//comment this out before publishing the app,
                 position:AdMob.AD_POSITION.BOTTOM_CENTER,
                 autoShow:true} );*/

  }
  
   /* hideBanner(position) {
        this.platform.ready().then(() => {
            if(AdMob) {
                AdMob.hideBanner();
            }
        });*/
   // }
  goToInputPage(event) {
    console.log("Get started clicked")
     this.navCtrl.push(InputPage);
  }
}



