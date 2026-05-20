import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../styles/colors';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Direction, ICoordinate, IGestureEvent } from '../types/types';
import { BORDER_WIDTH, CELL_SIZE, FOOD_INITIAL_POSITION, MOVE_INTERVAL, SCORE_INCREMENT, SNAKE_INITIAL_POSITION } from '../constants';
import Snake from './Snake';
import { checkEatsFood, checkGameOver, randomFoodPositon } from '../utility/helper';
import Food from './Food';
import Header from './Header';

const { width } = Dimensions.get('window');

const Game = () => {
    // const insets = useSafeAreaInsets();
    const [direction, setDirection] = useState<Direction>(Direction.Right);
    const [snake, setSnake] = useState<ICoordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = useState<ICoordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);

    const GAME_BOUNDS = {
        xMin: 0,
        xMax: Math.floor((width - BORDER_WIDTH * 2) / CELL_SIZE) - 1,
        yMin: 0,
        yMax: 59,//Math.floor((height - BORDER_WIDTH * 2 - insets.top - insets.bottom) / CELL_SIZE) - 1
    } as const;

    const panGesture = Gesture.Pan()
        .onUpdate((event: IGestureEvent) => {
            const { translationX, translationY } = event;

            if (Math.abs(translationX) > Math.abs(translationY)) {
                if (translationX > 0) {
                    setDirection(Direction.Right);
                } else {
                    setDirection(Direction.Left);
                }
            } else {
                if (translationY > 0) {
                    setDirection(Direction.Down);
                } else {
                    setDirection(Direction.Up);
                }
            }
        })

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead }; // not mutating the original value directly so creating a copy

        // game over
        const gameStatus = checkGameOver(snakeHead, GAME_BOUNDS);
        if (gameStatus) {
            setIsGameOver(prev => !prev);
            return;
        }

        switch (direction) {
            case Direction.Up:
                newHead.y -= 1;
                break;
            case Direction.Down:
                newHead.y += 1;
                break;
            case Direction.Left:
                newHead.x -= 1;
                break;
            case Direction.Right:
                newHead.x += 1;
                break;
        }


        // if eats food
        if (checkEatsFood(snakeHead, food, 2)) {
            // set random food position
            setFood(randomFoodPositon(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));

            // grow the snake
            setSnake([newHead, ...snake]);

            // get another position for food
            setScore(prev => prev + SCORE_INCREMENT);
        } else {
            setSnake([newHead, ...snake.slice(0, -1)]);
        }

    }

    useEffect(() => {
        if (isGameOver) return;

        const intervalId = setInterval(() => {
            if (isPaused) return;
            moveSnake();
        }, MOVE_INTERVAL);

        return () => clearInterval(intervalId);
    }, [snake, isGameOver, isPaused]);

    const pauseGame = () => {
        setIsPaused(prev => !prev);
    }

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setIsGameOver(false);
        setScore(0);
        setDirection(Direction.Right);
        setIsPaused(false);
    }

    return (
        <GestureDetector gesture={panGesture}>
            <SafeAreaView style={styles.container}>
                <Header isPaused={isPaused} pauseGame={pauseGame} reloadGame={reloadGame}>
                    <Text style={styles.score}>{score}</Text>
                </Header>
                <View style={styles.boundaries}>
                    <Snake snake={snake} />
                    <Food x={food.x} y={food.y} />
                </View>
            </SafeAreaView>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    boundaries: {
        flex: 1,
        backgroundColor: Colors.background,
        borderWidth: BORDER_WIDTH,
        borderColor: Colors.primary,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    score: {
        fontSize: 16,
        fontWeight: 600,
    }
})

export default Game;
