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
            FormService.findAllForms().then(function (response) {
                console.log (response);
            });
            if ($rootScope.user != null) {
                console.log ($rootScope.user._id);
                FormService.findAllFormsForUserId($rootScope.user._id).then(initiateGetAllFormsForUser);
            }
        }

        function initiateGetAllFormsForUser (forms) {
            model.forms = forms;
            console.log (forms);
        }

        init();

        function addForm () {
            var newForm = {
                title : model.newForm.title,
                userId : $rootScope.user._id,
                fields : []
            };
            console.log (newForm);
            FormService.createFormForUser($rootScope.user._id, newForm).then(initiateFormCreation);

            function initiateFormCreation (response) {
                init();
                model.newForm.title = "";
            }
        }

        function deleteForm (formId) {
            console.log (formId);
            FormService.deleteFormById(formId).then(function () {
                init();
            });
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
                init ();
            }
        }
    }
}) ();