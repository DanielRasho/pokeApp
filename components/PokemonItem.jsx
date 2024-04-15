import React from "react"
import {View, Text, Pressable, Image} from "react-native"
import {Link} from "expo-router"

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

export default PokemonItem