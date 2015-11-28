"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService ($http, $q) {

        var api = {
            findAllFieldsForFormId : findAllFieldsForFormId,
            createFieldForForm : createFieldForForm,
            deleteFieldFromForm : deleteFieldFromForm,
            getFieldForForm : getFieldForForm,
            updateField : updateField
        };
        return api;

        function findAllFieldsForFormId (formId) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form/" + formId + "/field")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createFieldForForm (formId, newField) {
            console.log(newField);
            var deferred = $q.defer();
            $http
                .post("/api/assignment/form/" + formId + "/field", newField)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFieldFromForm (formId, fieldIndex) {
            console.log(formId + " " + fieldIndex);
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/form/" + formId + "/field/" + fieldIndex)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFieldForForm (formId, fieldId) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateField (formId, fieldId, field) {
            var deferred = $q.defer();
            $http
                .put("/api/assignment/form/" + formId + "/field/" + fieldId, field)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
}) ();