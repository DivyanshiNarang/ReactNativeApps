import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export interface IPokemon {
  name: string;
  image: string;
  backImage: string;
  types: string[];
  weight?: number;
  height?: number;
  stats?: any;
}

export const colorByType = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD'
};

export default function Index() {
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10');
        const data = await response.json();

        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon: any) => {
            const res = await fetch(pokemon.url);
            const details: any = await res.json();

            return {
              name: pokemon?.name,
              image: details?.sprites?.front_default || details?.sprites?.front_shiny,
              backImage: details?.sprites?.back_default || details?.sprites?.back_shiny,
              types: details?.types?.map((t: any) => t.type.name),
            }
          })
        )

        setPokemonList(detailedPokemons);
      } catch (e) {
        console.log(e);
      }
    }

    fetchPokemonData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.containerStyle}>
      {pokemonList?.map(pokemon => (
        <Link
          key={pokemon.name}
          href={{ pathname: '/details', params: { name: pokemon.name, type: pokemon.types[0] } }}
          style={[{
            // @ts-ignore
            backgroundColor: colorByType[pokemon?.types[0]] + 50,
          }, styles.pokemonContainer]}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{(pokemon.name).toUpperCase()}</Text>
            <Text style={styles.type}>Type: {pokemon?.types[0]}</Text>
            <View style={styles.imageContainer}>
              <Image source={{ uri: pokemon.image }} style={styles.imageSize} />
              <Image source={{ uri: pokemon.backImage }} style={styles.imageSize} />
            </View>
          </View>
        </Link>
      ))
      }
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    gap: 16,
    padding: 16
  },
  pokemonContainer: {
    padding: 20,
    borderRadius: 20,
  },
  contentContainer: { width: '100%' },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageSize: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
  }
});