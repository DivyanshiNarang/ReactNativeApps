import { IBoundaries, ICoordinate } from "../types/types";

export const checkGameOver = (snakeHead: ICoordinate, boundaries: IBoundaries): boolean => {
    if (snakeHead.x > boundaries.xMax
        || snakeHead.x < boundaries.xMin
        || snakeHead.y > boundaries.yMax
        || snakeHead.y < boundaries.yMin)
        return true;
    return false;
}

export const checkEatsFood = (head: ICoordinate, food: ICoordinate, area: number): boolean => {
    const distanceBetweenFoodAndSnakeX: number = Math.abs(food.x - head.x);
    const distanceBetweenFoodAndSnakeY: number = Math.abs(food.y - head.y);

    return (
        distanceBetweenFoodAndSnakeX < area && distanceBetweenFoodAndSnakeY < area
    )
}

export const randomFoodPositon = (maxX: number, maxY: number): ICoordinate => {
    return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
    }
}