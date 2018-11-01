sap.ui.define(['jquery.sap.global',
		'sap/m/MessageBox',
		'sap/m/Button',
		'sap/m/Dialog',
		'sap/m/Label',
		'sap/m/Popover',
		'sap/m/List',
		'sap/m/StandardListItem',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'],
	function(MessageBox, jQuery, Button, Dialog, Label, Popover, List, StandardListItem, Fragment, Controller, JSONModel) {
		"use strict";

		var PageController = Controller.extend("DrThinkingPatient.controller.Calendar", {

			onInit: function () {
				var oModel = new JSONModel();
				oModel.setData({ 
					startDate: new Date("2018", "10", "2", "12", "0"),
					people: [
						{
						pic: "img/omar.png",
						name: "Omar ElRafik",
						role: "patient",
						appointments: [
						],
						headers: [
						
						]
					}
						,{
						pic: "img/dr_daniel_thinking.png",
						name: "Dr. Daniel Thinking",
						role: "doctor",
						appointments: [
							{
								start: new Date("2018", "10", "2", "13", "00"),
								end: new Date("2018", "10", "2", "13", "15"),
								title: "Busy",
								type: "Type02",
								tentative: false
							},
							{
								start: new Date("2018", "10", "2", "11", "30"),
								end: new Date("2018", "10", "2", "12", "30"),
								title: "Busy",
								info: "",
								type: "Type03",
								pic: "sap-icon://sap-ui5",
								tentative: true
							},
							{
								start: new Date("2018", "10", "3", "10", "0"),
								end: new Date("2018", "10", "3", "12", "0"),
								title: "Busy",
								info: "",
								type: "Type01",
								pic: "sap-icon://sap-ui5",
								tentative: false
							},
							{
								start: new Date("2018", "10", "2", "14", "00"),
								end: new Date("2018", "10", "2", "17", "30"),
								title: "Busy",
								info: "",
								type: "Type02",
								tentative: false
							},
							{
								start: new Date("2018", "10", "16", "04", "00"),
								end: new Date("2018", "10", "16", "22", "30"),
								title: "Busy",
								info: "",
								type: "Type04",
								tentative: false
							},
							{
								start: new Date("2018", "10", "18", "08", "30"),
								end: new Date("2018", "10", "18", "09", "30"),
								title: "Busy",
								type: "Type02",
								tentative: false
							},
							{
								start: new Date("2018", "10", "21", "00", "30"),
								end: new Date("2018", "10", "21", "23", "30"),
								title: "Busy",
								info: "",
								type: "Type03",
								tentative: true
							},
							{
								start: new Date("2018", "10", "25", "11", "30"),
								end: new Date("2018", "10", "25", "13", "30"),
								title: "Busy",
								type: "Type01",
								tentative: true
							},
							{
								start: new Date("2018", "10", "30", "11", "30"),
								end: new Date("2018", "10", "30", "13", "30"),
								title: "Busy",
								type: "Type03",
								tentative: true
							},
							{
								start: new Date("2018", "10", "30", "13", "30"),
								end: new Date("2018", "10", "30", "17", "30"),
								title: "Busy",
								type: "Type02",
								tentative: false
							},
							{
								start: new Date("2018", "10", "31", "10", "00"),
								end: new Date("2018", "10", "31", "11", "30"),
								title: "Busy",
								info: "",
								type: "Type04",
								tentative: false
							},
							{
								start: new Date("2018", "10", "3", "08", "30"),
								end: new Date("2018", "10", "13", "09", "30"),
								title: "Busy",
								type: "Type02",
								tentative: false
							},
							{
								start: new Date("2018", "10", "4", "10", "0"),
								end: new Date("2018", "10", "4", "12", "0"),
								title: "Busy",
								info: "",
								type: "Type01",
								pic: "sap-icon://sap-ui5",
								tentative: false
							},
							{
								start: new Date("2018", "10", "30", "10", "0"),
								end: new Date("2018", "10", "33", "12", "0"),
								title: "Busy",
								type: "Type07",
								pic: "sap-icon://sap-ui5",
								tentative: false
							}
						],
						headers: [
							{
								start: new Date("2018", "10", "15", "8", "0"),
								end: new Date("2018", "10", "15", "10", "0"),
								title: "Busy",
								type: "Type06"
							},
							{
								start: new Date("2018", "10", "15", "17", "0"),
								end: new Date("2018", "10", "15", "19", "0"),
								title: "Busy",
								type: "Type06"
							},
							{
								start: new Date("2018", "10", "1", "0", "0"),
								end: new Date("2018", "10", "30", "23", "59"),
								title: "Busy",
								type: "Type10",
								tentative: false
							}
						]
					}
					]
				});
				this.getView().setModel(oModel);

			},

			handleAppointmentSelect: function (oEvent) {
				var oAppointment = oEvent.getParameter("appointment");

				if (oAppointment) {
					this._handleSingleAppointment(oAppointment);
				} else {
					this._handleGroupAppointments(oEvent);
				}
			},

			handleOkButton: function (oEvent) {
				var oFrag =  sap.ui.core.Fragment,
					oStartValue = oFrag.byId("myPopoverFrag", "startDate").getDateValue(),
					oEndValue = oFrag.byId("myPopoverFrag", "endDate").getDateValue(),
					sInfoValue = oFrag.byId("myPopoverFrag", "moreInfo").getValue(),
					sAppointmentPath = this._oDetailsPopover.getBindingContext().sPath;

				this._oDetailsPopover.getModel().setProperty(sAppointmentPath + "/start", oStartValue);
				this._oDetailsPopover.getModel().setProperty(sAppointmentPath + "/end", oEndValue);
				this._oDetailsPopover.getModel().setProperty(sAppointmentPath + "/info", sInfoValue);
				this._oDetailsPopover.close();
			},

			handleCancelButton: function (oEvent) {
				this._oDetailsPopover.close();
			},

			handleAppointmentCreate: function (oEvent) {
				var oFrag =  sap.ui.core.Fragment,
					oDateTimePickerStart,
					oDateTimePickerEnd,
					oBeginButton;

				this._createDialog();

				oFrag.byId("myFrag", "selectPerson").setSelectedItem(oFrag.byId("myFrag", "selectPerson").getItems()[0]);

				oDateTimePickerStart = oFrag.byId("myFrag", "startDate");
				oDateTimePickerEnd =  oFrag.byId("myFrag", "endDate");
				oBeginButton = this.oNewAppointmentDialog.getBeginButton();

				oDateTimePickerStart.setValue("");
				oDateTimePickerEnd.setValue("");
				oDateTimePickerStart.setValueState("None");
				oDateTimePickerEnd.setValueState("None");

				this.updateButtonEnabledState(oDateTimePickerStart, oDateTimePickerEnd, oBeginButton);
				this.oNewAppointmentDialog.open();
			},

			handleAppointmentAddWithContext: function (oEvent) {
				var oFrag =  sap.ui.core.Fragment,
					currentRow,
					sPersonName,
					oSelect,
					oSelectedItem,
					oSelectedIntervalStart,
					oStartDate,
					oSelectedIntervalEnd,
					oEndDate,
					oDateTimePickerStart,
					oDateTimePickerEnd,
					oBeginButton;

				this._createDialog();

				currentRow = oEvent.getParameter("row");
				sPersonName = currentRow.getTitle();
				oSelect = this.oNewAppointmentDialog.getContent()[0].getContent()[1];
				oSelectedItem = oSelect.getItems().filter(function(oItem) { return oItem.getText() === sPersonName; })[0];
				oSelect.setSelectedItem(oSelectedItem);

				oSelectedIntervalStart = oEvent.getParameter("startDate");
				oStartDate = oFrag.byId("myFrag", "startDate");
				oStartDate.setDateValue(oSelectedIntervalStart);

				oSelectedIntervalEnd = oEvent.getParameter("endDate");
				oEndDate = oFrag.byId("myFrag", "endDate");
				oEndDate.setDateValue(oSelectedIntervalEnd);

				oDateTimePickerStart = oFrag.byId("myFrag", "startDate");
				oDateTimePickerEnd =  oFrag.byId("myFrag", "endDate");
				oBeginButton = this.oNewAppointmentDialog.getBeginButton();

				oDateTimePickerStart.setValueState("None");
				oDateTimePickerEnd.setValueState("None");

				this.updateButtonEnabledState(oDateTimePickerStart, oDateTimePickerEnd, oBeginButton);
				this.oNewAppointmentDialog.open();
			},

			_validateDateTimePicker: function (sValue, oDateTimePicker) {
				if (sValue === "") {
					oDateTimePicker.setValueState("Error");
				} else {
					oDateTimePicker.setValueState("None");
				}
			},

			updateButtonEnabledState: function (oDateTimePickerStart, oDateTimePickerEnd, oButton) {
				var bEnabled = oDateTimePickerStart.getValueState() !== "Error"
					&& oDateTimePickerStart.getValue() !== ""
					&& oDateTimePickerEnd.getValue() !== ""
					&& oDateTimePickerEnd.getValueState() !== "Error";

				oButton.setEnabled(bEnabled );
			},

			handleDetailsChange: function (oEvent) {
				var oFrag =  sap.ui.core.Fragment,
					oDTPStart = oFrag.byId("myPopoverFrag", "startDate"),
					oDTPEnd = oFrag.byId("myPopoverFrag", "endDate"),
					oOKButton = oFrag.byId("myPopoverFrag", "OKButton");

				this._validateDateTimePicker(oEvent.getParameter("value"), oEvent.getSource());
				this.updateButtonEnabledState(oDTPStart, oDTPEnd, oOKButton);
			},

			handleCreateChange: function (oEvent) {
				var oFrag =  sap.ui.core.Fragment,
					oDateTimePickerStart = oFrag.byId("myFrag", "startDate"),
					oDateTimePickerEnd = oFrag.byId("myFrag", "endDate"),
					oBeginButton = this.oNewAppointmentDialog.getBeginButton();

				this._validateDateTimePicker(oEvent.getParameter("value"), oEvent.getSource());
				this.updateButtonEnabledState(oDateTimePickerStart, oDateTimePickerEnd, oBeginButton);
			},

			_createDialog: function () {
				var oFrag =  sap.ui.core.Fragment,
					that = this,
					oStartDate,
					oEndDate,
					sTitle,
					sInfoResponse,
					oNewAppointment,
					oModel,
					sPath,
					oPersonAppointments;

				if (!that.oNewAppointmentDialog) {

					that.oNewAppointmentDialog = new Dialog({
						title: 'Add a new appointment',
						content: [
							sap.ui.xmlfragment("myFrag", "DrThinkingPatient.view.AppointmentCreate", this)
						],
						beginButton: new Button({
							text: 'Create',
							enabled: false,
							press: function () {
								oStartDate = oFrag.byId("myFrag", "startDate").getDateValue();
								oEndDate = oFrag.byId("myFrag", "endDate").getDateValue();
								sTitle = oFrag.byId("myFrag", "inputTitle").getValue();
								sInfoResponse = oFrag.byId("myFrag", "moreInfo").getValue();

								if (oFrag.byId("myFrag", "startDate").getValueState() !== "Error"
									&& oFrag.byId("myFrag", "endDate").getValueState() !== "Error") {

									oNewAppointment = {
										start: oStartDate,
										end: oEndDate,
										title: sTitle,
										info: sInfoResponse
									};
									oModel = that.getView().getModel();
									sPath = "/people/" + oFrag.byId("myFrag", "selectPerson").getSelectedIndex() + "/appointments";
									oPersonAppointments = oModel.getProperty(sPath);

									oPersonAppointments.push(oNewAppointment);

									oModel.setProperty(sPath, oPersonAppointments);
									that.oNewAppointmentDialog.close();
								}
							}
						}),
						endButton: new Button({
							text: 'Close',
							press: function () {
								that.oNewAppointmentDialog.close();
							}
						})
					});

					that.oNewAppointmentDialog.addStyleClass("sapUiContentPadding");
					this.getView().addDependent(that.oNewAppointmentDialog);

				}
			},

			_handleSingleAppointment: function (oAppointment) {
				var oFrag =  sap.ui.core.Fragment,
					oAppBC,
					oDateTimePickerStart,
					oDateTimePickerEnd,
					oInfoInput,
					oOKButton;

				if (!this._oDetailsPopover) {
					/*this._oDetailsPopover = sap.ui.xmlfragment("myPopoverFrag", "sap.m.sample.PlanningCalendarModifyAppointments.Details", this);*/
					this._oDetailsPopover = sap.ui.xmlfragment("myPopoverFrag", "DrThinkingPatient.view.AppointmentDetail", this);
					this.getView().addDependent(this._oDetailsPopover);
				}

				// the binding context is needed, because later when the OK button is clicked, the information must be updated
				oAppBC = oAppointment.getBindingContext();

				this._oDetailsPopover.setBindingContext(oAppBC);

				oDateTimePickerStart = oFrag.byId("myPopoverFrag", "startDate");
				oDateTimePickerEnd = oFrag.byId("myPopoverFrag", "endDate");
				oInfoInput = oFrag.byId("myPopoverFrag", "moreInfo");
				oOKButton = oFrag.byId("myPopoverFrag", "OKButton");

				oDateTimePickerStart.setDateValue(oAppointment.getStartDate());
				oDateTimePickerEnd.setDateValue(oAppointment.getEndDate());
				oInfoInput.setValue(oAppointment.getText());

				oDateTimePickerStart.setValueState("None");
				oDateTimePickerEnd.setValueState("None");

				this.updateButtonEnabledState(oDateTimePickerStart, oDateTimePickerEnd, oOKButton);
				this._oDetailsPopover.openBy(oAppointment);
			},

			_handleGroupAppointments: function (oEvent) {
				var aAppointments,
					sGroupAppointmentType,
					sGroupPopoverValue,
					sGroupAppDomRefId,
					bTypeDiffer;

				aAppointments = oEvent.getParameter("appointments");
				sGroupAppointmentType = aAppointments[0].getType();
				sGroupAppDomRefId = oEvent.getParameter("domRefId");
				bTypeDiffer = aAppointments.some(function (oAppointment) {
					return sGroupAppointmentType !== oAppointment.getType();
				});

				if (bTypeDiffer) {
					sGroupPopoverValue = aAppointments.length + " Appointments of different types selected";
				} else {
					sGroupPopoverValue = aAppointments.length + " Appointments of the same " + sGroupAppointmentType + " selected";
				}

				if (!this._oGroupPopover) {
					this._oGroupPopover = new Popover({
						title: "Group Appointments",
						content: new Label({
							text: sGroupPopoverValue
						})
					});
				} else {
					this._oGroupPopover.getContent()[0].setText(sGroupPopoverValue);
				}
				this._oGroupPopover.addStyleClass("sapUiPopupWithPadding");
				this._oGroupPopover.openBy(document.getElementById(sGroupAppDomRefId));
			}

		});

		return PageController;

	});