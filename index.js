import * as util from "./util.js"

const canvas = document.getElementById("canv");
let context = canvas.getContext("2d");

// Elements 
let range;
let colourPicker;

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
    // context.closePath();

    canvas.removeEventListener("mouseup", mouseUp);
    context = undefined;
}

///

window.addEventListener("load", () => {
    sizeCanvas();

    // 

    range = document.getElementById("range");
    colourPicker = document.getElementById("colourPicker");

    // 
    context.lineCap = "round";

    // Set event listeners

    range.addEventListener("input", (event) => {
        userPrefs.size = Number.parseInt(event.target.value);
        canvas.getContext("2d").lineWidth = userPrefs.size;
    });

    colourPicker.addEventListener("input", (event) => {
        userPrefs.colour = event.target.value;
        console.log(event.target);
        canvas.getContext("2d").strokeStyle = userPrefs.colour;
    });

    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mousemove", mouseMoving, false);
});