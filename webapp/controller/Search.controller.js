sap.ui.define([
	"jquery.sap.global",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function(jQuery, MessageToast, Fragment, JSONModel, Controller) {
	"use strict";
	var _timeout;
	return Controller.extend("DrThinkingPatient.controller.Search", {
			onInit: function () {
			var oModel = new JSONModel({data: {}});
			this.getView().setModel(oModel);
		},
			onOpenDialog: function (oEvent) {
			// instantiate dialog
			if (!this._dialog) {
				this._dialog = sap.ui.xmlfragment("DrThinkingPatient.view.BusySearching", this);
				this.getView().addDependent(this._dialog);
			}

			// open dialog
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
			this._dialog.open();

			// simulate end of operation
			_timeout = jQuery.sap.delayedCall(3000, this, function () {
				this._dialog.close();
				this._onSent();
			});
			
		},

		onDialogClosed: function (oEvent) {
			jQuery.sap.clearDelayedCall(_timeout);

			if (oEvent.getParameter("cancelPressed")) {
				MessageToast.show("The operation has been cancelled");
			} else {
				MessageToast.show("The operation has been completed");
			}
		},
		
		//Sent Request / Search Description
		_onSent: function(){
			/*this.getOwnerComponent().getRouter().navTo("match");*/
			var sKey = "match";
			for (var i=2; i<7; i++){
				var viewId = "__xmlview"+i;
				if(sap.ui.getCore().byId(viewId + "--pageContainer") != undefined){
					sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + sKey);
				}
			}
		}
	});
});