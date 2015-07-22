
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

$(document).ready(function(){
  
  tetris.drawPlayField();
})