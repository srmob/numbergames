import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/numbersInfo/numbersInfo.html',
  styleUrls:['/numbersInfo/numbersInfo.scss']
})
export class NumbersInfoPage {
  constructor(public navCtrl: NavController) {
      console.log("Numbers Info page entered");
  }
}
