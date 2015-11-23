var q = require("q");

module.exports = function (mongoose, db) {
    var PageSchema = mongoose.Schema({
        "label" : String,
        "created" : {type: Date, default: Date.now}
    }, {collection: "page"});

    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        addPage : addPage,
        getAllPages : getAllPages
    };
    return api;

    function addPage (page) {
        var deferred = q.defer();
        PageModel.create(page, function (err, doc){
            PageModel.find (function (err, pages){
                deferred.resolve(pages);
            })
        });
        return deferred.promise;
    }

    function getAllPages () {
        var deferred = q.defer();
        PageModel.find (function (err, pages){
            deferred.resolve(pages);
        });
        return deferred.promise;
    }
};