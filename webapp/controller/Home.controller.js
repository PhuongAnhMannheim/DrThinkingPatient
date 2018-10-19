sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/Fragment',
	'sap/m/Popover',
	'sap/m/Button',
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
], function(jquery, Fragment, Popover, Button, MessageToast, Controller) {
	"use strict";

	return Controller.extend("DrThinkingPatient.controller.Home", {
		
		model : new sap.ui.model.json.JSONModel(),
		data : {
			navigation: [{
				title: 'Home',
				icon: 'sap-icon://home',
				key: 'home'
			},{
				title: 'Profile',
				key: 'profile',
				icon: 'sap-icon://doctor'
			},{
				title: 'Appointments',
				key: 'appointments',
				icon: 'sap-icon://appointment-2'
			},{
				title: 'Conversations',
				icon: 'sap-icon://discussion',
				key: 'chat'
			}, {
				title: 'Patient Finder',
				icon: 'sap-icon://employee-lookup',
				key: 'search'
			}
			],
			fixedNavigation: [{
				title: 'FAQ',
				icon: 'sap-icon://sys-help'
			}, {
				title: 'Terms and Conditions',
				icon: 'sap-icon://crm-service-manager'
			}]
		},
		onInit : function() {
			this.model.setData(this.data);
			this.getView().setModel(this.model);

			/*this._setToggleButtonTooltip(!sap.ui.Device.system.desktop);*/
		},
		onItemSelect : function(oEvent) {
			var item = oEvent.getParameter('item');
			var viewId = this.getView().getId();
			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + item.getKey());
		},
		
			handleUserNamePress: function (event) {
			var popover = new Popover({
				showHeader: false,
				placement: sap.m.PlacementType.Bottom,
				content:[
					new Button({
						text: 'Feedback',
						type: sap.m.ButtonType.Transparent
					}),
					new Button({
						text: 'Help',
						type: sap.m.ButtonType.Transparent
					}),
					new Button({
						text: 'Logout',
						type: sap.m.ButtonType.Transparent
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

			popover.openBy(event.getSource());
		},

		onSideNavButtonPress : function() {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			var sideExpanded = toolPage.getSideExpanded();

			this._setToggleButtonTooltip(sideExpanded);

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},
		_setToggleButtonTooltip : function(bLarge) {
			var toggleButton = this.byId('sideNavigationToggleButton');
			if (bLarge) {
				toggleButton.setTooltip('Large Size Navigation');
			} else {
				toggleButton.setTooltip('Small Size Navigation');
			}
		},
		onPressSearch: function(oEvent){
			/*this.getOwnerComponent().getRouter().navTo("search");
			jQuery.sap.delayedCall(5000, this, function () {
				this.getOwnerComponent().getRouter().navTo("match");
			});*/
			this.getOwnerComponent().getRouter().navTo("search");
			
			/*var oKey = "search";
			var viewId = "__xmlview4";
			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + oKey);*/
		},
		onPressAppointments:function(oEvent){
			this.getOwnerComponent().getRouter().navTo("appointment");
			/*var oKey = "appointments";
			var viewId = "__xmlview4";
			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + oKey);*/
		},
		onPressProfile:function(oEvent){
			this.getOwnerComponent().getRouter().navTo("profile");
			/*var oKey = "profile";
			var viewId = "__xmlview4";
			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + oKey);*/
			
		},
		onPressChats: function(oEvent) {
			this.getOwnerComponent().getRouter().navTo("chat");
			/*var oKey = "chat";
			var viewId = "__xmlview4";
			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + oKey);*/
		},
			onPressRate: function(oEvent){
			this.getOwnerComponent().getRouter().navTo("rating");
		}
		
	});
});