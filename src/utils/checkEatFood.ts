import {Coordinate} from "../types/types";

export const checkEatFood = (
    head: Coordinate,
    food: Coordinate,
    area: number
): boolean => {
    const dBFaSX: number = Math.abs(head.x - food.x);
    const dBFaSY: number = Math.abs(head.y - food.y);
    return (
        dBFaSX < area && dBFaSY < area
    );
}