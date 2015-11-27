"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService ($http, $q) {

        var api = {
            createFormForUser : createFormForUser,
            findAllFormsForUserId : findAllFormsForUserId,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById,
            findFormByFormId : findFormByFormId,
            findAllForms : findAllForms
        };
        return api;

        function createFormForUser(userId, form) {
            console.log (form);
            var deferred = $q.defer();
            $http
                .post("/api/assignment/user/" + userId + "/form", form)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllFormsForUserId (userId) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user/" + userId + "/form")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFormById (formId) {
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/form/" + formId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateFormById(formId, newForm) {
            var deferred = $q.defer();
            $http
                .put("/api/assignment/form/" + formId, newForm)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findFormByFormId (formId) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form/" + formId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllForms () {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
}) ();