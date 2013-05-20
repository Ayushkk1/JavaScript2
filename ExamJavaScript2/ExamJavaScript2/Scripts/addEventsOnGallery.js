var addEventsOnGallery = function (element, objType) {
    
        if (objType === "image") {
            addHandler(element, "click", clickImageElement)
        }
        else if (objType === "album") {
            addHandler(element, "click", clickAlbumElement)
            var childs = element.childNodes;
            var i;
            for (i = 0; i < childs.length; i++) {
                if (childs[i].tagName.toLowerCase() == "button") {
                    addHandler(childs[i],"click", clickSortButton)
                }
            }
        }

    changeVisibility();
};

function addHandler(element, eventType, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventType, eventHandler, false);
    } else {
        element.attachEvent("on" + eventType, eventHandler);
    }
}

function clickImageElement(ev) {
    if (!ev) {
        ev = window.event;
    }
    var parentElem = document.getElementById("image-preview");
    var childElem = this.cloneNode(true);
    childElem.style.width = parseInt(childElem.style.width) * 2 + "px";
    childElem.style.height = parseInt(childElem.style.height) * 2 + "px";
    if (parentElem.firstChild) {
        parentElem.removeChild(parentElem.firstChild);
    }
    parentElem.appendChild(childElem);
    ev.stopPropagation();
}

function clickAlbumElement(ev) {
    if (!ev) {
        ev = window.event;
    }
    var childElements = this.childNodes;
    for (var j = 0; j < childElements.length; j++) {
        if (childElements[j].tagName.toLowerCase() == "ul" && childElements[j].className == "hidden") {
            childElements[j].className = "visible";
        }
        else if (childElements[j].tagName.toLowerCase() == "ul" && childElements[j].className == "visible") {
            childElements[j].className = "hidden";
        }
    }
    ev.stopPropagation();
    changeVisibility();
}

function clickSortButton(ev) {
    if (!ev) {
        ev = window.event;
    }    
    if (this.className == "sortAscending") {
        var childs = this.childNodes;
        for (var i = 0; i < length; i++) {

        }
    }

    ev.stopPropagation();
}

function changeVisibility() {
    var listElements = document.querySelectorAll("ul");
    for (var i = 0; i < listElements.length; i++) {
        if (listElements[i].className == "hidden") {
            listElements[i].style.display = "none";
        }
        else if (listElements[i].className == "visible") {
            listElements[i].style.display = "";
        }
    }
}