/* global firebase*/
sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
], function(MessageToast, Controller) {
	"use strict";
	
	var bLoginStatus; 

	return Controller.extend("DrThinkingPatient.controller.Welcome", {
		
		onInit: function(){
			/*var config = {
			    apiKey: "AIzaSyAgcA6_4hD7bcDUY7emEzk5ubStitgrB08",
			    authDomain: "drthinking-205bc.firebaseapp.com",
			    databaseURL: "https://drthinking-205bc.firebaseio.com",
			    projectId: "drthinking-205bc",
			    storageBucket: "drthinking-205bc.appspot.com",
			    messagingSenderId: "233440483716"
			  };
			  firebase.initializeApp(config);*/
		},
		
		onPressRegister: function(oEvent){
			this.getOwnerComponent().getRouter().navTo("register");
		},
		
		onPressLogin: function(oEvent){
			/*this.getOwnerComponent().getRouter().navTo("home");*/
			
			//getting credentials, authenticate with firebase backend, show login status, if right navigate
			var sUser = this.getView().byId("email").getValue();
            var sPassword = this.getView().byId("password").getValue();
            
            var that = this;
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    MessageToast.show("Login was successfully!");
                    /*this.getOwnerComponent().getRouter().navTo("home");*/
                    that._getUsers();
                }
            });
            firebase.auth().signInWithEmailAndPassword(sUser, sPassword).catch(function() {
                MessageToast.show("Login not possible!");
				bLoginStatus = false;
            });
            //when right user, then navigate
            if(bLoginStatus){
            	that.getOwnerComponent().getRouter().navTo("home");
            }
		},
		
		_getUsers: function() {
            var that = this;
            var oRefToUserData = firebase.database().ref("/users");
            //MessageToast.show(oRefToUserData);
            oRefToUserData.once("value").then(function(snapshot) {
			    snapshot.forEach(function(childSnapshot) {
			      // key will be "ada" the first time and "alan" the second time
			      var key = childSnapshot.key;
			      // childData will be the actual contents of the child
			      var childData = childSnapshot.val();
			      console.log(key + "; "+childData);
			  });
			});
            oRefToUserData.on("value", function(oSnapshot) {
                var mUserData = oSnapshot.toJSON();
                //MessageToast.show("User Data = "+ mUserData);
                var aUserData = $.map(mUserData, function(oElement, sGuid) {
                    oElement.guid = sGuid;
                    return oElement;
                });
                var oUserModel = new sap.ui.model.json.JSONModel({});
                //MessageToast.show(oUserModel);
                oUserModel.setProperty("/users", aUserData);
                oUserModel.setProperty("/currentUser", firebase.auth().currentUser.email);
                that.getView().setModel(oUserModel, "userModel");
                bLoginStatus = true; 
            });
        }
	});
});