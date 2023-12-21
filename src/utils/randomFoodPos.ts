import {Coordinate} from "../types/types";

export const randomFoodPos = (maxX: number, maxY:number):Coordinate => {
    return {
        x: Math.floor(Math.random() * (maxX-10)),
        y: Math.floor(Math.random() * (maxY-10)),
    }
}