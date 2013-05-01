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
        ul = document.createElement("ul");
        element.appendChild(ul);
        document.body.appendChild(element);
        return  new createSubobject(ul);
    }
    var createSubobject = function (element) {
        function addNode() {
            li = document.createElement("li");
            element.appendChild(li);
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