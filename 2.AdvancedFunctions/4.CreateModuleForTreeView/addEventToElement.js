var addEventsOnLiElement = function () {
            var listElements = document.querySelectorAll("li");
            var childElements;
            var hasLiChild = false;
            for (var i = 0; i < listElements.length; i++) {
                hasLiChild = false;
                childElements = listElements[i].childNodes;
                for (var j = 0; j < childElements.length; j++) {
                    if (childElements[j].tagName.toLowerCase() == "li") {
                        childElements[j].className = "hidden";
                        hasLiChild = true;
                    }
                }
                if (hasLiChild) {
                    addHandler(listElements[i], "click", clickListElement)
                }
                else {
                    addHandler(listElements[i], "click", emptyFunction)
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

        function emptyFunction(ev) {
            ev.stopPropagation();
        }

        function clickListElement(ev) {
            var childElements = this.childNodes;
            for (var j = 0; j < childElements.length; j++) {
                if (childElements[j].tagName.toLowerCase() == "li" && childElements[j].className == "hidden") {
                    childElements[j].className = "visible";
                }
                else if (childElements[j].tagName.toLowerCase() == "li" && childElements[j].className == "visible") {
                    childElements[j].className = "hidden";
                }
            }
            ev.stopPropagation();
            changeVisibility();            
        }
       
        function changeVisibility() {
            var listElements = document.querySelectorAll("li");
            for (var i = 0; i < listElements.length; i++) {
                if (listElements[i].className == "hidden") {
                    listElements[i].style.display = "none";
                }
                else if (listElements[i].className == "visible") {
                    listElements[i].style.display = "";
                }
            }
        }