/* global firebase*/
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
				title: 'Calendar',
				key: 'calendar',
				icon: 'sap-icon://appointment-2'
			},{
				title: 'Chat',
				icon: 'sap-icon://discussion',
				key: 'chat'
			},{
				title: 'Dr',
				icon: 'sap-icon://discussion',
				key: 'drprofile'
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
			this._getUsers();

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
		onPressProfile:function(oEvent){
			this._homeNav("profile");
		},
		onPressAppointments:function(oEvent){
			this._homeNav("calendar");
		},
		onPressChats: function(oEvent) {
			this._homeNav("chat");
		},
		onPressSearch: function(oEvent){
			this._homeNav("search");
		},
		onPressRate: function(oEvent){
			/*this.getOwnerComponent().getRouter().navTo("rating");*/
			this._homeNav("rating");
		},
		_homeNav:function(key){
			var sKey = key;
			var viewId = this.getView().getId();
			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + sKey);
		},
		_getUsers: function() {
            var that = this;
            var oRefToUserData = firebase.database().ref("/users");
            //MessageToast.show(oRefToUserData);
            oRefToUserData.once("value").then(function(snapshot) {
			    snapshot.forEach(function(childSnapshot) {
			      // key will be "ada" the first time and "alan" the second time
			      var key = childSnapshot.key;
			      // childData will be the actual contents of the child
			      var childData = childSnapshot.val();
			      console.log(key + "; "+childData);
			  });
			});
            oRefToUserData.on("value", function(oSnapshot) {
                var mUserData = oSnapshot.toJSON();
                //MessageToast.show("User Data = "+ mUserData);
                var aUserData = $.map(mUserData, function(oElement, sGuid) {
                    oElement.guid = sGuid;
                    return oElement;
                });
                var oUserModel = new sap.ui.model.json.JSONModel({});
                //MessageToast.show(oUserModel);
                oUserModel.setProperty("/users", aUserData);
                oUserModel.setProperty("/currentUser", firebase.auth().currentUser.email);
                that.getView().setModel(oUserModel, "userModel");
            });
        }
	});
});