/* global firebase*/
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"DrThinkingPatient/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("DrThinkingPatient.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			var config = {
			    apiKey: "AIzaSyAgcA6_4hD7bcDUY7emEzk5ubStitgrB08",
			    authDomain: "drthinking-205bc.firebaseapp.com",
			    databaseURL: "https://drthinking-205bc.firebaseio.com",
			    projectId: "drthinking-205bc",
			    storageBucket: "drthinking-205bc.appspot.com",
			    messagingSenderId: "233440483716"
			  };
			  firebase.initializeApp(config);
		}
	});
});