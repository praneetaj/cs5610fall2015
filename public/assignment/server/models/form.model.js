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
		findFormByTitle : findFormByTitle,
		findAllFieldsForFormId : findAllFieldsForFormId,
		createNewFieldForFormId : createNewFieldForFormId,
		deleteFieldByFieldAndFormId : deleteFieldByFieldAndFormId,
		updateFieldByFormIdAndFieldIndex : updateFieldByFormIdAndFieldIndex,
		findFieldByFormIdAndFieldIndex : findFieldByFormIdAndFieldIndex
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

		delete updatedForm["_id"];

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

	function findFieldByFormIdAndFieldIndex (formId, fieldIndex) {
		var deferred = q.defer ();

		FormModel.findById (formId, function (err, form) {
			if (err)
				deferred.reject (err);
			else {
				deferred.resolve(form.fields[fieldIndex]);
			}
		});
		return deferred.promise;
	}

	function updateFieldByFormIdAndFieldIndex (formId, fieldIndex, field) {
		var deferred = q.defer ();

		FormModel.findById (formId, function (err, form) {
			if (err) {
				deferred.reject (err);
			} else {
				form.fields[fieldIndex].label = field.label;
				form.fields[fieldIndex].fieldType = field.fieldType;
				form.fields[fieldIndex].options = field.options;
				form.fields[fieldIndex].placeholder = field.placeholder;
				form.save(function (err, form) {
					if (err) {
						deferred.reject(err);
					} else {
						deferred.resolve(form);
					}
				});
			}
		});

		return deferred.promise;
	}

	function findFormByTitle (title) {
		var deferred = q.defer ();

		FormModel.find ({"title" : title}, function (err, forms) {
			if (err)
				deferred.reject(err);
			else
				deferred.resolve(forms);
		});
		return deferred.promise;
	}
};