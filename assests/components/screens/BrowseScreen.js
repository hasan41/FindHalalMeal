import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import SearchBar from '../bottom-nav-bar/SearchBar';

const BrowseScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 120 }}>
        <SearchBar />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Browse Screen</Text>
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
    backgroundColor: '#bfbee8', // Set the background color to blue
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default BrowseScreen;
