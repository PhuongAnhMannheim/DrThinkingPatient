sap.ui.define([
	"jquery.sap.global",
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
], function(jquery,MessageToast,Controller) {
	"use strict";

	return Controller.extend("DrThinkingPatient.controller.Register", {
		onPress: function(oEvent){
			//do the update for the profile
			this.getOwnerComponent().getRouter().navTo("home");
		},
		handleUploadPress: function(oEvent) {
			var oButton = this.byId("BtnUpload");
			var msg = 'Thank you. You have been verified.';
			oButton.setBusy(true);

			// simulate delayed end of operation
			jQuery.sap.delayedCall(3000, this, function () {
				oButton.setBusy(false);
				MessageToast.show(msg);
			});
			
			
		}
	});
});