var forms = require("./form.mock.json");
//var q = require ("q");
var uuid = require('node-uuid');

module.exports = function (mongoose, db) {
/*	var FormSchema = require ("./form.schema.js") (mongoose);
	var FormModel = mongoose.model ("FormModel", FormSchema); */
	var api = {
		createForm : createForm,
		findAllForms : findAllForms,
		findFormById : findFormById,
		updateForm : updateForm,
		deleteFormById : deleteFormById,
		findFormByTitle : findFormByTitle,
		findAllFormsForUserId : findAllFormsForUserId,
		createFormForUserId : createFormForUserId,
		findAllFieldsForFormId : findAllFieldsForFormId,
		findFieldByFieldAndFormId : findFieldByFieldAndFormId,
		deleteFieldByFieldAndFormId : deleteFieldByFieldAndFormId,
		createNewFieldForFormId : createNewFieldForFormId,
		updateFieldByFieldAndFormId : updateFieldByFieldAndFormId
	};
	return api;



	function createForm (newform) {
		var form = {
			id : uuid.v1(),
			title : newform.title,
			userId : newform.userId,
			fields : newform.fields
		};
		forms.push(form);
		return forms;
	}

	function findAllForms() {
		return forms;
	}

	function findFormById (id) {
		var toReturn = null;
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == id) {
				toReturn = forms[i];
				break;
			}
		}
		return toReturn;
	}

	function updateForm (id, updatedForm) {
		for (var index = 0; index < forms.length; index++) {
			if (forms[index].id == id) {
				forms[index].title = updatedForm.title;
				forms[index].userId = updatedForm.userId;
				forms[index].fields = updatedForm.fields;
				break;
			}
		}
		return forms;
	}

	function deleteFormById (id) {
		for (var index = 0; index < forms.length; index++) {
			if (forms[index].id == id) {
				forms.splice(index, 1);
				break;
			}
		}
		return forms;
	}

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

	function findAllFormsForUserId (userId) {
		var formsForUser = [];
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].userId == userId) {
				formsForUser.push(forms[i]);
			}
		}
		return formsForUser;
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

	function findAllFieldsForFormId (formId) {
		var fieldsToReturn = [];
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == formId) {
				fieldsToReturn = forms[i].fields;
				break;
			}
		}
		console.log(fieldsToReturn);
		return fieldsToReturn;
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

	function deleteFieldByFieldAndFormId (formId, fieldId) {
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == formId) {
				var fields = forms[i].fields;
				for (var j = 0; j < fields.length; j++) {
					if (fields[j].id == fieldId) {
						forms[i].fields.splice(j, 1);
						break;
					}
				}
			}
		}
		return forms;
	}

	function createNewFieldForFormId (formId, newField) {
		newField.id = uuid.v1();
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == formId) {
				forms[i].fields.push(newField);
				break;
			}
		}
		return forms;
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
	}
};