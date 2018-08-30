
# ionic-chat-sdk-demo
CometChat enables you to add voice, video and text chat to your Ionic app in minutes! That's not all, CometChat has whiteboard, writeboard, real-time translation and more.

# Quick Start

1. Download the sample Ionic project from this repository.
2. Open the home.ts file and replace the `CometChat License Key` and `API Key` values. These values can be found in the `CometChat Admin Panel`, under the `Settings`-> `API Keys` section.

3. Navigate to the project directory and add the Android and iOS platforms to your project using the below commands:

`ionic cordova platform add android`
<br/>
`ionic cordova platform add ios`

4. Add the CometChat Ionic plugin from the NPM store using the below command:

`ionic cordova plugin add cordova-plugin-cccometchat`

Please Note: As CometChat Ionic plugin makes use if Cocoapods, please make sure you setup Cocoapods in the /platforms/ios/ folder and call the `pod update` command once the Ionic plugin is added to your project.

5. Run the app using the below commands:

`ionic cordova run android`
<br/>
`ionic cordova run ios`

# For Push Notification

1. For push Notication in the Sample App , Kindly replace the the google-services.json and GoogleService-Info.plist respectively.Similarly, add the GoogleService-Info.plist file to YOUR_PROJECT/platforms/ios/ folder.
2. If you need to implement the Firebase Push Notication using the cordova-plugin-fcm in your project then kindly follow the below procedure :
  a. Add the CometChat Plugin into your App using below Command:  
     `ionic cordova plugin add cordova-plugin-cccometchat`.
  b. Add the FCM Plugin into your App using below Command: 
      `ionic cordova plugin add cordova-plugin-fcm`
  c. Replace the cordova-plugin-fcm folder of your project with the cordova-plugin-fcm folder of CometChat Sample project.
  d. Add the respective platfrom i.e Android and/or iOS using below Command:
      `ionic cordova platform add android`
      `ionic cordova platform add iOS`
3. Sometimes there might be issues with ionic ios for pod installation, then you can navigate to the platform/ios directory of your project and run the update command :
` pod update`

# Please Note:

CometChat ionic plugin only supports the Android and iOS platforms.


For more information regarding the CometChat Ionic SDK , please refer to the [developer documentation](https://developer.cometchat.com/docs/cordova-quick-start).
