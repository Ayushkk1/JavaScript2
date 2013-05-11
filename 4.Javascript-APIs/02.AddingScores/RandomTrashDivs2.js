(function () {
    var bucket = (function () {
        function altertStyleToDiv(div) {

            div.style.width = "45px";
            div.style.height = "45px";
            div.style.position = 'absolute';
            div.style.left = generateRandomNumber(250, screen.width - parseInt(div.style.width) - 50) + "px";
            div.style.top = generateRandomNumber(0, screen.height - parseInt(div.style.height) - 250) + "px";

        }

        function generateRandomNumber(start, end) {
            var number = Math.floor(Math.random() * (end - start)) + start;
            return number;
        }

        function addEventsToBucket() {
            var bucket = document.getElementById("bucket");
            var img = bucket.getElementsByTagName("img")[0];
            attachEventHandler(bucket, "dragover", function (ev) {
                ev.preventDefault();
                img.src = "images/openBucket.png";
            });

            attachEventHandler(bucket, "drop", function (ev) {
                ev.preventDefault();
                var data = ev.dataTransfer.getData("garbagedTrash");
                //ev.target.appendChild(document.getElementById(data));
                document.body.removeChild(document.getElementById(data));
                img.src = "images/closeBucket.png";
            });

            attachEventHandler(bucket, "dragleave", function () {
                img.src = "images/closeBucket.png";
            });

        };

        function generateRandomDivs() {
            var dfrag = document.createDocumentFragment();
            var divsNumber = generateRandomNumber(5, 6);
            var i = 0;
            for (i = 0; i < divsNumber; i++) {
                var div = document.createElement("div");
                div.className = "Trash";
                div.draggable = true;
                div.id = generateRandomNumber(1, 100000);
                var img = document.createElement("img");
                img.style.width = "45px";
                img.style.height = "45px";
                img.src = "images/Trash.png";
                img.alt = "Trash";
                div.appendChild(img);
                dfrag.appendChild(div);
                altertStyleToDiv(div);
                attachEventHandler(div, "dragstart", function (ev) {
                    ev.dataTransfer.setData("garbagedTrash", ev.target.parentNode.id);
                });
            }
            document.body.appendChild(dfrag);

        };
        return {
            generateRandomDivs: generateRandomDivs,
            addEventsToBucket: addEventsToBucket
        }
    })();

    var scores = (function () {
        var trashes = document.getElementsByClassName("Trash");
        var gamingTime;
        var totalSeconds = 0;
        var timer;

        function init() {
            generateDisplayButton();
            checkTrashes();
            generateGetNameForm();
        }
        function generateDisplayButton() {
            var button = document.createElement("button");
            button.id = "displayScores";
            button.innerHTML = "Display Scoreboard";
            button.style.position = "absolute";
            button.style.left = "200px";
            button.style.top = "20px";
            document.body.appendChild(button);
            attachEventHandler(button, "click", displayScoreBoard);
            timer = document.createElement("div");
            timer.id = "timer";
            timer.innerHTML = "0";
            timer.style.position = "absolute";
            timer.style.left = "400px";
            timer.style.top = "20px";
            document.body.appendChild(timer);
        };

        function displayScoreBoard() {
            if (localStorage.getObject('TrashBucketScores')) {
                if (!document.getElementById("scoreBoard")) {
                    var div = document.createElement("div");
                    document.body.appendChild(div);
                    div.id = "scoreBoard";
                    div.style.position = "absolute";
                    div.style.left = "200px";
                    div.style.top = "80px";
                }
                var currentStorage = localStorage.getObject('TrashBucketScores');
                div.innerHTML = "";
                for (var i = 0; i < currentStorage.length; i++) {
                    div.innerHTML += "\
								<div>"+ currentStorage[i]["id"] + "  " + currentStorage[i]["userName"] + "</div>";
                }
            }
            else {
                alert("There is no scores data yet.");
            }
        };

        function checkTrashes() {
            var bucket = document.getElementById("bucket");

            attachEventHandler(bucket, "drop", function (ev) {
                ev.preventDefault();
                var data = ev.dataTransfer.getData("garbagedTrash");
                for (var i = 0; i < trashes.length; i++) {
                    if (trashes[i].id == data) {
                        trashes.slice(i, 1);
                        i--;
                    }
                }
                if (gamingTime === undefined) {
                    gamingTime = setInterval(function () {
                        ++totalSeconds;
                        timer.innerHTML = totalSeconds;
                    },1);
                }
                if (trashes.length == 0) {
                    var element = document.getElementById("displayGetName");
                    element.style.display = "inline";
                    clearInterval(gamingTime);
                }
            });
        }

        function generateGetNameForm() {
            var div = document.createElement("div");
            div.id = "displayGetName";
            div.style.position = "absolute";
            div.style.left = "200px";
            div.style.top = "200px";
            var input = document.createElement("input");
            input.type = "text";
            input.id = "UserName";
            div.appendChild(input);
            var button = document.createElement("button");
            button.id = "btnGetName";
            button.innerHTML = "Enter your name";
            div.appendChild(button);
            attachEventHandler(button, "click", function () {
                var element = document.getElementById("UserName")
                var userName = element.value;
                element = document.getElementById("displayGetName");
                element.style.display = "none";
                setScoreRecord(userName);
            });
            div.style.display = "none";
            document.body.appendChild(div);            
        }

        function setScoreRecord(userName) {
            if (!localStorage.getObject('TrashBucketScores')) {
                localStorage.setObject('TrashBucketScores', []);
            }
            if (userName === "") {
                userName = "anonymous user";
            }
            var currentRecords = localStorage.getObject('TrashBucketScores');
            currentRecords.push({ id: totalSeconds, "userName": userName });
            if (currentRecords.length > 1) {
                currentRecords.sort(function (a, b) {
                    var x = a["id"];
                    var y = b["id"];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            }
            if (currentRecords.length === 6) {
                currentRecords.pop();
            }
            localStorage.setObject('TrashBucketScores', currentRecords);
        }
        
        return {
            init: init
        }

    })();

    function attachEventHandler(element, eventType, eventHandler) {
        if (document.addEventListener) {
            element.addEventListener(eventType, eventHandler, false);
        }
        else if (document.attachEvent) {
            element.attachEvent("on" + eventType, eventHandler);
        }
        else {
            element["on" + eventType] = eventHandler;
        }
    }

    attachEventHandler(window, "load", function () {
        bucket.generateRandomDivs();
        bucket.addEventsToBucket();
        scores.init();
    });

})();