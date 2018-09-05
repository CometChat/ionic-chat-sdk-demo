/********* CCCometChat.m Cordova Plugin Defination *******/

#import <Cordova/CDV.h>


@interface CCCometChat : CDVPlugin
- (void)initializeCometChat:(CDVInvokedUrlCommand*)command;
- (void)login:(CDVInvokedUrlCommand*)command;
- (void)logout:(CDVInvokedUrlCommand*)command;
- (void)loginWithId:(CDVInvokedUrlCommand*)command;
- (void)launchCometChat:(CDVInvokedUrlCommand*)command;
- (void)launchCometChatWithID:(CDVInvokedUrlCommand*)command;
- (void)getAllPushChannels:(CDVInvokedUrlCommand*)command;
- (void)loginWithUID:(CDVInvokedUrlCommand*)command;
- (void)createUser:(CDVInvokedUrlCommand*)command;
- (void)getPlatform:(CDVInvokedUrlCommand*)command;
@end

