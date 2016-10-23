import { Component } from '@angular/core';
import { NavController,NavParams,ModalController,ViewController} from 'ionic-angular';
import {ChaldeaninfoPage} from '../chaldeaninfo/chaldeaninfo';
import {PythinfoPage} from '../pythinfo/pythinfo';


@Component({
  templateUrl: 'build/pages/result/result.html'
  //styles: ['ion-label { border-color: black; border-width: 1px !important;border-style: solid; }']
})
export class ResultPage {

  /*public firstName: "" ;
  public fNameValue;
  public middleName : "";
  public mNameValue;
  public lastName : "";
  public lNameValue;
  private totalSummedValue : number ;*/
  public user;
  public fNameText;
  public lNameText;
  public mNameText;
  public totalText;
  public numerologyMethod;
  public numerologyDesc;

  constructor(public navCtrl: NavController,private navParams: NavParams,public modalCtrl: ModalController,private view:ViewController) {
      
      
      this.user = navParams.get('user');
      //console.log("Result page entered, Nav back view is"+JSON.stringify(this.navCtrl.getPrevious(view)));
      console.log("Result page entered, Nav back view is"+this.navCtrl.getPrevious(view));
      console.log("navigation views count  at result page is "+this.navCtrl.length());

      /*this.firstName = this.user.fName;
      this.fNameValue = this.user.fNameValue;
      this.middleName = this.user.mName;
      this.mNameValue = this.user.mNameValue;
      this.lastName = this.user.lName;
      this.lNameValue = this.user.lNameValue;
      this.totalSummedValue = this.user.totalValueSum;*/
      
      //console.log("Summed value from input page is"+this.totalSummedValue);
      //this.lastName = navParams.get('lName');

      this.numerologyDesc = {
        "1" : "1-Initiator action, pioneering, leading, independent, attaining, individualistic",
        "2" : "2-Cooperation, adaptability, consideration of others, partnering, mediating",
        "3" : "3-Expression, verbalization, socialization, the arts, the joy of living",
        "4" : "4-Values foundation, order, service, struggle against limits, steady growth",
        "5" : "5-Expansiveness, visionary, adventure, the constructive use of freedom",
        "6" : "6-Responsibility, protection, nurturing, community, balance, sympathy",
        "7" : "7-Analysis, understanding, knowledge, awareness, studious, meditating",
        "8" : "8-Practical endeavors, status oriented, power-seeking, high material goals",
        "9" : "9-Humanitarian, giving nature, selflessness, obligations, creative expression"
      }

      this.fNameText = this.numerologyDesc[this.user.fNameValue];
      this.mNameText = this.numerologyDesc[this.user.mNameValue];
      this.lNameText = this.numerologyDesc[this.user.lNameValue];
      this.totalText = this.numerologyDesc[this.user.totalValueSum];
      this.numerologyMethod = this.user.numrlgyMethod;
  }
  
  showNumberDetails(event) {
    console.log("show NumberDetails Button clicked")
     //this.navCtrl.push(NumbersInfoPage);
    //  if ( this.numerologyMethod == 'C') {
    //    //this.navCtrl.push(ChaldeaninfoPage);
    //    let modal = this.modalCtrl.create(ChaldeaninfoPage);
    //     modal.present();
    //  }else {
       //this.navCtrl.push(PythinfoPage);
       let modal = this.modalCtrl.create(PythinfoPage);
        modal.present();
     
     
  }
}
