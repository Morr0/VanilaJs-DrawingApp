const canvas = document.getElementById("canv");
const context = canvas.getContext('2d');

// Elements 
let clickModeButton = undefined, dragModeButton = undefined;
let range = undefined;

// States
let drawing = false;
let dragMode = false;

// Preferences
let size = 8;
let colour = "black";
let userPrefs = undefined;

function sizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 9/10;
}

function toggleDrawing(event){
    drawing = !drawing;

    if (!dragMode){
        if (drawing)
            draw(event);
        else
            context.beginPath();
    }
}

function dragModeDraw(event){
    context.lineTo(event.clientX, event.clientY);
    context.stroke();
}

function draw(event){
    if (drawing){
        if (!dragMode){
            // event.preventDefault();
            const x = event.clientX;
            const y = event.clientY;
            // console.log(`x: ${x} and y: ${y}`);

            context.lineTo(x, y);
            context.stroke();
            // context.beginPath();
            context.moveTo(x, y);
        } else 
            dragModeDraw(event);
    }
}

function mouseDown(event){
    context.lineWidth = userPrefs.size;

    if (dragMode){
        console.log("mouseDown");
        drawing = true;

        context.beginPath();
        context.moveTo(event.clientX, event.clientY);

        canvas.addEventListener("mouseup", mouseUp);
    }
}

function mouseUp(){
    if (dragMode){
        console.log("mouseUp");
        drawing = false;
        context.closePath();

        canvas.removeEventListener("mouseup", mouseUp);
    }
}

///



const userPrefTemp = {
    size: 8,
    // Hexidecimal in string
    colour: "black"
}

const USER_PREFS = "USER_PREFS";

function getUserPrefs(){
    return JSON.parse(localStorage.getItem(USER_PREFS)) || userPrefTemp;
}

function setUserPrefs(userPrefs){
    localStorage.setItem(USER_PREFS, JSON.parse(userPrefs));
}

///

window.addEventListener("load", () => {
    sizeCanvas();

    // 
    clickModeButton = document.getElementById("clickMode");
    dragModeButton = document.getElementById("dragMode");

    range = document.getElementById("range");

    // 
    context.lineCap = "round";

    // Set event listeners

    clickModeButton.addEventListener("click", () => dragMode = false);
    dragModeButton.addEventListener("click", () => dragMode = true);

    range.addEventListener("input", () => userPrefs.size = Number.parseInt(range.value));

    canvas.addEventListener("click", toggleDrawing);
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mousemove", draw);
});