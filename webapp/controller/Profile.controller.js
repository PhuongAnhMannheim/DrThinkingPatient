sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
], function(MessageToast, Controller) {
	"use strict";
	return Controller.extend("DrThinkingPatient.controller.Profile", {
		onPressHome: function(oEvent){
			this.getOwnerComponent().getRouter().navTo("home");
		},
			onInit: function () {
			var oModel = new sap.ui.model.json.JSONModel("profile.json");
			this.getView().setModel(oModel);

		},
		onExit : function () {
			if (this._oPopover) {
				this._oPopover.destroy();
			}
		},

		_getPopover : function () {
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("sap.m.sample.ObjectHeaderResponsiveIII.Popover", this);
				this.getView().addDependent(this._oPopover);
			}
			return this._oPopover;
		},

		handleTitlePress : function (oEvent) {
			var domRef = oEvent.getParameter("domRef");
			this._getPopover().openBy(domRef);
		}
	});
});