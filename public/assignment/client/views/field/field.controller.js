"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController (FieldService, FormService, $routeParams) {
        var model = this;
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;
        model.addField = addField;
        model.removeField = removeField;

        FormService.findFormByFormId(formId).then(initiateFindFormById);

        function initiateFindFormById (response) {
            model.form = response;
        }

        loadFields();

        function loadFields () {
            FieldService.findAllFieldsForFormId(formId).then(initiateGetFieldsForForm);
            function initiateGetFieldsForForm (response) {
                model.fields = response.fields;
            }
        }

        function removeField (index) {
            FieldService.deleteFieldFromForm(formId, index).then(initiateDelete);
            function initiateDelete (response) {
                loadFields();
            }
        }

        function addField (fieldType) {
            var newField;
            switch (fieldType) {
                case "Single Line Text" :
                    newField = {
                        "label" : "New Text Field",
                        "fieldType" : "TEXT",
                        "options" : null,
                        "placeholder" : "New Field"
                    };
                    break;
                case "Date" :
                    newField = {
                        "label" : "New Date Field",
                        "fieldType" : "DATE",
                        "options" : null,
                        "placeholder" : "New Field"
                    };
                    break;
                case "Dropdown" :
                    newField = {
                        "label" : "New Dropdown",
                        "fieldType" : "OPTIONS",
                        "options" : [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ],
                        "placeholder" : null
                    };
                    break;
                case "Checkboxes" :
                    newField = {
                        "label" : "New Checkboxes",
                        "fieldType" : "CHECKBOXES",
                        "options" : [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ],
                        "placeholder" : null
                    };
                    break;
                case "Radio buttons" :
                    newField = {
                        "label": "New Radio Buttons",
                        "fieldType": "RADIOS",
                        "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ],
                        "placeholder" : null
                    };
                    break;
                case "Multi Line Text" :
                    newField = {
                        "label" : "New Text Field",
                        "fieldType" : "TEXTAREA",
                        "options" : null,
                        "placeholder" : "New Field"
                    };
            }

            FieldService.createFieldForForm(formId, newField).then(initiateFieldCreate);
            function initiateFieldCreate (response) {
                loadFields();
            }
        }
    }
}) ();