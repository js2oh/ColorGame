var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var mesesageDisplay = document.querySelector("#messageDisplay");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	// set up reset button event listener
	setUpReset()
	// set up mode buttons event listener
	setUpModeButtons()
	// set up square event listener
	setUpSquares()
	reset();
}

function setUpReset() {
	resetButton.addEventListener("click", function() {
		reset();
	})
}

function setUpModeButtons() {
	for (var i =0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function () {
			
			if (this.textContent === "Easy" && numSquares !== 3) {
				modeButtons[1].classList.remove("selected");
				this.classList.add("selected");
				numSquares = 3;
				reset();
			}
			else if (this.textContent === "Hard" && numSquares !== 6) {
				modeButtons[0].classList.remove("selected");
				this.classList.add("selected");
				numSquares = 6;
				reset();
			}
			// this.textContent === "Easy" ? numSquares =3: numSquares = 6;
		})
	}
}

function setUpSquares() {
	for (var i = 0; i < squares.length; i++) {
		//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to pickedColor
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			}
			else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!";
			}
		}) 
	}
}

function changeColors(color) {
	//iterate all squares and change each color to match given color
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//make an array
	var arr = [];
	//add num random colors to array
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor() {
	//pick a red value from 0 ~ 255
	var red = Math.floor(Math.random() * 256);
	//pick a green value from 0 ~ 255
	var green = Math.floor(Math.random() * 256);
	//pick a blue value from 0 ~ 255
	var blue = Math.floor(Math.random() * 256);
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function reset() {
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
}
