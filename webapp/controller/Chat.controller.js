sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
], function(MessageToast, Controller) {
	"use strict";
	return Controller.extend("DrThinkingPatient.controller.Chat", {
		onListItemPress: function(oEvent) {
			/*this.getOwnerComponent().getRouter().navTo("chatroom");*/
			var sKey = "chatroom";
			for (var i=2; i<7; i++){
				var viewId = "__xmlview"+i;
				if(sap.ui.getCore().byId(viewId + "--pageContainer") != undefined){
					sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + sKey);
				}
			}
			
		}
	});
});