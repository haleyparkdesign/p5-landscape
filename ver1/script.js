var Y_AXIS = 1;
var X_AXIS = 2;
var b1, b2, c1, c2;
var yHigh, yLow, offsetDiff, c, xoff;

var yoff = 0.0; // 2nd dimension of perlin noise

class Star {
    constructor(x, y) {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight / 1.5;
        this.radius = Math.random() * 2.5;
    }
}

stars = [];

//first star is planted at 40. Used to number the stars
for (var i = 0; i < 40 * 12; i += 40) {
    for (var j = 0; j < 40 * 12; j += 40) {
        var t = new Star(i, j);
        stars.push(t);
    }
}


function setup() {
    noStroke();
    createCanvas(windowWidth, windowHeight);
    c1 = color('rgb(103, 113, 252)');
    c2 = color('rgb(245, 190, 255)');
    ridgeFill = color('rgba(0, 61, 190, 0.45)');
}

function draw() {
    // Background
    blendMode(BLEND);
    setGradient(0, 0, width, height, c1, c2, Y_AXIS);
    yHigh = 180;
    yLow = 250;
    offsetDiff = 0.05;
    xoff = yoff * 0.1;

    fill(255);

    // draw stars
    for (star of stars) {
        ellipse(star.x + xoff, star.y, star.radius, star.radius);
    }

    blendMode(MULTIPLY);

    while (yLow < height) {
        fill(ridgeFill);
        drawRidge(yHigh, yLow, xoff, offsetDiff);
        yHigh = yHigh * 1.21 + 10;
        yLow = yLow * 1.24 + 10;
        xoff -= 110;
        offsetDiff += 0.02;

    }

    yoff += 0.035; // move the ridges
}

function drawRidge(yHigh, yLow, xoff, offsetDiff) {
    beginShape();
    noStroke();
    // Iterate over horizontal pixels
    for (var x = 0; x <= width + 50; x += 10) {
        var y = map(noise(xoff), 0, 1, yHigh, yLow);
        // Set the vertex
        vertex(x, y);
        // Increment x dimension for noise
        xoff += offsetDiff;
    }
    // increment y dimension for noise
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
}

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
