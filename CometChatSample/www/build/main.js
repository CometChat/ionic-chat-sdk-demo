webpackJsonp([0],{

/***/ 111:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 153:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 153;

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_fcm__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(ref, statusBar, splashScreen, fcm) {
        this.ref = ref;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.fcm = fcm;
        this.licenseKey = "COMETCHAT-XXXXX-XXXXX-XXXXX-XXXXX"; // Replace the value with your CometChat License Key;
        this.apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // Replace the value with your CometChat Api Key;
        this.UID1 = "SUPERHERO1";
        this.UID2 = "SUPERHERO2";
        this.isLoading = false;
        this.disableInitialize = false;
        this.disableSuperHero1 = true;
        this.disableSuperHero2 = true;
        this.disableLaunch = true;
    }
    HomePage.prototype.initializeChat = function () {
        var _this = this;
        this.showLoader();
        this.disableInitialize = true;
        CCCometChat.initializeCometChat("", this.licenseKey, this.apiKey, true, function (response) {
            alert("Inside Success Callback " + response);
            _this.disableLogins(false);
            _this.showLoader(false);
            _this.ref.detectChanges();
        }, function (error) {
            alert("Fail Callback " + error);
            _this.disableInitialize = false;
            _this.showLoader(false);
        });
    };
    HomePage.prototype.login = function (UID) {
        var _this = this;
        this.showLoader(false);
        this.disableLogins();
        CCCometChat.loginWithUID(UID, function (response) {
            alert("Logged in as : " + UID + " Response : " + response);
            _this.disableLaunch = false;
            _this.showLoader(false);
        }, function (error) {
            alert("Login failure Callback " + error);
            _this.disableLogins(false);
            _this.showLoader(false);
        });
    };
    HomePage.prototype.launchChat = function () {
        var _this = this;
        var isFullScreen = true;
        this.showLoader(true);
        alert("Launching CometChat");
        CCCometChat.launchCometChat(isFullScreen, function (data) {
            CCCometChat.getPlatform(function (currentplatform) {
                if (currentplatform.platform == "Android") {
                    data = JSON.parse(data);
                    if (data.hasOwnProperty('userInfoCallback')) {
                        _this.fcm.subscribeToTopic(data.userInfoCallback.push_channel);
                        _this.fcm.onNotification().subscribe(function (data) {
                            if (data.wasTapped) {
                                console.log("Received in background" + JSON.stringify(data));
                            }
                            else {
                                console.log("Received in foreground" + JSON.stringify(data));
                            }
                            ;
                        });
                    }
                    else if (data.hasOwnProperty('chatroomInfoCallback')) {
                        if (data.chatroomInfoCallback.hasOwnProperty('action') && data.chatroomInfoCallback.action != "" && data.chatroomInfoCallback.action == "join") {
                            _this.fcm.subscribeToTopic(data.chatroomInfoCallback.push_channel);
                            _this.fcm.onNotification().subscribe(function (data) {
                                if (data.wasTapped) {
                                    console.log("Received in background" + JSON.stringify(data));
                                }
                                else {
                                    console.log("Received in foreground" + JSON.stringify(data));
                                }
                                ;
                            });
                        }
                    }
                }
                else {
                    data = JSON.stringify(data);
                    data = JSON.parse(data);
                    if (data.hasOwnProperty('userInfoCallback')) {
                        _this.fcm.subscribeToTopic(data.userInfoCallback.push_channel);
                        _this.fcm.onNotification().subscribe(function (data) {
                            if (data.wasTapped) {
                                console.log("Received in background" + JSON.stringify(data));
                            }
                            else {
                                console.log("Received in foreground" + JSON.stringify(data));
                            }
                            ;
                        });
                    }
                    else if (data.hasOwnProperty('chatroomInfoCallback')) {
                        if (data.chatroomInfoCallback.hasOwnProperty('action') && data.chatroomInfoCallback.action != "" && data.chatroomInfoCallback.action == "join") {
                            _this.fcm.subscribeToTopic(data.chatroomInfoCallback.push_channel);
                            _this.fcm.onNotification().subscribe(function (data) {
                                if (data.wasTapped) {
                                    console.log("Received in background" + JSON.stringify(data));
                                }
                                else {
                                    console.log("Received in foreground" + JSON.stringify(data));
                                }
                                ;
                            });
                        }
                    }
                }
            });
            _this.showLoader(false);
        }, function (data) {
            alert(" fail " + data);
            _this.showLoader(false);
        });
    };
    HomePage.prototype.showLoader = function (show) {
        if (show === void 0) { show = true; }
        this.isLoading = show;
        this.ref.detectChanges();
    };
    HomePage.prototype.disableLogins = function (disable) {
        if (disable === void 0) { disable = true; }
        this.disableSuperHero1 = disable;
        this.disableSuperHero2 = disable;
        this.ref.detectChanges();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Applications/MAMP/htdocs/ionic-chat-sdk-demo/CometChatSample/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      CometChat Ionic Sample App\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="cometchat_logodiv">\n    <ion-avatar class="cometchat_logo" width="150" height="150">\n      <ion-img width="150" height="150" src="assets/imgs/logo.png"></ion-img>\n    </ion-avatar>\n    <div class="loader" *ngIf="isLoading">\n    </div>\n  </div>\n  <ion-list>\n    <ion-row>\n      <button ion-button color="primary" block [disabled]="disableInitialize" (click)="initializeChat()">Initialize CometChat</button>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <button ion-button color="primary" block [disabled]="disableSuperHero1" (click)="login(UID1)">Login As\n          <br/> SuperHero1</button>\n      </ion-col>\n      <ion-col>\n        <button ion-button color="primary" block [disabled]="disableSuperHero2" (click)="login(UID2)">Login As\n          <br/>SuperHero2</button>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <button ion-button color="primary" block [disabled]="disableLaunch" (click)="launchChat()">Launch CometChat</button>\n    </ion-row>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Applications/MAMP/htdocs/ionic-chat-sdk-demo/CometChatSample/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_fcm__["a" /* FCM */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(218);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_fcm__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_fcm__["a" /* FCM */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_fcm__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, fcm) {
        var _this = this;
        this.fcm = fcm;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //get token 
            _this.fcm.getToken().then(function (token) {
                console.log("Token is " + token);
                CCCometChat.printValue("Token is " + token);
            });
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Applications/MAMP/htdocs/ionic-chat-sdk-demo/CometChatSample/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Applications/MAMP/htdocs/ionic-chat-sdk-demo/CometChatSample/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_fcm__["a" /* FCM */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[195]);
//# sourceMappingURL=main.js.map