sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
], function(MessageToast, Controller) {
	"use strict";

	return Controller.extend("DrThinkingPatient.controller.Matching", {
	/*	onPressPatientProfile: function(oEvent){
			this.getOwnerComponent().getRouter().navTo("search");
		},*/
		onPressDoctorProfile: function(){
			/*this.getOwnerComponent().getRouter().navTo("drprofile");*/
			var sKey = "drprofile";
			for (var i=2; i<7; i++){
				var viewId = "__xmlview"+i;
				if(sap.ui.getCore().byId(viewId + "--pageContainer") != undefined){
					sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + sKey);
				}
			}
		},
		onPressChat:function(oEvent){
			/*this.getOwnerComponent().getRouter().navTo("chatroom");*/
			var sKey = "chatroom";
			for (var i=2; i<7; i++){
				var viewId = "__xmlview"+i;
				if(sap.ui.getCore().byId(viewId + "--pageContainer") != undefined){
					sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + sKey);
				}
			}
		},
		onPressReject:function(oEvent){
			/*this.getOwnerComponent().getRouter().navTo("reject");*/
			MessageToast.show("We are sorry but the rejection function is not available now.");
		}
		
	});
});