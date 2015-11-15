"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController (FieldService, FormService, $routeParams, $rootScope) {
        var model = this;
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;

        FormService.findFormByFormId(formId).then(initiateFindFormById);

        function initiateFindFormById (response) {
            console.log("reached here");
            model.form = response;
            console.log(model.form);
        }

        console.log(userId + " " +formId);
        FieldService.getFieldsForForm(formId).then(initiateGetFieldsForForm);

        function initiateGetFieldsForForm (response) {
            model.fields = response;
            console.log(response);
        }
    }
}) ();