import { Component } from '@angular/core';
import { NavController,ViewController} from 'ionic-angular';

/*
  Generated class for the PythagoreaninfoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/pythinfo/pythinfo.html',
})
export class PythinfoPage {
  private pythValues;
  static get parameters() {
    return [[NavController],[ViewController]];
  }

  constructor(public navCtrl: NavController,public viewCtrl: ViewController) {
    this.navCtrl = navCtrl;
    console.log("Pyth Numbers Info page entered");

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
