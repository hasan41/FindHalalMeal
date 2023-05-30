import React, { useRef, useState, useEffect } from 'react';
import { Animated, Dimensions, ViewPropTypes } from 'react-native';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
import SearchBar from '../search/SearchBar';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import { FontAwesome } from 'react-native-vector-icons';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';  // Add this import at the top

import halalRestaurantData from '../../../Halal_restaurant_data.json';

const fixedCardHeight = 190;
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const fixedCardWidth = SCREEN_WIDTH / 2.2;
const spacing = 10; // Spacing between restaurant cards

const renderRestaurant = ({ item, index, scrollX, fixedCardWidth, spacing, selectedRestaurantIndex, onIconPress }) => {
  
  const inputRange = [
    (index - 2) * (fixedCardWidth + spacing),
    (index - 1) * (fixedCardWidth + spacing),
    index * (fixedCardWidth + spacing),
    (index + 1) * (fixedCardWidth + spacing),
    (index + 2) * (fixedCardWidth + spacing),
  ];
  
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.5, 0.8, 1.2, 0.8, 0.5],
    extrapolate: 'clamp',
  });
  
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.4, 0.7, 1, 0.7, 0.4],
    extrapolate: 'clamp',
  });
  
  
    const isSelected = selectedRestaurantIndex === index;
  
    return (
      <TouchableOpacity onPress={() => onIconPress(item, index)}>
        <Animated.View
          key={item.id}
          style={{
            ...styles.restaurantCard,
            width: fixedCardWidth,
            height: fixedCardHeight,
            margin: spacing / 2,
            transform: [{ scale }],
            opacity,
            borderColor: isSelected ? '#42f55a' : 'transparent',
            borderWidth: isSelected ? 2 : 0,
          }}
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.photo }} style={styles.restaurantImage} />
          </View>
          <View style={styles.restaurantInfoContainer}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
            <Text style={styles.restaurantLocation}>{item.location}</Text>
            <Text style={styles.restaurantRating}>Rating: {item.rating}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  
  

const renderMarker = (birminghamRestaurants, selectedRestaurantIndex, onIconPress) => {
  return birminghamRestaurants.map((restaurant, index) => (
    <Marker
      key={index}
      coordinate={{
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
      }}
      title={restaurant.name}
      description={restaurant.cuisine}
      onPress={() => onIconPress(restaurant, index)}
    >
      <FontAwesome
        name="cutlery"
        size={30}
        color={selectedRestaurantIndex === index ? '#42f55a' : '#954aff'}
      />
    </Marker>
  ));
};

const triggerHapticFeedback = async () => {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};

