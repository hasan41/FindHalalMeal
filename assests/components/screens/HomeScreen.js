import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import SearchBar from '../bottom-nav-bar/SearchBar';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 120 }}>
        <SearchBar />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title= "Click Here"
          onPress={() => alert('Button Clicked')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c8f7c9', // Set the background color to blue
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

