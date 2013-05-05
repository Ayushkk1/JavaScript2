var controls = (function () {

    function createTreeView(str) {
        var strArray;
        var element;
        if (str.indexOf('.') != -1) {
            strArray = str.split('.');
            element = document.createElement(strArray[0]);
            element.className = strArray[1];
        }
        else if (str.indexOf('#') != -1) {
            strArray = str.split('#');
            element = document.createElement(strArray[0]);
            element.id = strArray[1];
        }        
        document.body.appendChild(element);
        return  new createSubobject(element);
    }
    var createSubobject = function (element) {
        function addNode() {
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
            return new createSubobject(li);
        }
        function addContent(str) {
            linkElement = document.createElement("a");
            linkElement.innerHTML = str;
            linkElement.className = "list-content";
            element.appendChild(linkElement);
        }
        return {
            addNode: addNode,
            content: addContent
        }
    }

    return {
        treeView: createTreeView
    }
})();