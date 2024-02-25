// Get canvas element and context
const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');

// Variables to track drawing status
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set up event listeners for both mouse and touch events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mouseout', endDrawing);

canvas.addEventListener('touchstart', startDrawingTouch);
canvas.addEventListener('touchmove', drawTouch);
canvas.addEventListener('touchend', endDrawingTouch);

// Function to start drawing for mouse
function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

// Function to draw on canvas for mouse
function draw(e) {
    if (!isDrawing) return; // Stop the function if not drawing
    ctx.strokeStyle = document.getElementById('textColorPicker').value; // Get text color from color picker
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

// Function to end drawing for mouse
function endDrawing() {
    isDrawing = false;
}

// Function to start drawing for touch
function startDrawingTouch(e) {
    e.preventDefault(); // Prevent scrolling while drawing
    const touch = e.touches[0];
    isDrawing = true;
    [lastX, lastY] = [touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop];
}

// Function to draw on canvas for touch
function drawTouch(e) {
    if (!isDrawing) return; // Stop the function if not drawing
    e.preventDefault(); // Prevent scrolling while drawing
    const touch = e.touches[0];
    ctx.strokeStyle = document.getElementById('textColorPicker').value; // Get text color from color picker
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
    ctx.stroke();
    [lastX, lastY] = [touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop];
}

// Function to end drawing for touch
function endDrawingTouch() {
    isDrawing = false;
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to change background color of canvas
function changeBackgroundColor() {
    const backgroundColor = document.getElementById('backgroundColorPicker').value;
    canvas.style.background = backgroundColor;
}

// Call changeBackgroundColor function when background color picker changes
document.getElementById('backgroundColorPicker').addEventListener('change', changeBackgroundColor);

// Call clearCanvas function when Clear Canvas button is clicked
document.getElementById('clearCanvasButton').addEventListener('click', clearCanvas);

// Function to download signature
function downloadSignature() {
    const downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL(); // Convert canvas to data URL
    downloadLink.download = 'signature.png'; // Set filename
    downloadLink.click(); // Trigger download
}
