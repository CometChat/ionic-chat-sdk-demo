import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FCM } from '@ionic-native/fcm';

declare var CCCometChat: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public fcm: FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      //get token 
      this.fcm.getToken().then(token => {
        console.log("Token is " + token);
        CCCometChat.printValue("Token is " + token);

      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

