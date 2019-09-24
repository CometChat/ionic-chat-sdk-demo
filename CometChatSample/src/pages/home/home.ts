import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FCM } from '@ionic-native/fcm';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

declare var CCCometChat: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  licenseKey: string = "COMETCHAT-XXXXX-XXXXX-XXXXX-XXXXX"; // Replace the value with your CometChat License Key;
  apiKey: string = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // Replace the value with your CometChat Api Key;
  UID1: string = "SUPERHERO1";
  UID2: string = "SUPERHERO2";

  isLoading: boolean = false;
  disableInitialize: boolean = false;
  disableSuperHero1: boolean = true;
  disableSuperHero2: boolean = true;
  disableLaunch: boolean = true;
  constructor(private ref: ChangeDetectorRef, public statusBar: StatusBar, public splashScreen: SplashScreen, public fcm: FCM) {

  }

  initializeChat() {
    this.showLoader();
    this.disableInitialize = true;

    CCCometChat.initializeCometChat("", this.licenseKey, this.apiKey, true, response => {
      alert("Inside Success Callback " + response);
      this.disableLogins(false);
      this.showLoader(false);
      this.ref.detectChanges();
    }, error => {
      alert("Fail Callback " + error);
      this.disableInitialize = false;
      this.showLoader(false);
    });
  }

  login(UID) {
    this.showLoader(false);
    this.disableLogins();
    CCCometChat.loginWithUID(UID, response => {
      alert("Logged in as : " + UID + " Response : " + response);
      this.disableLaunch = false;
      this.initChatServices();
      this.showLoader(false);
    }, error => {
      alert("Login failure Callback " + error);
      this.disableLogins(false);
      this.showLoader(false);
    });
  }

  initChatServices() {
    CCCometChat.initCometChatServices(function success(response) {
        alert("init chat services success : " + response);
        console.log("init chat services success : " + response);
      }, function failure(error) {
        alert("init chat services failure : " + error);
        console.log("init chat services failure : " + error);
    });
}

  launchChat() {
    var isFullScreen = true;
    this.showLoader(true);
    alert("Launching CometChat");
    CCCometChat.launchCometChat(isFullScreen, data => {

      CCCometChat.getPlatform(currentplatform => {

        if (currentplatform.platform == "Android") {
          data = JSON.parse(data);
          if (data.hasOwnProperty('userInfoCallback')) {

            this.fcm.subscribeToTopic(data.userInfoCallback.push_channel);
            this.fcm.onNotification().subscribe(data => {
              if (data.wasTapped) {
                console.log("Received in background" + JSON.stringify(data));

              } else {
                console.log("Received in foreground" + JSON.stringify(data));
              };

            });
          } else if (data.hasOwnProperty('chatroomInfoCallback')) {

            if (data.chatroomInfoCallback.hasOwnProperty('action') && data.chatroomInfoCallback.action != "" && data.chatroomInfoCallback.action == "join") {
              this.fcm.subscribeToTopic(data.chatroomInfoCallback.push_channel);
              this.fcm.onNotification().subscribe(data => {
                if (data.wasTapped) {
                  console.log("Received in background" + JSON.stringify(data));

                } else {
                  console.log("Received in foreground" + JSON.stringify(data));
                };

              });
            }

          }

        } else {

          data = JSON.stringify(data);
          data = JSON.parse(data);
          if (data.hasOwnProperty('userInfoCallback')) {
            this.fcm.subscribeToTopic(data.userInfoCallback.push_channel);
            this.fcm.onNotification().subscribe(data => {
              if (data.wasTapped) {
                console.log("Received in background" + JSON.stringify(data));

              } else {
                console.log("Received in foreground" + JSON.stringify(data));
              };

            });
          } else if (data.hasOwnProperty('chatroomInfoCallback')) {

            if (data.chatroomInfoCallback.hasOwnProperty('action') && data.chatroomInfoCallback.action != "" && data.chatroomInfoCallback.action == "join") {
              this.fcm.subscribeToTopic(data.chatroomInfoCallback.push_channel);
              this.fcm.onNotification().subscribe(data => {
                if (data.wasTapped) {
                  console.log("Received in background" + JSON.stringify(data));

                } else {
                  console.log("Received in foreground" + JSON.stringify(data));
                };

              });
            }

          }


        }

      });


      this.showLoader(false);

    }, data => {
      alert(" fail " + data);
      this.showLoader(false);
    });
  }

  showLoader(show: boolean = true) {
    this.isLoading = show;
    this.ref.detectChanges();
  }

  disableLogins(disable: boolean = true) {
    this.disableSuperHero1 = disable;
    this.disableSuperHero2 = disable;
    this.ref.detectChanges();
  }
}
