sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
], function(MessageToast, Controller) {
	"use strict";
	return Controller.extend("DrThinkingPatient.controller.Appointment", {
		onInit: function () {
 
    
			var oModel = new sap.ui.model.json.JSONModel("appointment.json");
			

			this.getView().setModel(oModel);

		}
	});
});