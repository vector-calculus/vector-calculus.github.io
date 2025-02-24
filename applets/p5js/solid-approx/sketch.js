/*

Original shader by
Thomas Hooper https://twitter.com/tdhooper
Link: https://www.shadertoy.com/view/NtcyRB

This version by Juan Carlos Ponce Campuzano
Website: https://jcponce.github.io
Date: 24/Feb/2025

*/

// Shader variables
let theShader;
let shaderBg;

// For uniform variables
let xMouse;
let yMouse;
let imView = false;
let slider;
let w;

let isDragging = false; // Flag to track user interaction
let animationTime = 1.5; // Time variable for animation

function preload() {
    // load the shader
    theShader = loadShader("shader.vert", "shader.frag");
}

function setup() {
    // disables scaling for retina screens which can create inconsistent scaling between displays
    //pixelDensity(1);

    createCanvas(windowWidth, windowHeight);
    noStroke();

    // shaders require WEBGL mode to work
    shaderBg = createGraphics(windowWidth, windowHeight, WEBGL);
    cursor('grab');

    w = width * 0.4;
    slider = createSlider(0, 1, 0, 0.01);
    slider.style('width', ''+ w +'px');
    slider.position(windowWidth/2-w/2, windowHeight-80);

    // Detect user interaction
    slider.input(() => isDragging = true);

}

function draw() {
    // we can draw the background each frame or not.
    // if we do we can use transparency in our shader.
    // if we don't it will leave a trailing after image.
    // background(0);
    // shader() sets the active shader with our shader
    shaderBg.shader(theShader);

    // get the mouse coordinates, map them to values between 0-1 space
    yMouse = (map(mouseY, 0, height, height, 0) / height) * 2 - 1;
    xMouse = (mouseX / width) * 2 - 1;

    // Make sure pixels are square
    xMouse = (xMouse * width) / height;
    yMouse = yMouse;

    // pass the interactive information to the shader
    theShader.setUniform("iResolution", [width, height]);
    theShader.setUniform("iTime", millis() / 1000.0);
    theShader.setUniform("iMouse", [width, height]);
    theShader.setUniform("iView", imView);
    theShader.setUniform("iParam", slider.value());

    // Animate slider if not dragging
    if (!isDragging) {
        animationTime += 0.005; // Adjust speed if needed
        let animatedValue = map(sin(animationTime), -1, 1, 0, 1);
        slider.value(animatedValue);
    }


    // rect gives us some geometry on the screen to draw the shader on
    shaderBg.rect(0, 0, width, height);
    image(shaderBg, 0, 0, width, height);

    /*
    // I just need the following code to display
    // information for position reference.
    // flip coordinate information box
    let flipX = 0;
    let flipY = 0;
    if (width - mouseX < 200) {
        flipX = -130;
    }
    if (height - mouseY < 100) {
        flipY = -35;
    }

    // draw coordinate information box if you want

    fill(255);
    rect(mouseX + flipX, mouseY + flipY, 60, 40);
    fill(0);
    text("x: " + int(mouseX), mouseX + 15 + flipX, mouseY + 15 + flipY);
    text("y: " + int(mouseY), mouseX + 15 + flipX, mouseY + 30 + flipY);
    fill(0);
    rect(mouseX + 60 + flipX, mouseY + flipY, 70, 40);
    fill(255);
    text("x: " + nfc(xMouse, 3), mouseX + 15 + 60 + flipX, mouseY + 15 + flipY);
    text("y: " + nfc(yMouse, 3), mouseX + 15 + 60 + flipX, mouseY + 30 + flipY);
    */

    //console.log(imView);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    w = width * 0.4;
    console.log(w);
    slider.style('width', ''+ w +'px');
    slider.position(windowWidth/2-w/2, windowHeight-80);
}

function mousePressed() {
    if (imView === false) {
        imView = true;
    }
    cursor('grabbing');
}

function mouseReleased() {
    if (imView === true) {
        imView = false;
    }
    cursor('grab');
}