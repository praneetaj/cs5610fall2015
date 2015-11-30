module.exports = function(app, model) {
    app.delete("/api/assignment/form/:formId/field/:fieldIndex", deleteFieldByFormIdAndFieldIndex);
    app.get("/api/assignment/form/:formId/field", findAllFieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldIndex", findFieldByFormIdAndFieldIndex);
    app.post("/api/assignment/form/:formId/field", createNewFieldForFormId);
    app.put("/api/assignment/form/:formId/field/:fieldIndex", updateFieldByFormIdAndFieldIndex);

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

    function findFieldByFormIdAndFieldIndex (req, res) {
        model
            .findFieldByFormIdAndFieldIndex (req.params.formId, req.params.fieldIndex)
            .then (function (field) {
                res.json (field);
            });
    }

    function updateFieldByFormIdAndFieldIndex (req, res) {
        model
            .updateFieldByFormIdAndFieldIndex (req.params.formId, req.params.fieldIndex, req.body)
            .then (function (field) {
                res.json (field);
            });
    }
};