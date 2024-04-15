import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NativeRouter, Route, Link } from 'react-router-native'

export default function App () {
  return (
    <NativeRouter>
      <View>Hello</View>
    </NativeRouter>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
