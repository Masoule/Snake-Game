const Board = require("./board.js");

class View {
  constructor($el){
    this.$el = $el;
    this.board = new Board();
    this.createGrid();
    this.snake = this.board.snake;
    $('body').on('keydown', (e) =>{
      this.handleKeyEvent(e);
    });

    const interval = setInterval( ()=>{
      this.step();
      if (this.board.isOutOfBounds()) {
        alert('You lose!');
        clearInterval(interval);
      }
    }, 200);

  }

  handleKeyEvent(e) {
    const direction = View.KEYDIRS[e.key];
    this.snake.turn(direction);
  }

  draw(){
    const segments = this.snake.segments;
    segments.forEach( (pos) => {
      const $snakeSquare = $(`[pos="${pos}"]`);
      $snakeSquare.addClass('snakeSegment');
    });
  }

  createGrid() {
    for (let i = 0; i < this.board.xDim; i++) {
      let $row = $("<ul>");
      for (let j = 0; j < this.board.yDim; j++) {
        let $square = $("<li>").attr("pos",[i,j]);
        $row.append($square);
      }
      $(".snake").append($row);
    }
  }

  step(){
    this.clear();
    this.snake.move();
    this.draw();
  }

  clear(){
    $('li').removeClass('snakeSegment');
  }
}

View.KEYDIRS = {
  "ArrowLeft" : "W",
  "ArrowRight" : "E",
  "ArrowUp" : "N",
  "ArrowDown" : "S"
};


module.exports = View;
