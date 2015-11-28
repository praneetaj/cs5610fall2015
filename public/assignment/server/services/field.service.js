module.exports = function(app, model) {
    app.delete("/api/assignment/form/:formId/field/:fieldIndex", deleteFieldByFormIdAndFieldIndex);
    app.get("/api/assignment/form/:formId/field", findAllFieldsForFormId);
//    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldAndFormId);
    app.post("/api/assignment/form/:formId/field", createNewFieldForFormId);
//    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldAndFormId);

    function findAllFieldsForFormId (req, res) {
        model
            .findAllFieldsForFormId (req.params.formId)
            .then(function (fields) {
                res.json (fields);
            });
    }

    function createNewFieldForFormId (req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        model
            .createNewFieldForFormId (formId, newField)
            .then (function (field) {
                res.json (field);
            });
    }

    function deleteFieldByFormIdAndFieldIndex (req, res) {
        model
            .deleteFieldByFieldAndFormId (req.params.formId, req.params.fieldIndex)
            .then (function (field) {
                res.json (field);
            });
    }

    function findFieldByFieldAndFormId (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.findFieldByFieldAndFormId(formId, fieldId));
    }

    function updateFieldByFieldAndFormId (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;
        res.json(model.updateFieldByFieldAndFormId(formId, fieldId, updatedField));
    }
};