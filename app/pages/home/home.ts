import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {InputPage} from '../input/input';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {
      console.log("Home page entered");
  }
  goToInputPage(event) {
    console.log("Get started clicked")
     this.navCtrl.push(InputPage);
  }
}
