module.exports = function (app, model) {
    app.post("/api/experiments/mongo/pe/page", addPage);
    app.get("/api/experiments/mongo/pe/page", getAllPages);

    function addPage (req, res) {
        var page = req.body;
        model
            .addPage(page)
            .then(function (pages){
                res.json(pages);
            });
    }

    function getAllPages (req, res) {
        model
            .getAllPages()
            .then(function (pages) {
                res.json(pages);
            });
    }
};