import * as util from "./util.js"

const canvas = document.getElementById("canv");
let context = canvas.getContext("2d");

// Elements 
let range;
let colourPicker;

// Fake cursor
let cursor;

// States
let drawing = false;

// Preferences
let size = 8;
let colour = "black";
let userPrefs = util.userPrefTemp;

function sizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 9/10;
}

function draw(event){
    context.lineTo(event.clientX, event.clientY);
    context.stroke();
}

function mouseMoving(event){
    cursor.setAttribute("style", `top: ${event.pageY}px;
                                  left: ${event.pageX}px;`);

    if (drawing){
        draw(event);
    }
}

function mouseDown(event){
    context = canvas.getContext("2d");
    drawing = true;

    context.beginPath();
    context.moveTo(event.clientX, event.clientY);

    canvas.addEventListener("mouseup", mouseUp);
}

function mouseUp(){
    drawing = false;

    canvas.removeEventListener("mouseup", mouseUp);
    context = undefined;
}

window.addEventListener("load", () => {
    sizeCanvas();

    range = document.getElementById("range");
    colourPicker = document.getElementById("colourPicker");
    cursor = document.getElementById("cursor");

    // 
    context.lineCap = "round";

    // Set event listeners
    // Range events
    range.addEventListener("input", (event) => {
        userPrefs.size = Number.parseInt(event.target.value);
        canvas.getContext("2d").lineWidth = userPrefs.size;

        // Change size of cursor
        cursor.setAttribute("style", `width: ${1 * userPrefs.size}rem;
                                      height: ${1* userPrefs.size}rem;`);
    });

    // Change colour of cursor
    colourPicker.addEventListener("input", (event) => {
        userPrefs.colour = event.target.value;
        console.log(userPrefs.colour);
        canvas.getContext("2d").strokeStyle = userPrefs.colour;
        console.log(cursor.style.backgroundColor);
        cursor.style.backgroundColor = userPrefs.colour;
        console.log(cursor.style.backgroundColor);

    });

    // Show cursor when inside canvas else hide
    // canvas.addEventListener("mouseenter", () => {
    //     cursor.setAttribute("style", `visibility: visible;`);
    // });
    // canvas.addEventListener("mouseleave", () => {
    //     cursor.setAttribute("style", `visibility: hidden;`);
    // });

    // Movement events
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mousemove", mouseMoving, false);
});