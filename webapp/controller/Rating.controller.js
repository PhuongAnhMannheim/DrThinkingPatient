sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/m/Button",
		"sap/m/Dialog",
		'sap/m/Text',
		'sap/m/TextArea'
], function(MessageToast, Controller,Button, Dialog,Text,TextArea) {
	"use strict";
	return Controller.extend("DrThinkingPatient.controller.Rating", {
		onInit: function () {
 
    
			var oModel = new sap.ui.model.json.JSONModel("appointment.json");
			

			this.getView().setModel(oModel);

		},
		onApproveDialog: function () {
			var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: new Text({ text: 'Are you sure you want to submit your review?' }),
				beginButton: new Button({
					text: 'Submit',
					press: function () {
						MessageToast.show('Submit pressed!');
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		}
	});
	

});