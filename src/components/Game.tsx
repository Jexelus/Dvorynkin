import * as React from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Colors} from "../styles/colors";
import {PanGestureHandler} from "react-native-gesture-handler";
import {Coordinate, Direction, GestureEventType} from "../types/types";
import Snake from "./Snake";
import {chekGameOver} from "../utils/chekGameOver";
import Food from "./Food";
import {checkEatFood} from "../utils/checkEatFood";
import {randomFoodPos} from "../utils/randomFoodPos";
import Header from "./Header";

const SNAKE_INITIAL_POSITION = [{x:5, y:5}];
const FOOD_INITIAL_POSITION = {x:5, y:20};
const GAME_BOUNDS = {xMin: 1, xMax:34, yMin:1, yMax:82}
const MOVE_INTERVAL = 20;
const SCORE_INCREMENT = 50;

export default function SnakeGame() : JSX.Element {
    const [direction, setDirection] = React.useState<Direction>(Direction.Right);
    const [snake, setSnake] = React.useState<Coordinate[]>(
        SNAKE_INITIAL_POSITION
    )
    const [food, setFood] = React.useState<Coordinate>(
        FOOD_INITIAL_POSITION
    )

    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);
    const [score, setScore] = React.useState<number>(0);

    React.useEffect(() => {
        if (!isGameOver){
            const intervalId = setInterval(()=>{
                !isPaused && moveSnake();
            }, MOVE_INTERVAL);
            return () => clearInterval(intervalId);
        }
    }, [snake, isGameOver, isPaused])

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = {...snakeHead}

        if (chekGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver((prev) => !prev);
            console.log('||| GAME OVER! |||')
            return;
        }

        switch (direction) {
            case Direction.Up:
                newHead.y -= 1;
                break
            case Direction.Down:
                newHead.y += 1;
                break
            case Direction.Left:
                newHead.x -= 1;
                break
            case Direction.Right:
                newHead.x += 1;
                break
        }


        if (checkEatFood(newHead, food, 2)){
            setFood(randomFoodPos(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax))
            setSnake([newHead, ...snake])
            setScore(score + SCORE_INCREMENT);
        } else {
            setSnake([newHead, ...snake.slice(0, -1)]);
        }


    }

    const pauseGame = () => {
        setIsPaused(!isPaused)
    }

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setIsGameOver(false);
        setScore(0);
        setDirection(Direction.Right);
        setIsPaused(false);
    }

    const handleGesture = (event: GestureEventType) =>{
        const {translationX, translationY} = event.nativeEvent;
        if (Math.abs(translationX) > Math.abs(translationY)){
            if (translationX > 0) {
                setDirection(Direction.Right)
            } else {
                setDirection(Direction.Left)
            }
        } else {
            if(translationY > 0){
                setDirection(Direction.Down)
            }else{
                setDirection(Direction.Up)
            }
        }
    }
    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={style.container}>
                <Header reloadGame={reloadGame} pauseGame={pauseGame} isPaused={isPaused}>
                    <Text style={{
                        fontSize:22,
                        fontWeight:'bold',
                        color: Colors.primary
                    }}>{score}</Text>
                </Header>
                <View style={style.boundr}>
                    <Snake snake={snake}/>
                    <Food x={food.x} y={food.y}/>
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    )
}
const style = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.primary
    },
    boundr:{
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 12,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        backgroundColor: Colors.background
    }
})