import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Injectable, ChangeDetectorRef } from '@angular/core';

declare var CCCometChat : any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  licenseKey: string = "COMETCHAT-XXXXX-XXXXX-XXXXX-XXXXX"; // Replace the value with your CometChat License Key;
  apiKey: string = "xxxxxxxxxxxxxxxxxxxxxx"; // Replace the value with your CometChat Api Key;
  UID1: string = "SUPERHERO1";
  UID2: string = "SUPERHERO2";

  isLoading: boolean = false;
  disableInitialize: boolean = false;
  disableSuperHero1: boolean = true;
  disableSuperHero2: boolean = true;
  disableLaunch: boolean = true;
  constructor(private ref: ChangeDetectorRef) {

  }

  initializeChat() {
    var __this = this;
    this.showLoader();
    this.disableInitialize = true;
    CCCometChat.initializeCometChat("", this.licenseKey, this.apiKey, true,  response => {
      alert("Inside Success Callback " + response);
      __this.disableLogins(false);
      __this.showLoader(false);
      __this.ref.detectChanges();
    }, error => {
      alert("Fail Callback " + error);
      this.disableInitialize = false;
      this.showLoader(false);
    });
  }

  login(UID) {
    var __this = this;
    this.showLoader(false);
    this.disableLogins();
    CCCometChat.loginWithUID(UID, function success(response) {
      alert("Logged in as : " + UID + " Response : " + response);
      __this.disableLaunch = false;
      __this.showLoader(false);
    }, function failure(error) {
      alert("Login failure Callback " + error);
      __this.disableLogins(false);
      __this.showLoader(false);
    });
  }

  launchChat() {
    var __this = this;
    var isFullScreen = true;
    this.showLoader(true);
    CCCometChat.launchCometChat(isFullScreen, function success(data) {
      alert(" success " + data);
      __this.showLoader(false);

    }, function error(data) {
      alert(" fail " + data);
      __this.showLoader(false);
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
