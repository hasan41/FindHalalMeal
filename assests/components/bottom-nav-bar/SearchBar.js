import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <LinearGradient
          colors={['#fcc5dc', '#ffd3c7']}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.gradient}
        >
          <Ionicons name="ios-search" size={24} color="#fc4992" style={styles.iconStyle} />
          <TextInput
            placeholder="Search Halal"
            placeholderTextColor="#fc4992"
            style={styles.inputStyle}
          />
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10, // Adjust this value to increase or decrease the width of the search bar
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 10,
        marginTop: -18,
      },
      searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderRadius: 25,
        paddingLeft: 15,
        overflow: 'hidden',
        width: '100%',
      },
      inputStyle: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent',
      },
      iconStyle: {
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
