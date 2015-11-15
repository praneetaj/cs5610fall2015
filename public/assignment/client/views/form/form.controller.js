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

        if ($rootScope.user != null) {
            FormService.findAllFormsForUser($rootScope.user.id).then(initiateGetAllFormsForUser);

            function initiateGetAllFormsForUser (response) {
                model.forms = response;
            }
        }

        function addForm () {
            var newForm = {
                id : null,
                title : model.newForm.title,
                userId : $rootScope.user.id,
                fields : []
            };
            FormService.createFormForUser($rootScope.user.id, newForm).then(initiateFormCreation);

            function initiateFormCreation(response) {
                model.forms = response;
                model.newForm.title = "";
            }
        }

        function deleteForm (formId) {
            FormService.deleteFormById(formId).then(initiateDelete);

            function initiateDelete (response) {
                FormService.findAllFormsForUser($rootScope.user.id).then(function (allFormsForUser) {
                    model.forms = allFormsForUser;
                });
            }
        }

        function updateForm() {
            FormService.updateFormById(model.newForm.id, model.newForm).then(initiateUpdate);

            function initiateUpdate (response) {
                FormService.findAllFormsForUser($rootScope.user.id).then(function (allFormsForUser) {
                    model.forms = allFormsForUser;
                    model.newForm = null;
                });
            }
        }

        function selectForm(formId) {
            FormService.findFormByFormId(formId).then(initiateFindFormById);

            function initiateFindFormById (response) {
                model.newForm = response;
            }
        }
    }
}) ();