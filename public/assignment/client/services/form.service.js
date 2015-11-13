"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return service;

        function createFormForUser(userId, form, callback) {
            var newForm = {
                formId: guid(),
                userId: userId,
                form: {formName: form.formName}
            };
            forms.push(newForm);
            console.log(forms);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            var formsForUser = [];
            for (var index in forms) {
                if (forms[index].userId == userId) {
                    formsForUser.push(forms[index]);
                }
            }
            callback(formsForUser);
        }

        function deleteFormById(formId, callback) {
            for (var index in forms) {
                if (forms[index].formId == formId) {
                    forms.splice(index, 1);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (var index in forms) {
                if (forms[index].formId == formId) {
                    forms[index].form = newForm;
                    break;
                }
            }
            callback(forms[index]);
        }
    }
}) ();