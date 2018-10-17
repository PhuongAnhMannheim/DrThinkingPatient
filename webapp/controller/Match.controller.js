sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
], function(MessageToast, Controller) {
	"use strict";

	return Controller.extend("DrThinkingPatient.controller.Matching", {
	/*	onPressPatientProfile: function(oEvent){
			this.getOwnerComponent().getRouter().navTo("search");
		},*/
		onPressChat:function(oEvent){
			this.getOwnerComponent().getRouter().navTo("chatroom");
		},
		onPressReject:function(oEvent){
			this.getOwnerComponent().getRouter().navTo("reject");
		}
		
	});
});