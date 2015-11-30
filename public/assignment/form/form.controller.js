"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController ($scope, $rootScope, FormService) {
        if ($rootScope.user != null) {
            FormService.findAllFormsForUser($rootScope.user.id, initiateAllForms);
        }

        function initiateAllForms(forms) {
            $scope.forms = forms;
        }

        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;

        function addForm() {
            FormService.createFormForUser($rootScope.user.id, $scope.newForm, initiateFormCreation);
            function initiateFormCreation(newForm) {
                $scope.forms.push(newForm);
            }
        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.forms[index].formId, initiateDelete);
            function initiateDelete(forms) {
                FormService.findAllFormsForUser($rootScope.user.id, initiateAllForms);
                function initiateAllForms(forms) {
                    $scope.forms = forms;
                }
            }
        }

        function updateForm() {

        }

        function selectForm(index) {

        }
    }
}) ();