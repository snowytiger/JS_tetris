
//Declare global object tetris
var tetris = {};

//Draw the grid
tetris.drawPlayField = function(){
  for(var row=0;row<22;row++){
    $('#playfield').append('<tr class="' + row + '"></tr>');

    for (var col=0;col<10;col++){
      $('.'+row).append('<td id="' + col + '"></td>');
    }
 }
}

//Fill the cells
tetris.fillCells = function(coordinates){
  for(var i=0;irow = coordinates[i].row;
    var col = coordinates[i].col;
    var $coor = $('.'+row).find('#'+col);
    $coor.attr('bgcolor','black');
  }
}

//Variable to store current coordiates
tetris.currentCoor = [{row:1,col:1},
                      {row:1,col:2},
                      {row:2,col:1},
                      {row:2,col:2}];

$(document).ready(function(){
  
  tetris.drawPlayField();
})