sap.ui.define([
	"sap/m/MessageToast",
	"jquery.sap.global",
	"sap/ui/core/format/DateFormat",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
	
], function(jQuery, MessageToast, DateFormat, Controller, JSONModel) {
	"use strict";

	return Controller.extend("DrThinkingPatient.controller.Chatroom", {
		onInit: function () {
 			var oModel = new sap.ui.model.json.JSONModel("feed.json");
			this.getView().setModel(oModel);
		},
		
		onPost: function(oEvent) {
			var oFormat = DateFormat.getDateTimeInstance({ style: "medium" });
			var oDate = new Date();
			var sDate = oFormat.format(oDate);
			// create new entry
			var sValue = oEvent.getParameter("value");
			var oEntry = {
				Author: "Omar",
				
				Type: "Reply",
				Date: "" + sDate,
				Text: sValue
			};

			// update model
			var oModel = this.getView().getModel();
			var aEntries = oModel.getData().EntryCollection;
			aEntries.unshift(oEntry);
			oModel.setData({
				EntryCollection: aEntries
			});
		},

		onSenderPress: function(oEvent) {
			MessageToast.show("Clicked on Link: " + oEvent.getSource().getSender());
		},

		onIconPress: function(oEvent) {
			MessageToast.show("Clicked on Image: " + oEvent.getSource().getSender());
		}
	});
});