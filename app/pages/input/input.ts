import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';

import {ResultPage} from '../result/result';

import {Validators, FormBuilder } from '@angular/forms';

//import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: 'build/pages/input/input.html'
  
})
export class InputPage {

   public person;
   public values;
   private fValueSum = 0 ;
   private mValueSum = 0 ;
   private lValueSum = 0 ;
   private totalValueSum = 0;
   private totalSum = 0;
   private paidAppBtn: boolean = false; // For free app Chaldean is available else Pythagorean
   private numrlgyMethod: string = "C"; // For  Chaldean (C)  else {false} for Pythagorean
  // private userinputform;
  public userform;


  constructor(public navCtrl: NavController, private navParams: NavParams,private formBuilder: FormBuilder) {
      console.log("Input  page entered");
      this.person = {
        fName : '',
        fNameValue :'',
        mName : '',
        mNameValue :'',
        lName : '',
        lNameValue :'',
        totalValueSum: '',
        totalSum:''
    }
    this.values = {
        "0" : 0, "1" : 1 , "2" : 2, "3" : 3 ,"4" : 4 , "5":5 ,"6":6 ,"7":7 , "8":8 ,"9":9,
        "a" : 1,"A" : 1,"b": 2 , "B": 2,"c": 3 , "C": 3,"d": 4,  "D": 4,
        "e": 5, "E": 5,"F": 8  , "f": 8, "g":3 , "G":3 ,"h":5,"H":5, 
        "i":1, "I":1,"j":1,"J":1,"k":2 , "K":2,"l":3,"L":3 , "m":4,"M":4 ,
        "n" :5 ,"N":5, "o" : 7, "O":7,"p": 8, "P": 8,"q": 1,"Q":1 ,
        "r":2 ,"R":2 ,"s": 3,"S": 3,"t": 4,"T":4 ,"u": 6,"U": 6,
        "v": 6,"V":6 ,"w":6 ,"W":6 , "x":5 ,"X": 5,"y": 1,"Y":1 ,"z": 7,"Z": 7,
    }
    
    
  }
  /*ionViewLoaded() {
        this.userinputform = this.formBuilder.group({
            fName: ['', Validators.required],
            mName: ['' ],
            lName: ['' ],
        });
    }
  logForm(){
        console.log(this.userinputform.value)
  }*/
  ionViewLoaded() {
    this.userform = this.formBuilder.group({
      fName: ['', Validators.compose([Validators.minLength(0),Validators.pattern('[a-zA-Z 0-9]*')])],
      mName: ['', Validators.compose([Validators.minLength(0),Validators.pattern('[a-zA-Z 0-9]*')])],
      lName: ['', Validators.compose([Validators.minLength(0),Validators.pattern('[a-zA-Z 0-9]*')])],
    });
  }
  logForm(){
    console.log(this.userform.value)
    this.person.fName = this.userform.controls['fName'].value   ;
    this.person.mName = this.userform.controls['mName'].value   ;
    this.person.lName = this.userform.controls['lName'].value   ;
    console.log("this person is "+JSON.stringify(this.person));
  }
  addTotal(value){
      var sum = 0;
      console.log("Value passed is"+value)
      value = Math.floor(value);
      while (value > 0 ) {
        sum += value % 10;
        console.log("sum is "+sum);
        value = Math.floor(value / 10);
        console.log("within while value is - "+value)
      }
      console.log("Sum of a integer within number is :: "+sum);
      if( sum > 9 )
            return this.addTotal( sum );
      else
            return sum;
      
      //return sum;
  }
  calculateSum(name: string ,position:number) {
      //console.log("Name in calculate sum is "+name);
      for (let entry of name) {
            //console.log("fName entry value is "+this.values[entry]);
            if(position == 1 )
                this.person.fNameValue += this.values[entry];
            else if(position == 2 ) 
                this.person.mNameValue += this.values[entry];
            else if(position == 3 ) {
                this.person.lNameValue += this.values[entry];
            }
            else if(position == 0 ) {
                this.person.totalSum += this.values[entry];
            }
       
        }
        console.log("Total Sum is"+this.person.totalSum);
  }
  

