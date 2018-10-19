sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
], function(MessageToast, Controller) {
	"use strict";

	return Controller.extend("DrThinkingPatient.controller.Schedule", {
		onInit: function () {
			var oModel = new sap.ui.model.json.JSONModel("drprofile.json");
			this.getView().setModel(oModel);
		},
		onAccept: function(){
			this.getOwnerComponent().getRouter().navTo("chatroom");
		}
	});
});