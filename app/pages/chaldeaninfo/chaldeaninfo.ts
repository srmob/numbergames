import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';

/*
  Generated class for the ChaldeaninfoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/chaldeaninfo/chaldeaninfo.html',
})
export class ChaldeaninfoPage {
  static get parameters() {
    return [[NavController],[ViewController]];
  }

  constructor(public navCtrl: NavController,public viewCtrl: ViewController) {
    this.navCtrl = navCtrl;
    console.log("Numbers Info page entered");
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
