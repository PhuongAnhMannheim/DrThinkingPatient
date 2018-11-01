/* global firebase*/
sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
], function(MessageToast, Controller) {
	"use strict";
	
	var user_profile;
	
	return Controller.extend("DrThinkingPatient.controller.Profile", {
		onPressHome: function(oEvent){
			this.getOwnerComponent().getRouter().navTo("home");
		},
			onInit: function () {
			/**var oModel = new sap.ui.model.json.JSONModel("profile.json");
			this.getView().setModel(oModel);**/

		},
		onExit : function () {
			if (this._oPopover) {
				this._oPopover.destroy();
			}
		},

		_getPopover : function () {
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("sap.m.sample.ObjectHeaderResponsiveIII.Popover", this);
				this.getView().addDependent(this._oPopover);
			}
			return this._oPopover;
		},

		handleTitlePress : function (oEvent) {
			var domRef = oEvent.getParameter("domRef");
			this._getPopover().openBy(domRef);
			
		},
		
		onBeforeRendering : function () {
			var that = this;
			var user = firebase.auth().currentUser;
			var profile = firebase.database().ref("/userprofile/patient_info/");
			profile.on("value", function(snapshot) {
				snapshot.forEach(function(childSnapshot){
					if(childSnapshot.val().guid.toString() == user.uid.toString()){
						user_profile = childSnapshot.toJSON();
					}
				});	
				if(user_profile){
					console.log(user_profile)
					 var oModel = new sap.ui.model.json.JSONModel({});
					 oModel.setProperty("/userprofile", user_profile);
					 that.getView().setModel(oModel, "userProfileModel");
					 console.log(user_profile['med_history']);
				}else{
					MessageToast.show("You have no profile yet!");
				}
			});
		},
		
		onListItemPress: function(){
			var oView = this.getView();
			MessageToast.show("Scheiße");
		},
		
		onListMedHistPress: function(){
			console.log(user_profile);
			var profile = user_profile;
		},
		
		onTestButton: function(){
		MessageToast.show("title press");
			var profile = user_profile;
			var med_list = this.getView().byId("medHistList");
			var profile_history = profile['med_history'];
			//console.log("OnAfterRendering"+profile_history[0].date);
			med_list.setModel(profile_history);
			med_list.bindItems("/", new sap.m.StandardListItem({title:"{date}, {description}"}));	
		}
		
	});
});