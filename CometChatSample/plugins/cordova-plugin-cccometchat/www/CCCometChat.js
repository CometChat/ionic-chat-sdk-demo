var argscheck = require('cordova/argscheck');
var channel = require('cordova/channel');
var utils = require('cordova/utils');
var exec = require('cordova/exec');
var cordova = require('cordova');

function CCCometChat() {
    this.platform = null;
    var myinstance = this;
    channel.onCordovaReady.subscribe(function () {

        myinstance.getPlatform(function (info) {
                myinstance.platform = info.platform;
                channel.onCordovaInfoReady.fire();
            },
            function (e) {
                me.available = false;
                utils.alert('[ERROR] Error initializing Cordova: ' + e);
            });
    });

}

CCCometChat.prototype.getPlatform = function (successCallback, errorCallback) {
    var arr = [];
    argscheck.checkArgs('fF', 'CCCometChat.getPlatform', arguments);
    exec(successCallback, errorCallback, 'CCCometChat', 'getPlatform', []);
};

CCCometChat.prototype.getInstance = function (success, error) {
    exec(success, error, "CCCometChat", "getInstance");
}
CCCometChat.prototype.initializeCometChat = function (siteUrl, licenseKey, apiKey, isCod, success, error) {
    var arr = [];
    arr[0] = siteUrl;
    arr[1] = licenseKey;
    arr[2] = apiKey;
    arr[3] = convertBooleanToiOS(isCod);
    exec(success, error, "CCCometChat", "initializeCometChat", arr);
}
CCCometChat.prototype.login = function (userName, password, success, error) {
    var arr = [];
    arr[0] = userName;
    arr[1] = password;
    exec(success, error, "CCCometChat", "login", arr);
}
CCCometChat.prototype.logout = function (success, error) {
    exec(success, error, "CCCometChat", "logout");
}

CCCometChat.prototype.launchCometChat = function (isFullScreen, success, error) {
    var arr = [];
    arr[0] = convertBooleanToiOS(isFullScreen);
    exec(success, error, "CCCometChat", "launchCometChat", arr);
}
CCCometChat.prototype.launchCometChatWithID = function (isFullScreen, userid, isGroup, setBackButton, success, error) {
    var arr = [];
    arr[0] = convertBooleanToiOS(isFullScreen);
    arr[1] = userid;
    arr[2] = convertBooleanToiOS(isGroup);
    arr[3] = convertBooleanToiOS(setBackButton);
    exec(success, error, "CCCometChat", "launchCometChatWithID", arr);
}
CCCometChat.prototype.getAllPushChannels = function (userid, success, error) {
    var arr = [];
    arr[0] = userid;
    exec(success, error, "CCCometChat", "getAllPushChannels", arr);
}
CCCometChat.prototype.loginWithUID = function (uid, success, error) {
    var arr = [];
    arr[0] = uid;
    exec(success, error, "CCCometChat", "loginWithUID", arr);
}

CCCometChat.prototype.createUser = function (UID, userName, avatarUrl, profileUrl, role, success, error) {
    var arr = [];
    arr[0] = UID;
    arr[1] = userName;
    arr[2] = avatarUrl;
    arr[3] = profileUrl;
    arr[4] = role;
    exec(success, error, "CCCometChat", "createUser", arr);
}
CCCometChat.prototype.deleteChat = function (remoteMessage, success, error) {
    var arr = [];
    arr[0] = remoteMessage;
    exec(success, error, "CCCometChat", "deleteChat", arr);
}


function convertBooleanToiOS(booleanValue) {
    if (booleanValue == "YES") {
        booleanValue = true;
    } else if ((booleanValue == "NO")) {
        booleanValue = false;
    }
    if (CCCometChat.platform == "iOS") {
        if (booleanValue) {
            return "YES";
        } else {
            return "NO";
        }
    }
    return booleanValue;
}

//For Custom UI
CCCometChat.prototype.subscribe = function (isFullScreen, success, error) {
    var arr = [];
    arr[0] = convertBooleanToiOS(isFullScreen);
    exec(success, error, "CCCometChat", "subscribe", arr);
}

var CCCometChat = new CCCometChat();
module.exports = CCCometChat;