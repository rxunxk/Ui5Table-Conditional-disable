sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/BusyIndicator",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, BusyIndicator) {
        "use strict";

        let productsModel

        return Controller.extend("com.raunak.appmodule.controller.mainView", {
            onInit: function () {
                // BusyIndicator.show();
                const controller = this;

                //fetching products from a remote rest API
                $.ajax({
                    url: "https://dummyjson.com/products",
                    method: "GET",
                    success: function (data, textStatus, jqXHR) {
                        // Handle successful response
                        console.log("Data received:", data);

                        // BusyIndicator.hide();

                        //Creating a JSON Model with the data received
                        productsModel = new JSONModel(data.products);
                        controller.getView().setModel(productsModel, "productsModel");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // Handle error

                        // BusyIndicator.hide();

                        console.error("Error status code:", jqXHR.status);
                        console.error("Error:", errorThrown);

                        MessageBox.error("Error: ", errorThrown)
                    }
                });
            },
            onUpdateFinished(oEvent) {
                let table = oEvent.getSource();
                let columns = table.getItems();
                columns.forEach(col => {
                    let colCb = col.getMultiSelectControl();
                    if (~~col.getCells()[5].getText() > 500) {
                        colCb.setEnabled(false);
                    }
                });
            }
        });
    });
