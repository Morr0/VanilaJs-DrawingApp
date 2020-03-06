
const canvas = document.getElementById("canv");
const context = canvas.getContext('2d');

// States
let drawing = false;

// Preferences
let size = 8;
let colour = "black";
let userPrefs = undefined;

window.addEventListener("load", () => {
    sizeCanvas();
    changedPreferences();

    // 
    context.lineCap = "round";

    // Set event listeners

    canvas.addEventListener("click", toggleDrawing);
    canvas.addEventListener("mousemove", draw);
});

function sizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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

export {userPrefTemp, setUserPrefs, getUserPrefs}