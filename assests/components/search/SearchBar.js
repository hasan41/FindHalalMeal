import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

const SearchBar = ({ openSortModal, isHomeScreen, isBottomSheet }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      const url = 'http://10.0.0.18:3000/search';
      const requestData = {
        query: searchQuery,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers you need
        }
      };
  
      console.log("Sending request to:", url);
      console.log("Request data:", requestData);
      console.log("Request headers:", config.headers);
  
      const response = await fetch(url, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(requestData)
      });
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error('HTTP error');
      }
  
      const data = await response.json();
      //console.log("Received response:", data); // Process search results

      data.forEach(item => {
        const restaurant = item._source;
        console.log("Restaurant Name:", restaurant.name);
        console.log("Cuisine:", restaurant.cuisine);
        console.log("Location:", restaurant.location);
        console.log("City:", restaurant.city);
        console.log("State:", restaurant.state);
        console.log("Latitude:", restaurant.latitude);
        console.log("Longitude:", restaurant.longitude);
        console.log("Website:", restaurant.link);
        console.log("Photo URL:", restaurant.photo);
        console.log("Price Range:", restaurant.price);
        console.log("Rating:", restaurant.rating);
        console.log("\n");
        // Handle arrays like 'characteristics', 'credit_cards_accepted', etc.
      });
      
    } catch (error) {
      console.error('Search failed:', error.message);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <LinearGradient
          colors={['#f7d2e2', '#e484f5']}
          start={[0, 1]}
          end={[2, 0]}
          style={styles.gradient}
        >
          <TouchableOpacity onPress={handleSearch}>
            <FontAwesome name="search" size={18} color="#fc4992" style={styles.iconStyle} />
          </TouchableOpacity>
          <TextInput
  placeholder={isBottomSheet ? "Search Your Address" : "Search Halal"}
  placeholderTextColor="#fc4992"
  style={styles.inputStyle}
  value={searchQuery}
  onChangeText={setSearchQuery} // Update the state on text change
  onSubmitEditing={handleSearch} // Call handleSearch when Enter/Return is pressed
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

// const handleSearch = async (searchQuery) => {
//   try {
//     const response = await axios.post('http://localhost:3000/search', {
//       query: searchQuery,
//     });
//     console.log(response.data); // Process search results
//   } catch (error) {
//     console.error('Search failed', error);
//   }
// };

export default SearchBar;
