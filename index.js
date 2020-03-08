const canvas = document.getElementById("canv");
const context = canvas.getContext('2d');

// Elements 
let clickModeButton = undefined, dragModeButton = undefined;

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

    if (drawing)
        draw(event);
    else
        context.beginPath();
}

function draw(event){
    if (drawing){
        // event.preventDefault();
        const x = event.clientX;
        const y = event.clientY;
        // console.log(`x: ${x} and y: ${y}`);
    
        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
    }
}

// To be called whenever a user preference has been changed or when loading the canvas
function changedPreferences(){
    userPrefs = getUserPrefs();
    context.lineWidth = userPrefs.size;
    context.strokeStyle = userPrefs.colour;
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
    changedPreferences();

    // 
    clickModeButton = document.getElementById("clickMode");
    dragModeButton = document.getElementById("dragMode");

    // 
    context.lineCap = "round";

    // Set event listeners

    clickModeButton.addEventListener("click", () => dragMode = false);
    dragModeButton.addEventListener("click", () => dragMode = true);

    canvas.addEventListener("click", toggleDrawing);
    canvas.addEventListener("mousemove", draw);
});