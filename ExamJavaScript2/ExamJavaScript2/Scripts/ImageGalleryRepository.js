var ImageGalleryRepository = (function () {
    function save(name, dataArray) {
        localStorage.setObject(name, dataArray);
    }
    function load(name) {
        var obj = localStorage.getObject(name);
        return obj;
    }
    return {
        save: save,
        load: load
    }
})();