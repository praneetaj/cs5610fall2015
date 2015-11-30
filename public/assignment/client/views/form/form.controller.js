"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController ($scope, $rootScope, FormService) {

        var model = this;
        model.user = $rootScope.user;
        model.addForm = addForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;
        model.updateForm = updateForm;

        function init () {
            if ($rootScope.user != null) {
                FormService.findAllFormsForUserId($rootScope.user._id).then(initiateGetAllFormsForUser);
            }
        }

        function initiateGetAllFormsForUser (forms) {
            model.forms = forms;
        }

        init();

        function addForm () {
            var newForm = {
                title : model.newForm.title,
                userId : $rootScope.user._id,
                fields : []
            };
            FormService.createFormForUser($rootScope.user._id, newForm).then(initiateFormCreation);

            function initiateFormCreation (response) {
                init();
                model.newForm.title = "";
            }
        }

        function deleteForm (formId) {
            FormService.deleteFormById(formId).then(init());
        }

        function updateForm() {
            FormService.updateFormById(model.newForm._id, model.newForm).then(initiateUpdate);

            function initiateUpdate (response) {
                model.newForm.title = "";
                init ();
            }
        }

        function selectForm(formId) {
            FormService.findFormByFormId(formId).then(initiateFindFormById);

            function initiateFindFormById (response) {
                model.newForm = response;
                init ();
            }
        }
    }
}) ();