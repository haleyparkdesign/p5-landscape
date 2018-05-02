class Tree {
    constructor(x, y) {
        this.x = x - 5 + Math.random() * 10;
        this.y = y - 5 + Math.random() * 10;
        this.radius = 15 + Math.random() * 50;
        this.r = 20;
        this.g = 150 + Math.random() * 100;
        this.b = 40;
    }
}

trees = [];
var originX = 0;
var originY = 0;

//first tree is planted at 40. Used to number the trees
for (var i = 0; i < 40 * 12; i += 40) {
    for (var j = 0; j < 40 * 12; j += 40) {
        var t = new Tree(i, j);
        trees.push(t);
    }
}

function setup() { //called once
    createCanvas(400, 400);
    noStroke();
    ellipseMode(CENTER);
    background(10, 100, 20);
}

function draw() {
    background(10, 100, 20);
    for (tree of trees) {
        fill(tree.r, tree.g, tree.b);
        ellipse(tree.x + originX, tree.y + originY, tree.radius, tree.radius);
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        originY += 5;
    } else if (keyCode === DOWN_ARROW) {
        originY -= 5;
    } else if (keyCode === LEFT_ARROW) {
        originX += 5;
    } else if (keyCode === RIGHT_ARROW) {
        originX -= 5;
    }
    return false;
}
