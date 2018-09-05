/********* CCCometChat.m Cordova Plugin Implementation *******/
#import "CCCometChat.h"
#import <MessageSDKFramework/CometChat.h>
#import <cometchat-ui/readyUIFIle.h>
#include <sys/types.h>
#include <sys/sysctl.h>
#include "TargetConditionals.h"

#import <Cordova/CDV.h>





@implementation CCCometChat{
    CometChat *cometchat;
    readyUIFIle *cometchatui;
}

- (void)initializeCometChat:(CDVInvokedUrlCommand*)command
{
  [self.commandDelegate runInBackground:^{

        CDVPluginResult* pluginResult = nil;
        NSString* siteUrl = [command.arguments objectAtIndex:0];
        NSString* licenseKey = [command.arguments objectAtIndex:1];
        NSString* apiKey = [command.arguments objectAtIndex:2];
        NSString*  tempCod = [command.arguments objectAtIndex:3];
        BOOL isCod=NO;

        cometchat =  [[CometChat alloc] init];

        if ([tempCod isEqualToString:@"YES"])
        {
          isCod= YES;

                      [cometchat initializeCometChat:siteUrl licenseKey:licenseKey apikey:apiKey isCometOnDemand:isCod
                                   success:^(NSDictionary *response) {
                      NSDictionary *successDict = @{@"success":response};
                    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

                                   } failure:^(NSError *error) {
                                              NSDictionary *errorDict = @{@"error":error.localizedDescription};
                        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:errorDict] callbackId:command.callbackId];
                                   }];
        }
        else{
                  [cometchat checkCometChatUrl:siteUrl success:^(NSDictionary *response) {
            

            [cometchat initializeCometChat:siteUrl licenseKey:licenseKey apikey:apiKey isCometOnDemand:isCod
                                   success:^(NSDictionary *response) {
                      NSDictionary *successDict = @{@"success":response};
                    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

                                   } failure:^(NSError *error) {
                                              NSDictionary *errorDict = @{@"error":error.localizedDescription};
                        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:errorDict] callbackId:command.callbackId];
                                   }];

        } failure:^(NSError *error) {
            NSDictionary *errorDict = @{@"error":error.localizedDescription};
          [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:errorDict] callbackId:command.callbackId];
        }];

        }


    }];



}

- (void)getPlatform:(CDVInvokedUrlCommand*)command
{
    NSDictionary* deviceProperties = [self deviceProperties];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:deviceProperties];

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (NSDictionary*)deviceProperties
{

    return @{
             @"platform": @"iOS"
             };
}
- (void)login:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{

        NSString* username = [command.arguments objectAtIndex:0];
        NSString* password = [command.arguments objectAtIndex:1];
        cometchat =  [[CometChat alloc] init];


        [cometchat login:username password:password success:^(NSDictionary *response) {
              
            NSDictionary *successDict = @{@"success":response};
      [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

        } failure:^(NSError *error) {
           
            NSDictionary *errorDict = @{@"error":error.localizedDescription};
          [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:errorDict] callbackId:command.callbackId];


        }];

    }];

}

- (void)logout:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        cometchat =  [[CometChat alloc] init];


        [cometchat logout:^(NSDictionary *response) {
            NSDictionary *successDict = @{@"success":response};
      [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

        } failure:^(NSError *error) {
            NSDictionary *errorDict = @{@"error":error.localizedDescription};
          [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:errorDict] callbackId:command.callbackId];


        }];

    }];



}

- (void)loginWithId:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{

        NSString* username = [command.arguments objectAtIndex:0];
        cometchat =  [[CometChat alloc] init];


        [cometchat login:username  success:^(NSDictionary *response) {
            NSDictionary *successDict = @{@"success":response};
      [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

        } failure:^(NSError *error) {
            NSDictionary *errorDict = @{@"error":error.localizedDescription};
          [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:errorDict] callbackId:command.callbackId];


        }];

    }];

}

- (void)getAllPushChannels:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{

        NSString* userid = [command.arguments objectAtIndex:0];

        cometchat =  [[CometChat alloc] init];


        [cometchat getAllPushChannels:userid  success:^(NSDictionary *response) {
             
            NSDictionary *successDict = @{@"success":response};
      [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

        } failure:^(NSError *error) {
           
            NSDictionary *errorDict = @{@"error":error.localizedDescription};
          [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:errorDict] callbackId:command.callbackId];


        }];

    }];

}

- (void)loginWithUID:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{

        NSString* uid = [command.arguments objectAtIndex:0];
        cometchat =  [[CometChat alloc] init];

    

        [cometchat loginWithUID:uid  success:^(NSDictionary *response) {
               
            NSDictionary *successDict = @{@"success":response};
      [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

        } failure:^(NSError *error) {
            NSDictionary *errorDict = @{@"error":error.localizedDescription};
          [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:errorDict] callbackId:command.callbackId];


        }];

    }];

}

