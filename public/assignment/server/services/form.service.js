module.exports = function(app, model) {
    app.post("/api/assignment/form", createForm);
    app.get("/api/assignment/form", findAllForms);
    app.get("/api/assignment/form/:formId", findFormByFormId);
    app.put("/api/assignment/form/:formId", updateFormByFormId);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.get("/api/assignment/user/:userId/form", findAllFormsForUserId);
    app.post("/api/assignment/user/:userId/form", createFormForUserId);

    function createForm (req, res) {
        model
            .createForm (req.body)
            .then (function (form) {
                res.json (form);
            });
    }

    function findAllForms (req, res) {
        model
            .findAllForms ()
            .then (function (form) {
            res.json (form);
        });
    }

    function findAllFormsForUserId (req, res) {
        model
            .findAllFormsForUserId (req.params.userId)
            .then (function (forms) {
                console.log(forms);
                res.json (forms);
            });
    }

    function createFormForUserId (req, res) {
        model
            .createForm (req.body)
            .then (function (form) {
                console.log (form);
                res.json (form);
            });
    }

    function deleteFormById (req, res) {
        model
            .deleteFormById (req.params.formId)
            .then (function (status) {
                res.json (status);
        });
    }

    function findFormByFormId (req, res) {
        model
            .findFormByFormId (req.params.formId)
            .then (function (form) {
                res.json (form);
            });
    }

    function updateFormByFormId (req, res) {
        var formId = req.params.formId;
        var updatedForm = req.body;
        model
            .updateFormByFormId (req.params.formId, req.body)
            .then (function (form) {
                res.json (form);
            });
    }
};