  showResult() {
    this.person.fNameValue = 0 ;
    this.person.lNameValue = 0 ; 
    this.person.mNameValue = 0 ; 
    this.person.totalValueSum = 0
    this.person.totalSum = 0;
    /*console.log('Submitted value:::'+this.userinputform.value)
    //console.log('Submitted value: ', value);
    this.person.fName = this.userinputform.controls['fName'].value   ;
    this.person.mName = this.userinputform.controls['mName'].value   ;
    this.person.lName = this.userinputform.controls['lName'].value   ;
    console.log("Fname in showResult is->"+this.person.fName);*/

    //console.log("calculate clicked"+this.values["a"])

    this.person.fName = this.userform.controls['fName'].value   ;
    this.person.mName = this.userform.controls['mName'].value   ;
    this.person.lName = this.userform.controls['lName'].value   ;
    
     if ( (this.person.fName).length){
         this.calculateSum(this.person.fName.trim(),1);
         this.person.totalSum += this.person.fNameValue;
         console.log("Total Sum after fName is::"+this.person.totalSum);
         if(this.person.fNameValue >= 10 ){
            this.person.fNameValue = this.addTotal(this.person.fNameValue);
        }
     }
     if ( (this.person.mName).length){
         this.calculateSum(this.person.mName.trim(),2);
         this.person.totalSum += this.person.mNameValue;
         console.log("Total Sum after mName is::"+this.person.totalSum);
         if(this.person.mNameValue >= 10 ){
            this.person.mNameValue = this.addTotal(this.person.mNameValue);
         }
     }
     if ( (this.person.lName).length){
         this.calculateSum(this.person.lName.trim(),3);
         this.person.totalSum += this.person.lNameValue;
         console.log("Total Sum after lName is::"+this.person.totalSum);
         if(this.person.lNameValue >= 10 ){
             console.log("Last Name value before add is -"+this.person.lNameValue);
            this.person.lNameValue = this.addTotal(this.person.lNameValue);
            console.log("Last Name value after add is -"+this.person.lNameValue);
          }
     }
     /*if ( (this.person.fName).length || (this.person.mName).length || (this.person.lName).length ){
         this.calculateSum(this.person.fName+this.person.mName+this.person.lName,0);
     }*/
     
     //this.person.totalSum = this.person.fNameValue + this.person.mNameValue + this.person.lNameValue;
     
     
     
     //if(this.person.lNameValue >=10 ){
        //console.log("lName value is before:: "+this.person.lNameValue);
         //this.person.lNameValue = this.addTotal(this.person.lNameValue);
        // console.log("lName value is after:: "+this.person.lNameValue);
     //}
      let totalValue = this.person.fNameValue + this.person.mNameValue + this.person.lNameValue;
      this.person.totalValueSum = this.addTotal(totalValue)
    //  //this.person.totalSum = this.addTotal(this.addTotal(totalValue))
      this.navCtrl.push(ResultPage,{user: this.person});
  }
  clearInput (){
      this.userform = this.formBuilder.group({
        fName: ['', Validators.compose([Validators.minLength(0),Validators.pattern('[a-zA-Z 0-9]*')])],
        mName: ['', Validators.compose([Validators.minLength(0),Validators.pattern('[a-zA-Z 0-9]*')])],
        lName: ['', Validators.compose([Validators.minLength(0),Validators.pattern('[a-zA-Z 0-9]*')])],
        });
  }
  numrlgyBtnClicked() {
      this.paidAppBtn = true;
      //this.numrlgyMethod = !this.numrlgyMethod;
  }
  chalBtnClicked() {
      this.numrlgyMethod = 'C';
      //console.log("Numerology method is -> "+this.numrlgyMethod);
  }
  pythBtnClicked(){
      this.numrlgyMethod = 'P';
      //console.log("Numerology method PythBtn is -> "+this.numrlgyMethod)
  }

  
}