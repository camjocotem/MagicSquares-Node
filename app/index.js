var logger = require('./logger.js');

var MAX_SAFE_SQUARABLE_NUMBER = 605; //Current safe amount
var arr = [1, 1, 1, 1, 1, 1, 1, 1, 1];
var inputs = getRange(MAX_SAFE_SQUARABLE_NUMBER).slice(1, this.length);
var success = false;

//var MAX_SAFE_SQUARABLE_NUMBER = 650; //Desired amount


//Needs to take in current state array and all inputs array
// Code goes here
function cartesian(startingArray, inputs, currentColumn) {
	if (currentColumn !== 0) {
		currentColumn = currentColumn || startingArray.length - 1;
	}

	var currentItemsInputIndex = inputs.indexOf(startingArray[currentColumn]);

	//If current number has reach the max numner
	if (currentItemsInputIndex == inputs.length - 1) {
		startingArray[currentColumn] = inputs[0];
		startingArray = cartesian(startingArray, inputs, currentColumn - 1);
	} else { //run again 
		startingArray[currentColumn] = inputs[currentItemsInputIndex + 1];
	}

	return startingArray;
}

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

function add(a, b) {
	return a + b;
}

function getRange(max) {
	return Array.apply(null, Array(max)).map(function (_, i) {
		return i * i;
	});
}

function calcMagicSquare(arr) {
	var a = arr[0],
		b = arr[1],
		c = arr[2],
		d = arr[3],
		e = arr[4],
		f = arr[5],
		g = arr[6],
		h = arr[7],
		i = arr[8],

		rowA = [a, b, c].reduce(add, 0),
		rowB = [d, e, f].reduce(add, 0),
		rowC = [g, h, i].reduce(add, 0),
		colA = [a, d, g].reduce(add, 0),
		colB = [b, e, h].reduce(add, 0),
		colC = [c, f, i].reduce(add, 0),
		diagA = [a, e, i].reduce(add, 0),
		diagB = [g, e, c].reduce(add, 0);

	if (rowA === rowB && rowB === rowC && rowC === colA && colA === colB && colB === colC && colC === diagA && diagA === diagB && arr.filter(onlyUnique).length >= 7) {
		logger.info("Success result, ", a, b, c, d, e, f, g, h, i);
		logger.info("Success with: ", arr);
		success = true;
	}
}

try {	
	while (!success) {
		arr = cartesian(arr, inputs);
		calcMagicSquare(arr);		
	}	
} catch (err) {
	if (console.error) {
		console.error(err);
		logger.error(err);
	} else {
		console.log(err);
		logger.error(err);
		logger.error("Errored at: ", arr);
	}
}
