import React, { useEffect, useState } from "react";
import { View, Text, Alert, Image ,Pressable, FlatList } from "react-native";
import { Link } from "expo-router";

export default function HomePage() {
  const [pokemonEntries, setPokemonEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleFetchPokemons();
        setPokemonEntries(data);
      } catch (error) {
        Alert("Something wrong happen fetching the data");
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <FlatList 
        data={pokemonEntries}
        renderItem={({item: pokemon}) =>  <PokemonItem {...pokemon}/>}/>
    </View>
  );
}

async function handleFetchPokemons() {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/?limit=20",
      {
        method: "GET",
      },
    );
    const responseJSON = await response.json();
    const pokemonList = responseJSON.results;
    const pokemonEntries = await Promise.all(
      pokemonList.map(async (pokemon) => {
        return await handleFetchPokemonInfo(pokemon.url);
      }),
    );
    return pokemonEntries;
  } catch (error) {
    console.log(error);
  }
}

async function handleFetchPokemonInfo(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const responseJSON = await response.json();
    const pokemon = {
      sprite: responseJSON.sprites.front_default,
      name: responseJSON.name,
      types: responseJSON.types.map((type) => type.type.name),
      hp: responseJSON.stats[0].base_stat,
      attack: responseJSON.stats[1].base_stat,
      defense: responseJSON.stats[2].base_stat,
    };
    return pokemon;
  } catch (error) {
    console.log(error);
  }
}

function PokemonItem({name, sprite, types, hp, attack, defense}) {
  // console.log(sprite)
  return (
    <Link href="/{name}" asChild>
      <Pressable>
        <View>
          <Image 
            style={{width: 100, height: 100}}
            source={{uri: sprite}}/>
          <View>
            <Text>{name}</Text>
            {types.map(type => {
              return <Text key={type}>{type}</Text>
            })}
          </View>
        </View>
          <View>
            <Text>HP</Text>
            <Text>{hp}</Text>
          </View>
          <View>
            <Text>Attack</Text>
            <Text>{attack}</Text>
          </View>
          <View>
            <Text>Defense</Text>
            <Text>{defense}</Text>
          </View>
        <View />
      </Pressable>
    </Link>
  )
}
