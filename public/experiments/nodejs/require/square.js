module.exports = function (name, width, height) {
    this.name = name;
    this.width = width;
    this.height = height;

    var api = {
        getName : getName,
        getWidth : getWidth,
        setName : setName,
        setWidth : setWidth
    };
    return api;

    function getName() {
        return this.name;
    }

    function getWidth() {
        return this.width;
    }

    function setName(name) {
        this.name = name;
    }

    function setWidth(width) {
        this.width = width;
    }
}
