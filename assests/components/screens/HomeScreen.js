import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import SearchBar from '../search/SearchBar';

import restaurantData from '../../../Halal_restaurant_data.json';

const ICONS = [
  { id: 0, name: 'ios-restaurant', label: 'Food' },
  { id: 1, name: 'ios-cart', label: 'Grocery' },
  { id: 2, name: 'ios-alarm', label: 'Cool' },
  { id: 3, name: 'ios-medical', label: 'Medicine' },
  { id: 4, name: 'ios-pizza', label: 'Pizza'},
  { id: 5, name: 'ios-ice-cream', label: 'Dessert'},
  // Add more icons here
];

const HomeScreen = () => {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const nearbyRestaurants = fetchRestaurants(location.coords.latitude, location.coords.longitude);
      setRestaurants(nearbyRestaurants);

    })();
  }, []);

  const fetchRestaurants = (latitude, longitude) => {
    // Change the range here to adjust the radius
    const latRange = [latitude - 0.05, latitude + 0.05]; // 0.05 is the radius
    const lonRange = [longitude - 0.05, longitude + 0.05];
  
    const nearbyRestaurants = restaurantData.Georgia.AtlantaMetro.filter(restaurant => 
      restaurant.latitude >= latRange[0] &&
      restaurant.latitude <= latRange[1] &&
      restaurant.longitude >= lonRange[0] &&
      restaurant.longitude <= lonRange[1]
    );
  
    // Returns an array of restaurants that are within the given latitude and longitude range
    return nearbyRestaurants;
  };

  const animations = ICONS.reduce((acc, _, index) => {
    acc[index] = new Animated.Value(1);
    return acc;
  }, {});

  const startAnimation = (index) => {
    setSelectedIcon(index);
    Animated.sequence([
      Animated.timing(animations[index], {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
  }

  const renderItem = ({ item, index }) => {
    const rotateAnimation = animations[index].interpolate({
      inputRange: [1, 1.5],
      outputRange: ['0deg', '45deg']
    });

    return (
      <TouchableOpacity 
        style={[
          styles.iconContainer, 
          {backgroundColor: item.id === selectedIcon ? '#b9a2fa' : '#ffcbc2'}
        ]}
        onPress={() => startAnimation(index)}
      >
        <View style={[styles.imageContainer, { backgroundColor: item.id === selectedIcon ? '#ff82b2' : '#d3c5fa' }]}>
          <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
            <Ionicons name={item.name} size={24} color={item.id === selectedIcon ? '#ffcbc2' : '#ff82b2'} />
          </Animated.View>
        </View>
        <Text style={styles.iconLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Find Halal</Text>
      </View>
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>
      <View style={styles.iconsContainer}>
        <FlatList
          data={ICONS}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.iconsList}
        />
      </View>
      <View style={styles.line} />
      <View style={styles.featuredTitleContainer}>
        <Text style={styles.featuredText}>Featured Restaurant</Text>
      </View>
      <View style={styles.featuredContainer}>
        <FlatList
          data={restaurants}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.restaurantContainer}>
              <Image style={styles.restaurantImage} source={{ uri: item.photo }} />
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{'⭐ ' + item.rating}</Text>
              </View>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <View style={styles.cuisineContainer}>
                {item.cuisine.split(',').map((cuisine, index) => (
                  <View key={index} style={styles.cuisineBox}>
                    <Text style={styles.cuisineText}>{cuisine.trim()}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}                         
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffdfd9', //bbd1ed
  },
  headerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 50,
    marginLeft: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  searchBarContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  iconsList: {
    paddingHorizontal: 0,
    marginRight: 12,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 40, // Adjust to get the oval shape
    paddingVertical: 10, // Padding to include text within the oval shape
    height: 110, // Adjust this as per your requirement
    width: 62, // Adjust this as per your requirement
    overflow: 'hidden' // This will make sure that the child components do not overflow the boundaries of the container
  },
  imageContainer: {
    position: 'absolute', // This allows you to move the view around inside the container using top, bottom, left, and right
    top: 5, // This moves the view up by 15 pixels. Adjust this as per your requirement
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#d3c5fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
    width: '100%',
  },
  iconLabel: {
    marginTop: 50,
    color: 'black',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredTitleContainer: {
    marginBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
  },
  featuredContainer: {
    marginBottom: 10,
  },
  featuredText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  restaurantContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start', // align items to the left
    marginHorizontal: 10,
    backgroundColor: '#E5BEEC',
    borderRadius: 20, 
    padding: 10, // Add back the padding
    height: 220,
    width: 280, // Increase width of restaurant container
  },
  restaurantImage: {
    height: 130,
    width: '100%',
    borderRadius: 20, // Keep the original border radius
  },  
  ratingContainer: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'tomato',
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  ratingText: {
    color: 'white',
    fontWeight: 'bold',
  },
  restaurantName: {
    marginTop: 10,
    color: 'black',
    textAlign: 'left', // align text to the left
    fontWeight: 'bold',
  },
  cuisineContainer: {
    flexDirection: 'row', // This will layout cuisines horizontally
    marginTop: 5,
    alignItems: 'flex-start', // align items to the left
  },
  cuisineBox: {
    backgroundColor: 'tomato',
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  cuisineText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default HomeScreen;
