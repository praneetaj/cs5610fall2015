//var forms = require("./form.mock.json");
var q = require ("q");

module.exports = function (mongoose, db) {
	var FormSchema = require ("./form.schema.js") (mongoose);
	var FormModel = mongoose.model ("FormModel", FormSchema);
	var api = {
		createForm : createForm,
		findAllForms : findAllForms,
		findAllFormsForUserId : findAllFormsForUserId,
		deleteFormById : deleteFormById,
		findFormByFormId : findFormByFormId,
		updateFormByFormId : updateFormByFormId,
		findAllFieldsForFormId : findAllFieldsForFormId,
		createNewFieldForFormId : createNewFieldForFormId,
		deleteFieldByFieldAndFormId : deleteFieldByFieldAndFormId
/*
		,

		findFormByTitle : findFormByTitle,
		,
		createFormForUserId : createFormForUserId,

		findFieldByFieldAndFormId : findFieldByFieldAndFormId,
		,
		,
		updateFieldByFieldAndFormId : updateFieldByFieldAndFormId */
	};
	return api;


	function createForm (newform) {
		var deferred = q.defer ();

		FormModel.create (newform, function (err, form) {
			if (err)
				deferred.reject(err);
			else
				deferred.resolve (form);
		});
		return deferred.promise;
	}

	function findAllForms() {
		var deferred = q.defer ();

		FormModel.find (function (err, forms) {
			if (err)
				deferred.reject(err);
			else
				deferred.resolve (forms);
		});
		return deferred.promise;
	}

	function findAllFormsForUserId (userId) {
		var deferred = q.defer ();

		FormModel.find ({"userId" : userId}, function (err, forms) {
			if (err)
				deferred.reject(err);
			else
				deferred.resolve(forms);
		});
		return deferred.promise;
	}

	function deleteFormById (id) {
		console.log ("Model " + id);
		var deferred = q.defer ();

		FormModel.remove ({"_id" : id}, function (err, status) {
			if (err)
				deferred.reject(err);
			else
				deferred.resolve(status);
		});
		return deferred.promise;
	}

	function findFormByFormId (id) {
		var deferred = q.defer ();

		FormModel.findById (id, function (err, form) {
			if (err)
				deferred.reject(err);
			else
				deferred.resolve(form);
		});
		return deferred.promise;
	}

	function updateFormByFormId (id, updatedForm) {
		var deferred = q.defer ();

		//updatedUser.delete ("_id");

		FormModel.update ({"_id" : id}, {$set: updatedForm}, function (err, form) {
			if (err)
				deferred.reject (err);
			else
				deferred.resolve (form);
		});
		return deferred.promise;
	}

	function findAllFieldsForFormId (formId) {
		var deferred = q.defer ();

		FormModel.findById (formId, {"fields" : 1, "_id" : 0}, function (err, fields) {
			if (err)
				deferred.reject (err);
			else
				deferred.resolve (fields);
		});
		return deferred.promise;
	}

	function createNewFieldForFormId (formId, newField) {
		var deferred = q.defer ();

		FormModel.findById (formId, function (err, form) {
			if (err)
				deferred.reject (err);
			else {
				form.fields.push (newField);
				form.save (function (err, form) {
					deferred.resolve(form);
				});
			}
		});
		return deferred.promise;
	}

	function deleteFieldByFieldAndFormId (formId, fieldIndex) {
		var deferred = q.defer ();

		FormModel.findById (formId, function (err, form) {
			if (err)
				deferred.reject (err);
			else {
				form.fields.splice (fieldIndex, 1);
				form.save (function (err, form) {
					deferred.resolve(form);
				});
			}
		});
		return deferred.promise;
	}


	/*
	    function findFormByTitle (title) {
            var toReturn = null;
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].title == title) {
                    toReturn = forms[i];
                    break;
                }
            }
            return toReturn;
        }



        function createFormForUserId (userId, newform) {
            var form = {
                id : uuid.v1(),
                title : newform.title,
                userId : userId,
                fields : newform.fields
            };
            forms.push(form);
            return findAllFormsForUserId(userId);
        }



        function findFieldByFieldAndFormId (formId, fieldId) {
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].id == formId) {
                    var fields = forms[i].fields;
                    for (var j = 0; j < fields.length; j++) {
                        if (fields[j].id == fieldId)
                            return fields[j];
                    }
                }
            }
            return null;
        }





        function updateFieldByFieldAndFormId (formId, fieldId, updatedField) {
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].id == formId) {
                    var fields = forms[i].fields;
                    for (var j = 0; j < fields.length; j++) {
                        if (fields[j].id == fieldId) {
                            forms[i].fields[j].id = fieldId;
                            forms[i].fields[j].label = updatedField.label;
                            forms[i].fields[j].type = updatedField.type;
                            forms[i].fields[j].placeholder = updatedField.placeholder;
                            break;
                        }
                    }
                }
            }
            return forms;
        }  */
};