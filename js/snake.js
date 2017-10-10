class Snake{
  constructor(){
    this.direction = "N";
    this.segments = [[10,10]];
  }

  move(){
    const head = this.segments[0];
    head[0] += Snake.DIRECTIONS[this.direction][0];
    head[1] += Snake.DIRECTIONS[this.direction][1];
    this.segments.unshift(head);
    this.segments.pop();
  }

  turn(direction){
    this.direction = direction;
  }

}

Snake.DIRECTIONS = {
  "N": [-1,0],
  "E": [0,1],
  "W": [0,-1],
  "S": [1,0]
};

module.exports = Snake;
