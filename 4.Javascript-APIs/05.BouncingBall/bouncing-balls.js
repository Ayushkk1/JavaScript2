var bouncingBalls = (function () {
    var ctx;
    var balls = [];

    function Ball(x, y, speed, radius) {
        this.x = x;
        this.y = y;
        this.dx = speed;
        this.dy = speed;
        this.radius = radius;
    }

    function addBall() {
        var x = 10;
        var y = 100;
        var speed = 5;
        var radius = 10;
        var ball = new Ball(x, y, speed, radius);
        balls.push(ball);
    }

    function clearBalls() {
        balls = [];
    }

    function init() {
        ctx = document.getElementById("canvas").getContext("2d");
        attachEventHandler(document.getElementById("add"), "click", addBall);
        attachEventHandler(document.getElementById("clear"), "click", clearBalls);
        
        setInterval(drawingBalls, 30);
    }

    function drawingBalls() {
        // Clear the canvas.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < balls.length; i++) {
            var ball = balls[i];
            ball.x += ball.dx;
            ball.y += ball.dy;
            
            if ((ball.x + ball.radius > ctx.canvas.width) || (ball.x - ball.radius < 0)) {
                ball.dx = -ball.dx;
                ball.x += ball.dx;
            }

            if ((ball.y + ball.radius > ctx.canvas.height) || (ball.y - ball.radius < 0)) {
                ball.dy = -ball.dy;
                ball.y += ball.dy;
            }
            // Draw the ball.
            ctx.fillStyle = "#00ff00";
            ctx.strokeStyle = "#000";
            drawCircle(ball.x, ball.y, ball.radius, 0, 2*Math.PI, false);
        }

    };

    function drawCircle(x, y, radius, start, end, clockwise) {
        ctx.beginPath();
        ctx.arc(x, y, radius, start, end, clockwise);
        ctx.fill();
        ctx.stroke();
    }

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

    return {
        init: init
    }
})();