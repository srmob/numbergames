import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
    return [[NavController]];
  }

  constructor(public navCtrl: NavController) {
    this.navCtrl = navCtrl;
    console.log("Numbers Info page entered");
  }
  
}
