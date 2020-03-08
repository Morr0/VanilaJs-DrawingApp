import * as util from "./util.js"

const canvas = document.getElementById("canv");
let context = canvas.getContext("2d");

// Elements 
let range;

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
    console.log("removing event");
    drawing = false;
    // context.closePath();
    console.log(drawing);

    canvas.removeEventListener("mouseup", mouseUp);
    context = undefined;
}

function modeChanged(){
    console.log("Changed mode");
}

///

window.addEventListener("load", () => {
    sizeCanvas();

    // 

    range = document.getElementById("range");

    // 
    context.lineCap = "round";

    // Set event listeners

    range.addEventListener("input", (e) => {
        console.log(e);
        userPrefs.size = Number.parseInt(e.target.value);
        canvas.getContext("2d").lineWidth = userPrefs.size;
    });

    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mousemove", mouseMoving, false);
});