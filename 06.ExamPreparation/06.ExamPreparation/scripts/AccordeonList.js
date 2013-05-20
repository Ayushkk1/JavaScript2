var controls = (function () {

    function getAccordion(str) {
        var element;
        if (str.indexOf('.') != -1) {
            element = document.querySelectorAll(str)[0];
        }
        else if (str.indexOf('#') != -1) {
            element = document.querySelector(str);
        }
        document.body.appendChild(element);
        return new createSubobject(element);
    }
    var createSubobject = function (element) {
        function addNode(str) {
            var children = element.childNodes;
            var isUlChild = false;
            for (var i = 0; i < children.length; i++) {
                if (children[i].tagName.toLowerCase() == "ul") {
                    isUlChild = true;
                    ul = element.children[i];
                }
            }
            if (children.length == 0 || !isUlChild) {
                var ul = document.createElement("ul");
                element.appendChild(ul);
            }
            li = document.createElement("li");
            ul.appendChild(li);
            linkElement = document.createElement("a");
            linkElement.innerHTML = str;
            linkElement.className = "list-content";
            li.appendChild(linkElement);
            return new createSubobject(li);
        }
        function addContent(str) {
            linkElement = document.createElement("a");
            linkElement.innerHTML = str;
            linkElement.className = "list-content";
            element.appendChild(linkElement);
        }
        //function serialize() {
        //    return this;
        //}
        return {
            add: addNode,
            render: addEventsOnLiElement,
            //serialize: serialize
        }
    }

    return {
        getAccordion: getAccordion
    }
})();