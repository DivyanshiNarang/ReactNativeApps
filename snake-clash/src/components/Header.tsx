import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { JSX } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '../styles/colors';

interface IHeaderProps {
    reloadGame: () => void;
    pauseGame: () => void;
    children: JSX.Element;
    isPaused: boolean;
}

const Header = ({ reloadGame, pauseGame, children, isPaused }: IHeaderProps) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={reloadGame}>
                <Ionicons name='reload-circle' size={30} colors={Colors.primary} />
            </Pressable>

            <Pressable onPress={pauseGame}>
                <FontAwesome
                    name={isPaused ? 'play-circle' : 'pause-circle'}
                    size={30}
                    colors={Colors.primary} />
            </Pressable>

            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.primary,
        borderWidth: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 15,
        backgroundColor: Colors.background,
    }
})

export default Header;
