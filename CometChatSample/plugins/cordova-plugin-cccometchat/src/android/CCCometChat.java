
import android.content.Context;

import com.inscripts.interfaces.Callbacks;
import com.inscripts.interfaces.LaunchCallbacks;
import com.inscripts.utils.Logger;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.TimeZone;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaInterface;
import models.Conversation;
import models.GroupMessage;
import models.Groups;
import models.OneOnOneMessage;
import models.Status;

import com.inscripts.orm.SugarRecord;
import android.provider.Settings;
import cometchat.inscripts.com.cometchatcore.coresdk.CometChat;
import utils.CCNotificationHelper;
import com.google.firebase.messaging.RemoteMessage;

/**
 * This class echoes a string called from JavaScript.
 */
public class CCCometChat extends CordovaPlugin {
    CometChat cometchat=null;
    private Context context=null;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }


    @Override
    public boolean execute(String action,final JSONArray args,final CallbackContext callbackContext) throws JSONException {
        if (action.equals("coolMethod")) {
            String message = args.getString(0);
            this.coolMethod(message, callbackContext);
            return true;
        }if (action.equals("getPlatform")) {
            JSONObject r = new JSONObject();
            r.put("platform", "Android");
            callbackContext.success(r);
            return true;
        }else if(action.equals("getInstance"))
        {
            cometchat=CometChat.getInstance(cordova.getActivity().getApplicationContext());
            if (cometchat != null) {
                context = cordova.getActivity().getApplicationContext();
                callbackContext.success("success");

            } else {
                callbackContext.error("Fail");
            }

        }else if(action.equals("initializeCometChat"))
        {
            cometchat=CometChat.getInstance(cordova.getActivity().getApplicationContext());
            if (cometchat != null) {
                context = cordova.getActivity().getApplicationContext();
                cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        if (cometchat != null) {
                            final String siteUrl = args.getString(0);
                            final String licenseKey = args.getString(1);
                            final String apiKey = args.getString(2);
                            final boolean isCod = args.getBoolean(3);
                            if((siteUrl.isEmpty()||siteUrl.equals(null))&&(isCod))
                            {
                                cometchat.initializeCometChat(siteUrl, licenseKey, apiKey, isCod, new Callbacks() {
                                    @Override
                                    public void successCallback(JSONObject jsonObject) {
                                        callbackContext.success(jsonObject.toString());

                                    }

                                    @Override
                                    public void failCallback(JSONObject jsonObject) {
                                        callbackContext.error(jsonObject.toString());
                                    }
                                });

                            }else{
                                if(isCod){
                                    cometchat.initializeCometChat(siteUrl, licenseKey, apiKey, isCod, new Callbacks() {
                                        @Override
                                        public void successCallback(JSONObject jsonObject) {
                                            callbackContext.success(jsonObject.toString());

                                        }

                                        @Override
                                        public void failCallback(JSONObject jsonObject) {
                                            callbackContext.error(jsonObject.toString());
                                        }
                                    });

                                }
                                else
                                {
                                    cometchat.checkCometChatUrl(context, siteUrl, new Callbacks() {
                                        @Override
                                        public void successCallback(JSONObject jsonObject) {

                                            cometchat.initializeCometChat(siteUrl, licenseKey, apiKey, isCod, new Callbacks() {
                                                @Override
                                                public void successCallback(JSONObject jsonObject) {
                                                    callbackContext.success(jsonObject.toString());

                                                }

                                                @Override
                                                public void failCallback(JSONObject jsonObject) {
                                                    callbackContext.error(jsonObject.toString());
                                                }
                                            });
                                        }

                                        @Override
                                        public void failCallback(JSONObject jsonObject) {
                                            callbackContext.error(jsonObject.toString());
                                        }
                                    });

                                }
                            }
                        } else {
                            callbackContext.error("CometChat not Instantiated.");
                        }
                    } catch (Exception e) {
                        callbackContext.error(e.toString());

                    }
                }
            });

            } else {
                callbackContext.error("Fail");
            }

        }else if(action.equals("login"))
        {
            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        if (cometchat != null) {

                            if(!(args.getString(0).equals(null)) && !(args.getString(0).equals("null")))
                            {

                                String username = args.getString(0);

                                if (!(args.getString(1).equals(null)) && !(args.getString(1).equals("null"))) {

                                    String password = args.getString(1);

                                    cometchat.login(username, password, new Callbacks() {
                                        @Override
                                        public void successCallback(JSONObject response) {
                                            callbackContext.success(response.toString());
                                        }

                                        @Override
                                        public void failCallback(JSONObject response) {
                                            callbackContext.error(response.toString());
                                        }
                                    });
                                }
                            }
                            else
                            {
                                callbackContext.error("Username or UserId cannot be null");
                            }
                        } else {
                            callbackContext.error("CometChat not Instantiated.");
                        }
                    } catch (Exception e) {
                        callbackContext.error(e.toString());

                    }
                }
            });

        }else if(action.equals("loginWithId"))
        {
            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        if (cometchat != null) {

                            if(!(args.getString(0).equals(null)) && !(args.getString(0).equals("null")))
                            {

                                String username = args.getString(0);


                                    cometchat.login(username, new Callbacks() {
                                        @Override
                                        public void successCallback(JSONObject response) {
                                            callbackContext.success(response.toString());
                                        }

                                        @Override
                                        public void failCallback(JSONObject response) {
                                            callbackContext.error(response.toString());
                                        }
                                    });


                            }
                            else
                            {
                                callbackContext.error("Username or UserId cannot be null");
                            }
                        } else {
                            callbackContext.error("CometChat not Instantiated.");
                        }
                    } catch (Exception e) {
                        callbackContext.error(e.toString());

                    }
                }
            });

        }else if(action.equals("loginWithUID"))
        {
            //Added in v7.0.23
            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        if (cometchat != null) {

                            if(!(args.getString(0).equals(null)) && !(args.getString(0).equals("null")))
                            {

                                String uid = args.getString(0);


                                    cometchat.loginWithUID(context,uid, new Callbacks() {
                                        @Override
                                        public void successCallback(JSONObject response) {
                                            callbackContext.success(response.toString());
                                        }

                                        @Override
                                        public void failCallback(JSONObject response) {
                                            callbackContext.error(response.toString());
                                        }
                                    });


                            }
                            else
                            {
                                callbackContext.error("UID cannot be null");
                            }
                        } else {
                            callbackContext.error("CometChat not Instantiated.");
                        }
                    } catch (Exception e) {
                        callbackContext.error(e.toString());

                    }
                }
            });

        }
        else if(action.equals("getAllPushChannels"))
        {
            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        if (cometchat != null) {

                            if(!(args.getString(0).equals(null)) && !(args.getString(0).equals("null")))
                            {

                                String userid = args.getString(0);


                                    cometchat.getPushChannels(context,userid, new Callbacks() {
                                        @Override
                                        public void successCallback(JSONObject response) {
                                            callbackContext.success(response.toString());
                                        }

                                        @Override
                                        public void failCallback(JSONObject response) {
                                            callbackContext.error(response.toString());
                                        }
                                    });


                            }
                            else
                            {
                                callbackContext.error("Username or UserId cannot be null");
                            }
                        } else {
                            callbackContext.error("CometChat not Instantiated.");
                        }
                    } catch (Exception e) {
                        callbackContext.error(e.toString());

                    }
                }
            });

        }else if(action.equals("launchCometChat"))
        {
            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        if (cometchat != null) {
                            if(cometchat.isLoggedIn()) {
                                boolean isFullScreen = args.getBoolean(0);
                                cometchat.launchCometChat(cordova.getActivity(), isFullScreen, new LaunchCallbacks() {
                                    @Override
                                    public void successCallback(JSONObject jsonObject) {
                                    PluginResult result = new PluginResult(PluginResult.Status.OK, createdNestedJson("successCallback",jsonObject));
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);

                                    }

                                    @Override
                                    public void failCallback(JSONObject jsonObject) {
                                    PluginResult result = new PluginResult(PluginResult.Status.OK, createdNestedJson("failCallback",jsonObject));
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                    }

                                    @Override
                                    public void userInfoCallback(JSONObject jsonObject) {
                                    PluginResult result = new PluginResult(PluginResult.Status.OK, createdNestedJson("userInfoCallback",jsonObject));
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                    }

                                    @Override
                                    public void chatroomInfoCallback(JSONObject jsonObject) {
                                    PluginResult result = new PluginResult(PluginResult.Status.OK, createdNestedJson("chatroomInfoCallback",jsonObject));
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                    }

                                    @Override
                                    public void onMessageReceive(JSONObject jsonObject) {
                                    PluginResult result = new PluginResult(PluginResult.Status.OK, createdNestedJson("onMessageReceive",jsonObject));
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                    }

                                    @Override
                                    public void error(JSONObject jsonObject) {
                                    PluginResult result = new PluginResult(PluginResult.Status.OK, createdNestedJson("error",jsonObject));
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                    }

                                    @Override
                                    public void onLogout() {
                                    PluginResult result = new PluginResult(PluginResult.Status.OK, "Logged Out");
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                    }

                                    @Override
                                    public void onWindowClose(JSONObject jsonObject) {
                                    PluginResult result = new PluginResult(PluginResult.Status.OK, createdNestedJson("onWindowClose",jsonObject));
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                    }
                                 }
                                );
                            }
                            else
                            {
                                callbackContext.error("Login into CometChat");
                            }
                        } else {
                            callbackContext.error("CometChat not Instantiated.");
                        }
                    } catch (Exception e) {
                        callbackContext.error(e.toString());

                    }
                }
            });

        }else if(action.equals("logout"))
        {
            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        if (cometchat != null) {

                              cometchat.logout(new Callbacks() {
                                @Override
                                public void successCallback(JSONObject response) {
                                    callbackContext.success(response.toString());
                                }

                                @Override
                                public void failCallback(JSONObject response) {
                                    callbackContext.error(response.toString());
                                }
                            });

                        } else {
                            callbackContext.error("CometChat not Instantiated.");
                        }
                    } catch (Exception e) {
                        callbackContext.error(e.toString());

                    }
                }
            });


        }else if(action.equals("createUser"))
        {
            //Added in v7.0.23
            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        if (cometchat != null) {

                            String uid = args.getString(0);
                            String userName = args.getString(1);
                            String avatarUrl = args.getString(2);
                            String profileUrl = args.getString(3);
                            String role = args.getString(4);

                              cometchat.createUser(context,uid, userName, avatarUrl, profileUrl, role, new Callbacks() {
                                @Override
                                public void successCallback(JSONObject response) {
                                    callbackContext.success(response.toString());
                                }

                                @Override
                                public void failCallback(JSONObject response) {
                                    callbackContext.error(response.toString());
                                }
                            });

                        } else {
                            callbackContext.error("CometChat not Instantiated.");
                        }
                    } catch (Exception e) {
                        callbackContext.error(e.toString());

                    }
                }
            });


        }else if(action.equals("launchCometChatWithID"))
        {
            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        if (cometchat != null) {
                            boolean isFullScreen = args.getBoolean(0);
                            String userid=args.getString(1);
                            boolean isGroup = false;
                            isGroup=args.getBoolean(2);
                            boolean setBackButton = true;
                            setBackButton=args.getBoolean(3);
                            if(cometchat.isLoggedIn()) {
                                cometchat.launchCometChat(cordova.getActivity(), isFullScreen, userid, isGroup,setBackButton, new LaunchCallbacks() {
                                    @Override
                                    public void successCallback(JSONObject jsonObject) {
                                    PluginResult result = new PluginResult(PluginResult.Status.OK, createdNestedJson("successCallback",jsonObject));
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                    }

                                    @Override
                                    public void failCallback(JSONObject jsonObject) {
                                    PluginResult result = new PluginResult(PluginResult.Status.OK, createdNestedJson("failCallback",jsonObject));
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                    }

                                    @Override
                                    public void userInfoCallback(JSONObject jsonObject) {
                                    PluginResult result = new PluginResult(PluginResult.Status.OK, createdNestedJson("userInfoCallback",jsonObject));
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                    }

                                    @Override
                                    public void chatroomInfoCallback(JSONObject jsonObject) {
                                    PluginResult result = new PluginResult(PluginResult.Status.OK, createdNestedJson("chatroomInfoCallback",jsonObject));
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                    }

                                    @Override
                                    public void onMessageReceive(JSONObject jsonObject) {
                                    PluginResult result = new PluginResult(PluginResult.Status.OK, createdNestedJson("onMessageReceive",jsonObject));
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                    }

                                    @Override
                                    public void error(JSONObject jsonObject) {
                                    PluginResult result = new PluginResult(PluginResult.Status.OK, createdNestedJson("error",jsonObject));
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                    }

                                    @Override
                                    public void onLogout() {
                                         JSONObject object = new JSONObject();

                                            try {
                                                object.put("logout","1");
                                                PluginResult result = new PluginResult(PluginResult.Status.OK, createdNestedJson("Logout",object));
                                                result.setKeepCallback(true);
                                                callbackContext.sendPluginResult(result);
                                            } catch (JSONException e) {
                                                e.printStackTrace();
                                            }
                                    }

                                    @Override
                                    public void onWindowClose(JSONObject jsonObject) {
                                    PluginResult result = new PluginResult(PluginResult.Status.OK, createdNestedJson("onWindowClose",jsonObject));
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                    }
                                });
                            }
                            else
                            {
                                callbackContext.error("Login into CometChat");
                            }
                        } else {
                            callbackContext.error("CometChat not Instantiated.");
                        }
                    } catch (Exception e) {
                        callbackContext.error(e.toString());

                    }
                }
            });

        }
        return true;
    }

    private void coolMethod(String message, CallbackContext callbackContext) {
         cometchat=CometChat.getInstance(cordova.getActivity());
         context = cordova.getActivity().getApplicationContext();
    }

    public String createdNestedJson(String key,JSONObject jsonObject){
        JSONObject object = new JSONObject();
        try {
            object.put(key,jsonObject);
            return object.toString();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return null;
    }
}
