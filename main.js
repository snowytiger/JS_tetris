"use strict";

var highScores;

if(localStorage.getItem("highScores")) {
    highScores = JSON.parse(localStorage.getItem("highScores"));
} else {
    highScores = [];
}

var name = "";
var points = 0;

document.getElementById("test").innerHTML = points;
var gravity;
//Declare global object tetris
var tetris = {};


//Draw the grid --------------------------------------------------
tetris.drawPlayField = function(){
  
  for(var row = 0; row < 22; row++){
    $('#playfield').append('<tr class="' + row + '"></tr>');

    for (var col=0;col<10;col++){
      $('tr.'+row).append('<td id="'+col+'"></td>');
    }
  }
}

//Variable to store current coordinates --------------------------

// vart första klossen börjar
tetris.origin = {row:2,col:5};
// vilket typ av kloss som man börjar med
tetris.currentShape = 'L'; // slumpa ist?

tetris.currentCoor;

//Fill the cells -------------------------------------------------
tetris.fillCells = function(coordinates, fillcolor){
  
  for(var i=0; i < coordinates.length; i++){
    var row = coordinates[i].row;
    var col = coordinates[i].col;
    var $coor = $('.'+row).find('#'+col);
    $coor.attr('bgcolor', fillcolor);
  }
}

/* Funktionen tar en array av koordinater och loopar igenom, 
för varje iteration lagras radnumret i den lokala variabeln "row",
samma gäller för colnumret i den lokala variabeln "col". JQuery selektoren lagras 
i den lokala variabeln "$coor" - Sen kommer funktionen att byta ut koordinaternas 
backgrundsfärg till den färg vi har angett längre ner "currentCoor", i detta fall "black". */


//Move current shape --------------------------------------------
tetris.move = function(direction){
	this.fillCells(this.currentCoor,'');

	//move origin
	if(direction === 'right'){
		this.origin.col++;
	} else if (direction === 'left'){
		this.origin.col--;
	}

	this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);

	if(this.ifReverse()){
		if(direction === 'right'){
			this.origin.col--;
		} else if (direction === 'left'){
			this.origin.col++;
		}
	}

	this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);

	this.fillCells(this.currentCoor,'black');
}

//Rotera nuvarande figur + efterföljande figurer -----------------------
tetris.rotate = function(){
	var lastShape = this.currentShape;
	this.fillCells(this.currentCoor,'');

	if(this.currentShape === 'L'){
		this.currentShape = 'L90';
	} else if(this.currentShape === 'L90'){
		this.currentShape = 'L180';
	} else if(this.currentShape === 'L180'){
		this.currentShape = 'L270';
	} else if(this.currentShape === 'L270'){
		this.currentShape = 'L';
	} else if(this.currentShape === 'J'){
		this.currentShape = 'J90';
	} else if(this.currentShape === 'J90'){
		this.currentShape = 'J180';
	} else if(this.currentShape === 'J180'){
		this.currentShape = 'J270';
	} else if(this.currentShape === 'J270'){
		this.currentShape = 'J';
	} else if(this.currentShape === 'I'){
		this.currentShape = 'I90';
	} else if(this.currentShape === 'I90'){
		this.currentShape = 'I';
	} else if(this.currentShape === 'S'){
		this.currentShape = 'S90';
	} else if(this.currentShape === 'S90'){
		this.currentShape = 'S';
	} else if(this.currentShape === 'Z'){
		this.currentShape = 'Z90';
	} else if(this.currentShape === 'Z90'){
		this.currentShape = 'Z';
	} else if(this.currentShape === 'T'){
		this.currentShape = 'T90';
	} else if(this.currentShape === 'T90'){
		this.currentShape = 'T180';
	} else if(this.currentShape === 'T180'){
		this.currentShape = 'T270';
	} else if(this.currentShape === 'T270'){
		this.currentShape = 'T';
	}

	this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);

	for(var i=0;i<this.currentCoor.length;i++){
		if(this.ifReverse()){
			this.currentShape = lastShape;
		}
	}

	this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);
	this.fillCells(this.currentCoor,'black');
}


// Definiera tetris-figurer ---------------------------------------------------------
tetris.shapeToCoor = function(shape,origin){
	if (shape === 'L') {
		return [
            { row: origin.row, col: origin.col },
            { row: origin.row - 1, col: origin.col },
            { row: origin.row + 1, col: origin.col },
            { row: origin.row + 1, col: origin.col + 1 }
        ];
	} else if(shape === 'J'){ 
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row+1,col:origin.col},{row:origin.row+1,col:origin.col-1}]
	} else if(shape === 'I'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row-2,col:origin.col},{row:origin.row+1,col:origin.col}]
	} else if(shape === 'O'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row-1,col:origin.col+1},{row:origin.row,col:origin.col+1}]
	} else if(shape === 'S'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row,col:origin.col-1},{row:origin.row-1,col:origin.col+1}]
	} else if(shape === 'T'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row,col:origin.col-1},{row:origin.row,col:origin.col+1}]
	} else if(shape === 'Z'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row-1,col:origin.col-1},{row:origin.row,col:origin.col+1}]
	} else if(shape === 'L90'){
  	return [{row:origin.row,col:origin.col},{row:origin.row,col:origin.col+1},{row:origin.row,col:origin.col-1},{row:origin.row+1,col:origin.col-1}];
  } else if(shape === 'L180'){
  	return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row+1,col:origin.col},{row:origin.row-1,col:origin.col-1}];
  } else if(shape === 'L270'){
  	return [{row:origin.row,col:origin.col},{row:origin.row,col:origin.col+1},{row:origin.row,col:origin.col-1},{row:origin.row-1,col:origin.col+1}];
  } else if(shape === 'J90'){ 
		return [{row:origin.row,col:origin.col},{row:origin.row,col:origin.col-1},{row:origin.row,col:origin.col+1},{row:origin.row-1,col:origin.col-1}]
	} else if(shape === 'J180'){ 
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row+1,col:origin.col},{row:origin.row-1,col:origin.col+1}]
	} else if(shape === 'J270'){ 
		return [{row:origin.row,col:origin.col},{row:origin.row,col:origin.col-1},{row:origin.row,col:origin.col+1},{row:origin.row+1,col:origin.col+1}]
	} else if(shape === 'I90'){
		return [{row:origin.row,col:origin.col},{row:origin.row,col:origin.col-1},{row:origin.row,col:origin.col+1},{row:origin.row,col:origin.col+2}]
	} else if(shape === 'S90'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row-1,col:origin.col-1},{row:origin.row-2,col:origin.col-1}]
	} else if(shape === 'Z90'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row-1,col:origin.col+1},{row:origin.row-2,col:origin.col+1}]
	} else if(shape === 'T90'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row+1,col:origin.col},{row:origin.row,col:origin.col+1}]
	} else if(shape === 'T180'){
		return [{row:origin.row,col:origin.col},{row:origin.row+1,col:origin.col},{row:origin.row,col:origin.col-1},{row:origin.row,col:origin.col+1}]
	} else if(shape === 'T270'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row+1,col:origin.col},{row:origin.row,col:origin.col-1}]
	} 
}