- (void)createUser:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{

        NSString* uid = [command.arguments objectAtIndex:0];
        NSString* userName = [command.arguments objectAtIndex:1];
        NSString* avatarUrl = [command.arguments objectAtIndex:2];
        NSString* profileUrl = [command.arguments objectAtIndex:3];
        NSString* role = [command.arguments objectAtIndex:4];
        cometchat =  [[CometChat alloc] init];


        [cometchat createUser:uid userName:userName avatarUrl:avatarUrl profileUrl:profileUrl role:role success:^(NSDictionary *response) {
             
            NSDictionary *successDict = @{@"success":response};
      [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

        } failure:^(NSError *error) {
            NSDictionary *errorDict = @{@"error":error.localizedDescription};
          [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:errorDict] callbackId:command.callbackId];


        }];

    }];

}

- (void)launchCometChat:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{


        NSString* isFullScreen = [command.arguments objectAtIndex:0];

        cometchat =  [[CometChat alloc] init];
        cometchatui =  [[readyUIFIle alloc] init];
        BOOL iFS=NO;

        if ([isFullScreen isEqualToString:@"YES"])
        {
            iFS= YES;
        }

        [cometchatui launchCometChat:iFS observer:self.viewController userInfo:^(NSDictionary *response) {

            NSDictionary *successDict = @{@"userInfoCallback":response};
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict];
            [pluginResult setKeepCallbackAsBool:YES];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            //[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

        } groupInfo:^(NSDictionary *response) {

            NSDictionary *successDict = @{@"groupInfoCallback":response};
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict];
            [pluginResult setKeepCallbackAsBool:YES];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            
            //[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

        } onMessageReceive:^(NSDictionary *response) {

            NSDictionary *successDict = @{@"onMessageReceiveCallback":response};
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict];
            [pluginResult setKeepCallbackAsBool:YES];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            //[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

        } success:^(NSDictionary *response) {

            NSDictionary *successDict = @{@"successCallback":response};
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict];
            [pluginResult setKeepCallbackAsBool:YES];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
//            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

        } failure:^(NSError *error) {

            NSDictionary *errorDict = @{@"failCallback":error};
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:errorDict];
            [pluginResult setKeepCallbackAsBool:YES];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            
//            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:errorDict] callbackId:command.callbackId];

        } onLogout:^(NSDictionary *response) {

            NSDictionary *successDict = @{@"logoutCallback":response};
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict];
            [pluginResult setKeepCallbackAsBool:YES];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            
            //[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

        }];

    }];


}


- (void)launchCometChatWithID:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{


        NSString* tempFullScreen    = [command.arguments objectAtIndex:0];
        NSString* username   =  [command.arguments objectAtIndex:1];
        NSString* tempIsGroup         = [command.arguments objectAtIndex:2];
        NSString* tempSetBackButton   = [command.arguments objectAtIndex:3];

        BOOL isFullScreen=NO;
        BOOL isGroup=NO;
        BOOL setBackButton=NO;

        if ([tempFullScreen isEqualToString:@"YES"])
        {
            isFullScreen= YES;
        }
        if ([tempIsGroup isEqualToString:@"YES"])
        {
            isGroup= YES;
        }
        if ([tempSetBackButton isEqualToString:@"YES"])
        {
            setBackButton= YES;
        }

        cometchat =  [[CometChat alloc] init];
        cometchatui =  [[readyUIFIle alloc] init];
        [cometchatui launchCometChat:username isGroup:isGroup isFullScreen:isFullScreen observer:self.viewController setBackButton:setBackButton userInfo:^(NSDictionary *response) {
              
              NSDictionary *successDict = @{@"userInfoCallback":response};
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict];
            [pluginResult setKeepCallbackAsBool:YES];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            
//              [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

          } groupInfo:^(NSDictionary *response) {
             
              NSDictionary *successDict = @{@"groupInfoCallback":response};
              CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict];
              [pluginResult setKeepCallbackAsBool:YES];
              [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
              
              //[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

          } onMessageReceive:^(NSDictionary *response) {
              NSDictionary *successDict = @{@"onMessageReceiveCallback":response};
              CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict];
              [pluginResult setKeepCallbackAsBool:YES];
              [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
              
              //[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];


          } success:^(NSDictionary *response) {

             NSDictionary *successDict = @{@"successCallback":response};
              CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict];
              [pluginResult setKeepCallbackAsBool:YES];
              [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
              
//              [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];


          } failure:^(NSError *error) {

              NSDictionary *errorDict = @{@"failCallback":error};
              CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:errorDict];
              [pluginResult setKeepCallbackAsBool:YES];
              [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
              
              //[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:errorDict] callbackId:command.callbackId];


          } onLogout:^(NSDictionary *response) {
              NSDictionary *successDict = @{@"logoutCallback":response};
              CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict];
              [pluginResult setKeepCallbackAsBool:YES];
              [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
              //[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:successDict] callbackId:command.callbackId];

          }];


    }];


}



@end
