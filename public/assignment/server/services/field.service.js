var model = require("../models/form.model.js")();

module.exports = function(app) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldAndFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldAndFormId);
    app.post("/api/assignment/form/:formId/field", createNewFieldForFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldAndFormId);

    function findAllFieldsForFormId (req, res) {
        var formId = req.params.formId;
        res.json(model.findAllFieldsForFormId(formId));
    }

    function findFieldByFieldAndFormId (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.findFieldByFieldAndFormId(formId, fieldId));
    }

    function deleteFieldByFieldAndFormId (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.deleteFieldByFieldAndFormId(formId, fieldId));
    }

    function createNewFieldForFormId (req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        res.json(model.createNewFieldForFormId(formId, newField));
    }

    function updateFieldByFieldAndFormId (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;
        res.json(model.updateFieldByFieldAndFormId(formId, fieldId, updatedField));
    }
};