const BrowseScreen = () => {
  const [noRestaurantsAvailable, setNoRestaurantsAvailable] = useState(false);
  const [region, setRegion] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    
    let prevScrollX = 0;
    const listenerId = scrollX.addListener(({ value }) => {
      const newValue = Math.floor(value / (fixedCardWidth + spacing));
      const oldValue = Math.floor(prevScrollX / (fixedCardWidth + spacing));
  
      if (newValue > oldValue) {
        triggerHapticFeedback('right');
      } else if (newValue < oldValue) {
        triggerHapticFeedback('left');
      }
  
      prevScrollX = value;
    });
  
    return () => {
      scrollX.removeListener(listenerId);
    };
  }, []);

  useEffect(() => {
    if (selectedRestaurantIndex !== null && restaurantScrollViewRef.current) {
      const offsetX = selectedRestaurantIndex * (fixedCardWidth + spacing);
      const scrollPosition = Math.max(0, offsetX - scrollWidth / 2 + fixedCardWidth / 2);
      restaurantScrollViewRef.current.scrollToOffset({
        offset: scrollPosition,
        animated: true,
      });
    }
  }, [selectedRestaurantIndex]);

  const animateToRestaurant = (restaurant) => {
    if (mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
          },
          zoom: 15,
        },
        1000
      );
    }
  };
  
  const fetchRestaurants = async (latitude, longitude) => {
    // Change the range here to adjust the radius
    const latRange = [latitude - 0.05, latitude + 0.05]; // 0.05 is the radius
    const lonRange = [longitude - 0.05, longitude + 0.05];
  
    const nearbyRestaurants = halalRestaurantData.Georgia.AtlantaMetro.filter(restaurant => 
      restaurant.latitude >= latRange[0] &&
      restaurant.latitude <= latRange[1] &&
      restaurant.longitude >= lonRange[0] &&
      restaurant.longitude <= lonRange[1]
    );
  
    // Returns an array of restaurants that are within the given latitude and longitude range
    return nearbyRestaurants;
  };
  

  const [isUserOutOfLocation, setIsUserOutOfLocation] = useState(false);

  const onMapRegionChangeComplete = async (newRegion) => {
    setRegion(newRegion);
    setSearchButtonVisible(true);
  
    /* Commenting out this part of the code as you don't want to fetch new restaurants
    const newRestaurants = await fetchRestaurants(newRegion.latitude, newRegion.longitude);
    setRestaurants(newRestaurants);  // assume you've replaced birminghamRestaurants with a state variable
  
    if (newRestaurants.length === 0) {
      setNoRestaurantsAvailable(true);
    } else {
      setNoRestaurantsAvailable(false);
    }
    */
  
    if (userLocation) {
      const distance = Math.sqrt(
        Math.pow(newRegion.latitude - userLocation.latitude, 2) +
          Math.pow(newRegion.longitude - userLocation.longitude, 2)
      );
  
      setIsUserOutOfLocation(distance > 0.09); // Set threshold as needed
    }
};
  

  const [searchButtonVisible, setSearchButtonVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const animateToUserLocation = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
          zoom: 15,
        },
        1000
      );
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
      // Call fetchRestaurants with the user's location
      const fetchedRestaurants = await fetchRestaurants(location.coords.latitude, location.coords.longitude);
      setRestaurants(fetchedRestaurants);
    })();
  }, []);

  const searchArea = async () => {
    const currentRegion = await mapRef.current.getCamera();
    setRegion(currentRegion);
    
    const newRestaurants = await fetchRestaurants(currentRegion.center.latitude, currentRegion.center.longitude);
    if (newRestaurants.length === 0) {
      setNoRestaurantsAvailable(true);
    } else {
      setNoRestaurantsAvailable(false);
      setRestaurants(newRestaurants);
    }
  };

  const scrollX = useRef(new Animated.Value(0)).current;

  const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState(null);
  const restaurantScrollViewRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  const onIconPress = (restaurant, index) => {
    setSelectedRestaurant(restaurant);
    setSelectedRestaurantIndex(index);
    animateToRestaurant(restaurant);

    if (restaurantScrollViewRef.current) {
      const screenHalfWidth = Dimensions.get('window').width / 2;
      const scrollToX = (fixedCardWidth + spacing) * index - screenHalfWidth + fixedCardWidth / 2;

      restaurantScrollViewRef.current.scrollToOffset({
        offset: scrollToX,
        animated: true,
      });
    }
  };

  const [restaurants, setRestaurants] = useState([]);

  const carouselRef = useRef(null);

  useEffect(() => {
    if (selectedRestaurantIndex !== null && carouselRef.current) {
      const offsetX = selectedRestaurantIndex * 250;
      const scrollPosition = Math.max(0, offsetX - scrollWidth / 2 + 125);
      carouselRef.current.snapToItem(selectedRestaurantIndex, true);
    }
  }, [selectedRestaurantIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar style={styles.searchBarContainer} />
      </View>
      {noRestaurantsAvailable && 
        <View>
          <Text>No Restaurants Available</Text>
        </View>
      }
      {isUserOutOfLocation && (
        <TouchableOpacity
          style={styles.userLocationButtonContainer}
          onPress={() => {
            animateToUserLocation();
            triggerHapticFeedback();
          }}
        >
          <Ionicons name="locate-sharp" size={30} color="#ff82b2" />
        </TouchableOpacity>
      )}
      {region ? (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={onMapRegionChangeComplete}
        >
          {renderMarker(restaurants, selectedRestaurantIndex, onIconPress)}
          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              pinColor="blue"
            />
          )}
        </MapView>
      ) : (
        <View style={styles.map}>
          <Text>Loading...</Text>
        </View>
      )}
      {isUserOutOfLocation && (
        <TouchableOpacity style={styles.searchButtonContainer} onPress={searchArea}>
  <Text style={styles.searchButtonText}>Search this area</Text>
</TouchableOpacity>

      )}
      <View style={styles.restaurantScrollViewContainer}>
        <Animated.FlatList
          ref={restaurantScrollViewRef}
          data={restaurants}
          renderItem={({ item, index }) =>
            renderRestaurant({ item, index, scrollX, fixedCardWidth, spacing, selectedRestaurantIndex, onIconPress })
          }
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={fixedCardWidth + spacing}
          decelerationRate='fast'
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingLeft: (SCREEN_WIDTH - fixedCardWidth) / 2,
            paddingRight: (SCREEN_WIDTH - fixedCardWidth) / 2,
          }}          
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: 'center',
  },
  scrollView: {
    paddingBottom: 120,
    paddingHorizontal: 8,
  },
  map: {
    flex: 1,
  },
  customCallout: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 8,
  },
  calloutText: {
    fontWeight: 'bold',
  },
  restaurantScrollViewContainer: {
    position: 'absolute',
    bottom: 130,  // Decrease this value to lift up the restaurant cards
    left: 0,
    right: 0,
    paddingHorizontal: 0,
  },
  restaurantCard: {
    backgroundColor: '#F2E9FF',
    borderRadius: 40,
    padding: 10,
    width: fixedCardWidth, // Use the fixedCardWidth variable instead of a static value
    height: fixedCardHeight, // Use the fixedCardHeight variable instead of a static value
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    marginHorizontal: spacing / 2, // Adjust marginHorizontal instead of marginRight
    shadowColor: 'green',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'absolute',
    top: -20, // Adjust this value as needed
    height: 56,
    width: 56,
    borderRadius: 50,
    overflow: 'visible',
    zIndex: 1,
    alignSelf: 'center', // Center the image container horizontally
  },
  restaurantImage: {flex: 1,
    height: '100%', // Adjust the percentage as needed
    width: '100%',
    borderRadius: 50,
  },
  restaurantName: {
    fontSize: 14, // Increased from 16 to 18
    fontWeight: 'bold',
    color: '#b175ff',
    marginTop: 10,
    textAlign: 'center', // Align the text in the center
  },
  restaurantCuisine: {
    fontSize: 10, // Increased from 14 to 16
    color: '#666',
    textAlign: 'center', // Align the text in the center
  },
  restaurantLocation: {
    fontSize: 10, // Increased from 14 to 16
    color: '#666',
    textAlign: 'center', // Align the text in the center
  },
  restaurantRating: {
    fontSize: 10, // Increased from 14 to 16
    color: 'green',
    marginTop: 5,
    textAlign: 'center', // Align the text in the center
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 25,
    backgroundColor: '#efe4f5',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  markerText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  searchButtonContainer: {
    backgroundColor: '#f5dff0',
    width: 130,
    height: 40,
    borderRadius: 25, // Half of width and height
    position: 'absolute',
    top: 140,
    alignSelf: 'center',
    zIndex: 2,
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
  },  
  searchButtonText: {
    color: '#ff82b2',
    fontSize: 14,  // Decrease this value as you want
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  userLocationButtonContainer: {
    position: 'absolute',
    top: 130,
    right: 18,
    zIndex: 1,
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#f5dff0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#26ff4e',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BrowseScreen;
