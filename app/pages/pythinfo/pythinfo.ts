import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
    return [[NavController]];
  }

  constructor(public navCtrl: NavController) {
    this.navCtrl = navCtrl;
    console.log("Pyth Numbers Info page entered");

  }
  
}
