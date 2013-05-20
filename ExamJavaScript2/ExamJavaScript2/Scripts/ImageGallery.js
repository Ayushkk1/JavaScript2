var controls = (function () {

    function ImageGallery(selector) {
        var items = [];
        var element = document.querySelector(selector);
        this.container = document.createElement("ul");
        element.appendChild(this.container);

        this.addImage = function (title, url) {
            var parentElem = this.container;
            title = escapeSpecialChar(title);
            var newItem = new ImageItem(title, url, parentElem);
            items.push(newItem);
        }

        this.addAlbum = function (title) {
            var parentElem = this.container;
            title = escapeSpecialChar(title);
            var newItem = new AlbumItem(title, parentElem);
            items.push(newItem);
            return newItem;
        }

        this.getImageGalleryData = function () {
            var DataItems = [];
            for (var i = 0; i < items.length; i += 1) {
                DataItems.push(items[i].getImageGalleryData());
            }
            return DataItems;
        }

    }

    function ImageItem(title, url, parentElem) {
        var li = document.createElement("li");
        parentElem.appendChild(li);
        var linkElement = document.createElement("a");
        linkElement.innerHTML = title;
        var image = document.createElement("img");
        image.src = url;
        image.setAttribute("alt", title);
        image.style.width = "50px";
        image.style.height = "50px";
        li.appendChild(linkElement);
        li.appendChild(image);
        addEventsOnGallery(image, "image");

        this.getImageGalleryData = function () {
            var thisItem = {
                title: title,
                imageSource: url
            };
            return thisItem;
        }
    }

    function AlbumItem(title, parentElem) {
        var li = document.createElement("li");
        parentElem.appendChild(li);
        var linkElement = document.createElement("a");
        linkElement.innerHTML = title;
        var button = document.createElement("button");
        button.className = "sortAscending";
        button.innerHTML = "Sort";
        var ul = document.createElement("ul");
        ul.className = "hidden";
        var items = [];
        this.container = ul;
        li.appendChild(linkElement);
        li.appendChild(button);
        li.appendChild(ul);
        addEventsOnGallery(li, "album");

        this.addImage = function (title, url) {
            var parentElem = this.container;
            var newItem = new ImageItem(title, url, parentElem);
            items.push(newItem);
        }

        this.addAlbum = function (title) {
            var parentElem = this.container;
            var newItem = new AlbumItem(title, parentElem);
            items.push(newItem);
            return newItem;
        }

        this.getImageGalleryData = function () {
            var thisItem = {
                title: title
            };
            if (items.length > 0) {
                var DataItems = [];
                for (var i = 0; i < items.length; i += 1) {
                    var subItem = items[i].getImageGalleryData();
                    DataItems.push(subItem);
                }
                thisItem.items = DataItems;
            }
            return thisItem;
        }
    }

    function addItem(newGallery, dataItem) {
        var imgItem;
        if (dataItem.imageSource) {
            imgItem = newGallery.addImage(dataItem.title, dataItem.imageSource);
        }
        else {
            imgItem = newGallery.addAlbum(dataItem.title);
        }
        if (dataItem.items) {
            for (var i = 0; i < dataItem.items.length; i++) {
                addItem(imgItem, dataItem.items[i]);
            }
        }
    }
    function escapeSpecialChar(str) {
        str = str.replace(/&/g, "&amp;");
        str = str.replace(/"/g, "&quot;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");
        return str;
    }

    return {
        getImageGallery: function (selector) {
            return new ImageGallery(selector);
        },
        buildImageGallery: function (selector, data) {
            var imageGallery = this.getImageGallery(selector);

            if (data) {
                for (var i = 0; i < data.length; i++) {
                    addItem(imageGallery, data[i]);
                }
            }

            addEventsOnGallery();
            return imageGallery;
        }
    }
})();