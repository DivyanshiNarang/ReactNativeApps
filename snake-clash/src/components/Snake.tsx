import React, { Fragment } from 'react';
import { StyleSheet, View, } from 'react-native';
import { ICoordinate } from '../types/types';
import { Colors } from '../styles/colors';
import { CELL_SIZE } from '../constants';

interface ISnakeProps {
    snake: ICoordinate[];
}

const Snake = ({ snake }: ISnakeProps) => {
    return (
        <Fragment>
            {snake?.map((segment: ICoordinate, index: number) => {
                const segmentStyle = {
                    left: segment.x * CELL_SIZE,
                    top: segment.y * CELL_SIZE,
                };

                return <View key={index} style={[styles.snake, segmentStyle]}></View>
            })}
        </Fragment>
    );
}

const styles = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        position: 'absolute',
        backgroundColor: Colors.primary,
        borderRadius: 10
    }
})

export default Snake;
