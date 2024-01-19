import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

const SearchBar = ({ sortModalVisible, openSortModal, isHomeScreen, isBottomSheet }) => {

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <LinearGradient
          colors={['#fcc5dc', '#E5BEEC']}
          start={[0, 1]}
          end={[1, 0]}
          style={styles.gradient}
        >
          <FontAwesome name="search" size={18} color="#fc4992" style={styles.iconStyle} />
          <TextInput
            placeholder={isBottomSheet ? "Search Your Address" : "Search Halal"}
            placeholderTextColor="#fc4992"
            style={styles.inputStyle}
          />
          {isHomeScreen && <View style={styles.separator} />}
          {isHomeScreen && (
            <TouchableOpacity onPress={openSortModal}>
              <FontAwesome name="unsorted" size={18} color="#fc4992" style={styles.iconStyle} />
            </TouchableOpacity>
          )}
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 2,
    marginTop: -18,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 25,
    overflow: 'hidden',
    width: '96%',
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 2,
    fontSize: 18,
    color: 'white',
    backgroundColor: 'transparent',
  },
  iconStyle: {
    marginRight: 10,
  },
  separator: {
    borderLeftWidth: 1,
    borderLeftColor: '#fc4992',
    height: '80%',
    marginRight: 10,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingLeft: 15,
    height: 40,
    width: '100%',
  },
});

export default SearchBar;
