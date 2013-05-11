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
				img.src = "/images/openBucket.png";
			});

			attachEventHandler(bucket, "drop", function (ev) {
				ev.preventDefault();
				var data = ev.dataTransfer.getData("garbagedTrash");
				//ev.target.appendChild(document.getElementById(data));
				document.body.removeChild(document.getElementById(data));
				img.src = "/images/closeBucket.png";
			});

			attachEventHandler(bucket, "dragleave", function () {
				img.src = "/images/closeBucket.png";
			});

		};

		function generateRandomDivs() {
			var dfrag = document.createDocumentFragment();
			var divsNumber = generateRandomNumber(15, 20);
			var i = 0;
			for (i = 0; i < divsNumber; i++) {
				var div = document.createElement("div");
				div.className = "Trash";
				div.draggable = true;
				div.id = generateRandomNumber(1, 100000);
				var img = document.createElement("img");
				img.style.width = "45px";
				img.style.height = "45px";
				img.src = "/images/Trash.png";
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
		});
	
})();