/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(3);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(0);

$( () =>{
  const rootEl = $('.snake');
  new View(rootEl);
});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);