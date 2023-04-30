import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons name="ios-search" size={24} color="gray" style={styles.iconStyle} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="gray"
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
    marginTop: 10,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingLeft: 15,
    alignItems: 'center',
    height: 40,
    width: 400,
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
