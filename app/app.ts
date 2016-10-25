import { Component } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from './pages/home/home';
// import {InputPage} from './pages/input/input';
// import {ResultPage} from './pages/result/result';
import {  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Injectable} from "@angular/core";

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [Storage]
})
export class MyApp {
  rootPage: any = HomePage;
  //rootPage: any = InputPage;

  constructor(public platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp,null,{
  backButtonText: 'Back'
});

/*
@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicModule.forRoot(HomePage,{
      backButtonText: 'Go Back2',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage
  ],
  providers: []
})
export class AppModule {}*/