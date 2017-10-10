const Snake = require('./snake.js');

class Board {
  constructor(){
    this.snake = new Snake();
    this.xDim = 20;
    this.yDim = 20;
  }

  isOutOfBounds(){
    const head = this.snake.segments[0];
    const xOutOfBounds = ((head[0] < 0) || (head[0] >= 20));
    const yOutOfBounds = ((head[1] < 0) || (head[1] >= 20));
    return (xOutOfBounds || yOutOfBounds);
  }

}


module.exports = Board;
