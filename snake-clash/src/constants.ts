
const CELL_SIZE = 10, BORDER_WIDTH = 12;
const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }]; // current head position, array to keep track of each part of snake as it eats and grows
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const MOVE_INTERVAL = 50; // moving the snake every 50ms
const SCORE_INCREMENT = 10;

export {
    CELL_SIZE,
    BORDER_WIDTH,
    SNAKE_INITIAL_POSITION,
    FOOD_INITIAL_POSITION,
    MOVE_INTERVAL,
    SCORE_INCREMENT,
}