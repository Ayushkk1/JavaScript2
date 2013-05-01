(function () {
    specialConsole = new createJsSpecialConsole("#console");
    function createJsSpecialConsole(selector) {
        var console = document.querySelector(selector);
        console.className = "specialconsole";
        var textArea = document.createElement("p");
        console.appendChild(textArea);
        var that = this;
        function readText(selector) {
            var element = document.querySelector(selector);
            if (element.innerHTML) {
                return element.innerHTML;
            }
            else {
                return element.value;
            }
        }

        function writeText(textArr) {
            var str = stringFormat(textArr);
            var span = document.createElement("span");
            span.innerHTML = str;
            textArea.appendChild(span);
        }

        function write() {
            writeText(arguments);
        }

        function writeLine() {
            writeText(arguments);
            textArea.appendChild(document.createElement("br"));
        }

        function stringFormat(textArr) {
            var i;
            var result = textArr[0];
            for (i = 0; i < textArr.length - 1; i++) {
                var pattern = "\\{" + i + "\\}";
                var reg = new RegExp(pattern, "g");
                result = result.replace(reg, textArr[i + 1]);
            }
            if (typeof (result) === 'undefined') {
                result = "";
            }
            return result.toString();
        }

        return {
            read: readText,
            write: write,
            writeLine: writeLine,
            writeError: writeLine,
            writeWarning: writeLine
        }
    }
})();