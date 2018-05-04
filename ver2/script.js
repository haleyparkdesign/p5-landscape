var Y_AXIS = 1;
var X_AXIS = 2;
var b1, b2, c1, c2;
var yHigh, yLow, offsetDiff, c;

var xoff = 3;
var yoff = 3;
stars = [];

class Star {
    constructor(x, y) {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * (window.innerWidth - (-window.innerWidth)) + (-window.innerWidth);
        this.radius = Math.random() * 2.5;
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    c1 = color('rgb(103, 113, 252)');
    c2 = color('rgb(245, 190, 255)');
    ridgeFill = color('rgb(128, 160, 229)');
    noStroke();
    frameRate(10);
    addStars();
}

function draw() {
    // Background
    blendMode(BLEND);
    setGradient(0, 0, width, height, c1, c2, Y_AXIS);

    yHigh = 180;
    yLow = 300;
    offsetDiff = 0.05;

    fill(255);
    for (star of stars) {
        ellipse(star.x + xoff, star.y - yoff, star.radius, star.radius);
    }

    blendMode(MULTIPLY);
    fill(ridgeFill);


    while (yLow < height) {
        noiseDetail(5, offsetDiff * 3.5);
        drawRidge(yHigh, yLow, xoff, offsetDiff, randomSeed);
        yHigh = yHigh * 1.2 + 10;
        yLow = yLow * 1.24 + 10
        offsetDiff += 0.02;
    }
}

function drawRidge(yHigh, yLow, xoff, offsetDiff) {
    beginShape();
    noStroke();
    // Iterate over horizontal pixels
    for (var x = 0; x <= width; x += 10) {
        var y = map(noise(xoff), 0, 1, yHigh, yLow);
        // Set the vertex
        vertex(x, y);
        // Increment x dimension for noise
        xoff -= offsetDiff;
    }
    // increment y dimension for noise
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
}

// helper functions
function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
    if (axis == Y_AXIS) { // Top to bottom gradient
        for (var i = y; i <= y + h; i++) {
            var inter = map(i, y, y + h, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else if (axis == X_AXIS) { // Left to right gradient
        for (var i = x; i <= x + w; i++) {
            var inter = map(i, x, x + w, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        xoff += 1;
        yoff += 1;
    } else if (keyCode === RIGHT_ARROW) {
        xoff -= 1;
        yoff -= 1;
    }
    return false;
}

function addStars() {
    for (var i = 0; i < 40 * 12; i += 15) {
        for (var j = 40; j < 40 * 12; j += 15) {
            var s = new Star(i, j);
            stars.push(s);
        }
    }
}
