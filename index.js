const canvas = document.getElementById("canv");
const context = canvas.getContext('2d');

// States
let drawing = false;

// Preferences
let size = 8;
let colour = "red";

window.addEventListener("load", () => {
    sizeCanvas();
    changedPreferences();

    // 
    context.lineCap = "round";

    // Set event listeners
    window.addEventListener("resize", sizeCanvas);

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", endDrawing);
});

function sizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function startDrawing(event){
    drawing = true;
    draw(event);
}

function draw(event){
    if (drawing){
        const x = event.clientX;
        const y = event.clientY;
        console.log(`x: ${x} and y: ${y}`);
    
        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
    }
}

function endDrawing(){
    drawing = false;

    context.beginPath();
}

// To be called whenever a user preference has been changed or when loading the canvas
function changedPreferences(){
    //TODO get new preferences
    //TODO store them
    // set them
    context.lineWidth = size;
    context.strokeStyle = colour;
}