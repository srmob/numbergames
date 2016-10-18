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
   public chaldeanValues;
   public pythValues;
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
        totalSum:'',
        numrlgyMethod:'C'
    }
    /*this.chaldeanValues = {
        "0" : 0, "1" : 1 , "2" : 2, "3" : 3 ,"4" : 4 , "5":5 ,"6":6 ,"7":7 , "8":8 ,"9":9,
        "a" : 1,"A" : 1,"b": 2 , "B": 2,"c": 3 , "C": 3,"d": 4,  "D": 4,
        "e": 5, "E": 5,"F": 8  , "f": 8, "g":3 , "G":3 ,"h":5,"H":5, 
        "i":1, "I":1,"j":1,"J":1,"k":2 , "K":2,"l":3,"L":3 , "m":4,"M":4 ,
        "n" :5 ,"N":5, "o" : 7, "O":7,"p": 8, "P": 8,"q": 1,"Q":1 ,
        "r":2 ,"R":2 ,"s": 3,"S": 3,"t": 4,"T":4 ,"u": 6,"U": 6,
        "v": 6,"V":6 ,"w":6 ,"W":6 , "x":5 ,"X": 5,"y": 1,"Y":1 ,"z": 7,"Z": 7
    }*/
    /*this.pythValues = {
        "0" : 0, "1" : 1 , "2" : 2, "3" : 3 ,"4" : 4 , "5":5 ,"6":6 ,"7":7 , "8":8 ,"9":9,
        "a" : 1,"A" : 1,"b": 2 , "B": 2,"c": 3 , "C": 3,"d": 4,  "D": 4,
        "e": 5, "E": 5,"F": 6  , "f": 6, "g":7, "G":7 ,"h":8,"H":8, 
        "i":9, "I":9,"j":1,"J":1,"k":2 , "K":2,"l":3,"L":3 , "m":4,"M":4 ,
        "n" :5 ,"N":5, "o" : 6, "O":6,"p": 7, "P": 7,"q": 8,"Q":8 ,
        "r":9 ,"R":9 ,"s": 1,"S": 1,"t": 2,"T":2 ,"u": 2,"U": 2,
        "v": 4,"V":4 ,"w":5 ,"W":5 , "x":6 ,"X": 6,"y": 7,"Y":7 ,"z": 8,"Z": 8
    }*/
    this.chaldeanValues = {
         "0" : 0, "1" : 1, "2" : 2, "3" : 3, "4" : 4, "5" : 5,
         "6" : 6, "7" : 7, "8" : 8, "9" : 9, "A" : 1, "B" : 2,
         "C" : 3, "D" : 4, "E" : 5, "F" : 8, "G" : 3, "H" : 5,
         "I" : 1, "J" : 1, "K" : 2, "L" : 3, "M" : 4, "N" : 5,
         "O" : 7, "P" : 8, "Q" : 1, "R" : 2, "S" : 3, "T" : 4,
         "U" : 6, "V" : 6, "W" : 6, "X" : 5, "Y" : 1, "Z" : 7
    }
    this.pythValues = {
         "0" : 0, "1" : 1, "2" : 2, "3" : 3, "4" : 4, "5" : 5,
         "6" : 6, "7" : 7, "8" : 8, "9" : 9, "A" : 1, "B" : 2,
         "C" : 3, "D" : 4, "E" : 5, "F" : 6, "G" : 7, "H" : 8,
         "I" : 9, "J" : 1, "K" : 2, "L" : 3, "M" : 4, "N" : 5,
         "O" : 6, "P" : 7, "Q" : 8, "R" : 9, "S" : 1, "T" : 2,
         "U" : 2, "V" : 4, "W" : 5, "X" : 6, "Y" : 7, "Z" : 8
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
  
  //[a-zA-Z 0-9]*
  ionViewLoaded() {
    this.userform = this.formBuilder.group({
      fName: ['', Validators.compose([Validators.minLength(0),Validators.pattern('^[A-Za-z0-9- ]+$')])],
      mName: ['', Validators.compose([Validators.minLength(0),Validators.pattern('^[A-Za-z0-9- ]+$')])],
      lName: ['', Validators.compose([Validators.minLength(0),Validators.pattern('^[A-Za-z0-9- ]+$')])],
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
      var nameSum = 0;
      if (this.person.numrlgyMethod == 'C') {
        for (let entry of name) {
            console.log("fName entry value is "+this.chaldeanValues[entry]);
            nameSum += this.chaldeanValues[entry];
        }
      }else if (this.person.numrlgyMethod == 'P'){
        for (let entry of name) {
            console.log("fName entry value  as per Pyth is "+this.pythValues[entry]);
            nameSum += this.pythValues[entry];
        }

      }
      console.log("Total Sum for given name -->"+name+" is--> "+this.person.nameSum);
      return nameSum;
        
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

    this.person.fName = this.userform.controls['fName'].value  ;
    this.person.mName = this.userform.controls['mName'].value   ;
    this.person.lName = this.userform.controls['lName'].value  ;
    
     if ( (this.person.fName).length){
         console.log("Fname is "+this.person.fName);
         console.log("Fname is trime "+this.person.fName.replace(/\s+/g, ''));
         this.person.fNameValue = this.calculateSum(this.person.fName.replace(/\s+/g, '').toUpperCase().trim(),1);
         this.person.totalSum += this.person.fNameValue;
         console.log("Total Sum after fName is::"+this.person.totalSum);
         if(this.person.fNameValue >= 10 ){
            this.person.fNameValue = this.addTotal(this.person.fNameValue);
        }
     }
     if ( (this.person.mName).length){
         this.person.mNameValue =  this.calculateSum(this.person.mName.replace(/\s+/g, '').toUpperCase().trim(),2);
         this.person.totalSum += this.person.mNameValue;
         console.log("Total Sum after mName is::"+this.person.totalSum);
         if(this.person.mNameValue >= 10 ){
            this.person.mNameValue = this.addTotal(this.person.mNameValue);
         }
     }
     if ( (this.person.lName).length){
         this.person.lNameValue = this.calculateSum(this.person.lName.replace(/\s+/g, '').toUpperCase().trim(),3);
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
     console.log("Method value is :: "+this.person.numrlgyMethod);
      this.navCtrl.push(ResultPage,{user: this.person});
  }
  clearInput (){
      this.userform = this.formBuilder.group({
        fName: ['', Validators.compose([Validators.minLength(0),Validators.pattern('^[A-Za-z0-9- ]+$')])],
        mName: ['', Validators.compose([Validators.minLength(0),Validators.pattern('[a-z A-Z 0-9]*')])],
        lName: ['', Validators.compose([Validators.minLength(0),Validators.pattern('[a-z A-Z 0-9]*')])],
        });
  }
  numrlgyBtnClicked() {
      this.paidAppBtn = true;
      //this.numrlgyMethod = !this.numrlgyMethod;
  }
  chalBtnClicked() {
      this.person.numrlgyMethod = 'C';
      //console.log("Numerology method is -> "+this.numrlgyMethod);
  }
  pythBtnClicked(){
      this.person.numrlgyMethod = 'P';
      //console.log("Numerology method PythBtn is -> "+this.numrlgyMethod)
  }

  
}