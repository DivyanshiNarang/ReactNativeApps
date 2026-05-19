import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colorByType, IPokemon } from '../app/index';

const getStatColor = (statName: string) => {
    switch (statName) {
        case 'hp':
            return '#ff5959';
        case 'attack':
            return '#f5ac78';
        case 'defense':
            return '#fae078';
        case 'speed':
            return '#fa92b2';
        default:
            return '#68a090';
    }
};

export default function Details() {
    const params = useLocalSearchParams();
    const [data, setData] = useState<IPokemon | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchPokemonByName = async (name: string) => {
            try {
                setIsLoading(true);
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                const data = await response.json();

                const transformedData = {
                    name: data?.name,
                    id: data?.id,
                    image: data?.sprites?.front_default || data?.sprites?.front_shiny,
                    backImage: data?.sprites?.back_default || data?.sprites?.back_shiny,
                    types: data?.types?.map((t: any) => t.type.name),
                    abilities: data?.abilities?.map((a: any) => a.ability.name),
                    weight: data?.weight,
                    height: data?.height,
                    stats: data?.stats?.map((s: any) => ({
                        name: s.stat.name,
                        value: s.base_stat,
                    })),
                }

                setData(transformedData);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPokemonByName(params.name as string);
    }, [])

    if (!data || isLoading) {
        return <Text>Loading Pokémon data...</Text>
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: true, title: params.name as string }} />
            <ScrollView
                contentContainerStyle={{ padding: 16 }}
                style={{
                    flex: 1,
                    backgroundColor:
                        params?.type && colorByType[params.type as keyof typeof colorByType]
                            ? colorByType[params.type as keyof typeof colorByType] + '40'
                            : '#fff',
                }}
            >
                <View style={styles.glassCard}>
                    <Text style={styles.title}>{(params?.name).toString()?.toUpperCase()}</Text>
                    <Image
                        source={{ uri: data.image }}
                        style={styles.image}
                    />

                    <View style={styles.badgeContainer}>
                        {data.types?.map((t: string) => (
                            <View key={t} style={styles.badge}>
                                <Text style={styles.badgeText}>{t}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.glassCard}>
                    <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 10 }}>
                        Base Stats
                    </Text>

                    {data.stats?.map((stat: any) => (
                        <View key={stat.name} style={styles.statRow}>
                            <Text style={styles.statText}>{stat.name}</Text>

                            <View style={styles.barBg}>
                                <View
                                    style={{
                                        width: `${Math.min(stat.value, 100)}%`,
                                        backgroundColor: getStatColor(stat.name),
                                        height: '100%',
                                    }}
                                />
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.glassCard}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Weight</Text>
                        <Text style={styles.value}>{data.weight}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Height</Text>
                        <Text style={styles.value}>{data.height}</Text>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    glassCard: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.25)',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 6,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    value: {
        fontSize: 14,
        color: '#111',
    },
    image: {
        width: 180,
        height: 180,
        alignSelf: 'center',
    },
    barBg: {
        height: 8,
        backgroundColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden',
        flex: 1,
        marginLeft: 10,
    },
    barFill: {
        height: '100%',
        borderRadius: 10,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    statText: {
        width: 60,
        fontSize: 12,
        fontWeight: '600',
    },
    badgeContainer: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        marginTop: 10,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
    },
});