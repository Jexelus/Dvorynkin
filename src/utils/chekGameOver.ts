import {Coordinate} from "../types/types";

export const chekGameOver = (
    snakeHead: Coordinate,
    boundr:any)
    :boolean => {
        return (
            snakeHead.x < boundr.xMin ||
            snakeHead.x > boundr.xMax ||
            snakeHead.y > boundr.yMax ||
            snakeHead.y < boundr.yMin
        );
    };