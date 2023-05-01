import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons name="ios-search" size={24} color="black" style={styles.iconStyle} />
        <TextInput
          placeholder="Search Halal"
          placeholderTextColor="black"
          style={styles.inputStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
    marginTop: -18,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f5dff0',
    borderRadius: 25,
    paddingLeft: 15,
    alignItems: 'center',
    height: 40,
    width: 380,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 18,
    color: 'gray',
  },
  iconStyle: {
    marginRight: 10,
  },
});

export default SearchBar;
