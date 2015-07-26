
//Declare global object tetris
var tetris = {};

//Draw the grid --------------------------------------------------
tetris.drawPlayField = function(){
  
  for(var row=0;row<22;row++){
    $('#playfield').append('<tr class="' + row + '"></tr>');

    for (var col=0;col<10;col++){
      $('.'+row).append('<td id="' + col + '"></td>');
      $('tr.'+row).append('<td id="'+col+'"></td>');
    }
  }
}

//Variable to store current coordinates --------------------------
tetris.currentCoor = [{row:1,col:1},
                      {row:1,col:2},
                      {row:2,col:1},
                      {row:2,col:2}];

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

// document.reday function ----------------------------------------
$(document).ready(function(){
  tetris.drawPlayField();
  tetris.fillCells(tetris.currentCoor,'black');
  // Här ändrar man bgcolor, t.ex istället för black -> ändra till blue.
})



//Move current shape
tetris.move = function(direction){
	var reverse = false;
	this.fillCells(this.currentCoor,'');
	
	for(var i=0;i<this.currentCoor.length;i++){
		if(direction === 'right'){
			this.currentCoor[i].col++;
			if(this.currentCoor[i].col>9){
				reverse = true;
			}
		} else if (direction === 'left'){
			this.currentCoor[i].col--;
			if(this.currentCoor[i].col<0){
				reverse = true;
			}
		}
	}
	this.fillCells(this.currentCoor,'black');

	if(reverse && direction === 'left'){
		this.move('right');
	} else if (reverse && direction === 'right'){
		this.move('left');
	}
}

$(document).ready(function(){
	
	tetris.fillCells(tetris.currentCoor,'black');

	$(document).keydown(function(e){
		console.log(e.keyCode);
		if(e.keyCode === 39){
			tetris.move('right');
		} else if (e.keyCode === 37){
			tetris.move('left');
		}
	})

})
