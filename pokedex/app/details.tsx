import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Details() {
    const params = useLocalSearchParams();
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const fetchPokemonByName = async (name: string) => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                const data = await response.json();
                console.log(data)
                setData(data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchPokemonByName(params.name as string);
    }, [])

    return (
        <>
            <Stack.Screen options={{ headerShown: true, title: params.name as string }} />
            <ScrollView
                contentContainerStyle={styles.containerStyle}
                style={{ flex: 1, backgroundColor: 'colorByType[data?.types?.[0]?.type?.name as string]' }}
            >
                <View>
                    <Text style={styles.boldStyle}>The weight of {params.name} is {data.weight}</Text>
                </View>
            </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
    containerStyle: {
        gap: 16,
        padding: 16,
    },
    boldStyle: {
        fontSize: 20,
        fontWeight: 800,
    }
});

