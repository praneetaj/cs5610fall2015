// You will have the CRUD operations on user here

var forms = require("./form.mock.json");

module.exports = function (app) {
	var api = {
		createForm : createForm,
		findAllForms : findAllForms,
		findFormById : findFormById,
		updateForm : updateForm,
		deleteForm : deleteForm,
		findFormByTitle : findFormByTitle
	};
	return api;

	function createForm (form) {
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

	function deleteForm (id) {
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
};