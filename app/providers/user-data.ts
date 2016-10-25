import { Injectable } from '@angular/core';
//import { NativeStorage } from 'ionic-native';
import {Storage} from '@ionic/storage';
@Injectable()
export class UserData {
    HAS_PURCHASED = "hasPurchased";
    TRIAL_COUNTER = "trial_counter";
    TRIAL_ALLOWED = 5;

    constructor( public storage: Storage) {}

    

    setPurchased() {
    /* NativeStorage.setItem(this.HAS_PURCHASED, true)
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );*/
        console.log("!!!Purchase done, set to true!!!");
        this.storage.set('hasPurchased',true);
    }

    hasPurchased(){
      /* NativeStorage.getItem(this.HAS_PURCHASED)
          .then(
            data => console.log(data),
            error => console.error(error)
          );*/
          console.log("has purchased called");
          return this.storage.get('hasPurchased').then((value)=> {
              console.log("value of purchased"+value);
              return value
            });
    }

    setName(name){
        this.storage.set(name,'nasd');
    } 

    getName(name){
      console.log("name passed is "+name);
        return this.storage.get(name).then((value)=> {return value});
    }
    setFreeCounter(value){
         console.log("Counter value increased to:-> "+value);
         this.storage.set(this.TRIAL_COUNTER,value);
    }
    getCount(){
        return this.storage.get(this.TRIAL_COUNTER).then((value)=> {
          if (value === null) {
            this.setFreeCounter(0);
          }
          return value});
    }

}
