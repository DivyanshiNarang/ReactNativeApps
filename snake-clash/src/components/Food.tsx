import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ICoordinate } from '../types/types';

const Food = ({ x, y }: ICoordinate) => {
    return (
        <Text style={[{ top: y * 10, left: x * 10 }, styles.food]}>🍎</Text>
    );
}

const styles = StyleSheet.create({
    food: {
        width: 25,
        height: 25,
        position: 'absolute',
    }
})

export default Food;