/* Definera figurer OCH hur varje figur ska rotera när upp-tangenten trycks ner */
 
//Drop shape by one row -----------------------------------------------
tetris.drop = function(){
	var reverse = false;

	this.fillCells(this.currentCoor,'');
	this.origin.row++;
	for(var i=0;i<this.currentCoor.length;i++){
		this.currentCoor[i].row++;
		if(this.ifReverse()){
			reverse = true;
		}
	}

	if(reverse){
		for(var i=0;i<this.currentCoor.length;i++){
			this.currentCoor[i].row--;
		}
		this.origin.row--;
	}

	this.fillCells(this.currentCoor,'black');

	if(reverse){
        // game over
        if (this.origin.row == 2) {
            console.log("game over?");
            clearInterval(gravity);
            
            console.log(name + " fick " + points);
            highScores.push({ name: name, points: points })
            //Spara en användarens name i och point highScores i localstorage
            console.log(highScores);
            localStorage.setItem("highScores", JSON.stringify(highScores));
            //JSON sparar 
            // visa knapp för att starta om? eller visa highscore
            
        } else {
            console.log("game continues");
            this.fillCells(this.currentCoor,'BLACK');
            this.emptyFullRow();
            this.spawn();
        }
	}

}


//Spawn random shape -------------------------------------------------
tetris.spawn = function(){
	var random = Math.floor(Math.random()*7);
	var shapeArray = ['L','J','I','O','S','T','Z'];

	this.currentShape = shapeArray[random];
	this.origin = {row:2,col:5};
	this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);
}

/* Slumpar fram nya tetris-figurer när den nuvarande har nått botten */


//If we need to reverse  -------------------------------------------------
tetris.ifReverse = function(){
	for(var i=0;i<this.currentCoor.length;i++){
		var row = this.currentCoor[i].row;
		var col = this.currentCoor[i].col;
		var $coor = $('.'+row).find('#'+col);
		if($coor.length === 0 || $coor.attr('bgcolor') === 'BLACK'){
			return true;
		}
	}
	return false;
}

//Empty full row -------------------------------------------------
tetris.emptyFullRow = function(){
	var drops = 0;
	for (var i=21; i>=0;i--){
		var rowIsFull = true;

		for (var j=0;j<10;j++){
			var $coor = $('.'+i).find('#'+j);
			if($coor.attr('bgcolor')!=='BLACK'){
				rowIsFull = false;
			}

			if(drops>0){
				var $newCoor = $('.'+(i+drops)).find('#'+j);
				$newCoor.attr('bgcolor',$coor.attr('bgcolor'));
			}
		}

		if(rowIsFull){
			drops++;
            
		}
	}
    console.log("variabeln drops innehåller följande", drops)
}

// document.ready function - ska alltid vara längst ner ----------------
$(document).ready(function(){
	tetris.drawPlayField();
	
})

// startar spelet
function startGame() {  
	tetris.currentCoor = tetris.shapeToCoor(tetris.currentShape,tetris.origin);
	tetris.fillCells(tetris.currentCoor,'black');

	$(document).keydown(function(e){ // Känner av piltangenterna
		console.log(e.keyCode);
		if(e.keyCode === 39){
			tetris.move('right');
		} else if (e.keyCode === 37){
			tetris.move('left');
		} else if (e.keyCode === 38){
			tetris.rotate();
		} else if (e.keyCode === 40){ // tryck på ner-tangenten och hela figuren droppas!
			tetris.drop();
		}
	})

	// Global
	gravity = setInterval(function(){
		tetris.drop();
        // skriv ut den nuvarande klossens position (för färger) och positionen på spelplanen (origin)
        // console.log(tetris.currentCoor, tetris.origin);
	},500); // Ändra hastigheten här, i millisekunder
}

//---------------------- START GAME -------------------------

var startButton = document.getElementById("start-game");

startButton.addEventListener("click", function() {
    var username = prompt("name");

    if (username !== null) {
        // spara det namn personen fyllde i, i den globala variabeln "name"
        name = username;
        startGame(); // starta spelet
    } else {
        console.log("empty name...");
    }
    
});

//---------------------- GAME OVER -------------------------
 var button = document.getElementById("game-over");
 
 button.addEventListener("click", function() {
     // Här prövar vi biblioteket
      swal("Good job!", "You clicked the button!", "success");
 });




