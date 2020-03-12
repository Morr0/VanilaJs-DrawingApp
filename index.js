let canvas;
let context;

// Elements 
let range;
let colourPicker;

let downloadElement;

// Fake cursor
let cursor;

// States
let drawing = false;

// Preferences
let userPrefs = {
    size: 4,
    // Hexidecimal in string
    colour: "black"
};

function sizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 9/10;
}

function draw(event){
    context.lineTo(event.clientX, event.clientY);
    context.stroke();
}

function mouseMoving(event){
    cursor.style.top = `${event.pageY +80}px`;
    cursor.style.left = `${event.pageX - 15}px`;

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
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    registerServiceWorker();
    sizeCanvas();

    cursor = document.getElementById("cursor");
    range = document.getElementById("range");
    colourPicker = document.getElementById("colourPicker");

    downloadElement = document.getElementById("downloadElement");
    
    context.lineCap = "round";

    // Set event listeners
    // Range events
    range.addEventListener("input", (event) => {
        // Set size into pen
        userPrefs.size = Number.parseInt(event.target.value);
        canvas.getContext("2d").lineWidth = userPrefs.size;

        // Change size of cursor
        cursor.style.width = `${0.1 * userPrefs.size}rem`;
        cursor.style.height = `${0.1 * userPrefs.size}rem`;
    });

    // Change colour of cursor
    colourPicker.addEventListener("input", (event) => {
        userPrefs.colour = event.target.value;
        canvas.getContext("2d").strokeStyle = userPrefs.colour;
        cursor.style.backgroundColor = userPrefs.colour;
    });

    // Show cursor when inside canvas else hide
    canvas.addEventListener("mouseenter", () => {
        cursor.style.visibility = "visible";
    });
    canvas.addEventListener("mouseleave", () => {
        cursor.style.visibility = "hidden";

        // To stop drawing while outside
        drawing = false;  
    });

    // Movement events
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mousemove", mouseMoving, false);
});

function registerServiceWorker(){
    if ("serviceWorker" in navigator){
        navigator.serviceWorker.register("serviceWorker.js", {scope: "/"})
        .then(() => console.log("Registered service worker"));
    }
}
