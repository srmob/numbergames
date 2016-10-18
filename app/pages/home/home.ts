import { Component,Pipe, PipeTransform} from '@angular/core';
import { NavController,Platform,ModalController } from 'ionic-angular';
import { keyValueFilterPipe } from '../../pipes/pipes';
import { ChaldeaninfoPage } from '../chaldeaninfo/chaldeaninfo';


import {InputPage} from '../input/input';
declare var AdMob: any;



@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes:[keyValueFilterPipe]
})

export class HomePage {
  private admobId: any;
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
  constructor(public navCtrl: NavController,private platform: Platform,public modalCtrl: ModalController) {
      console.log("Home page entered");

        
      this.platform = platform;
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
  showModal() {
    let modal = this.modalCtrl.create(ChaldeaninfoPage);
    modal.present();
  }
   
    
}



