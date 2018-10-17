sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
], function(MessageToast, Controller) {
	"use strict";
	return Controller.extend("DrThinkingPatient.controller.Chat", {
		onListItemPress: function(oEvent) {
				this.getOwnerComponent().getRouter().navTo("chatroom");
		}
	});
});