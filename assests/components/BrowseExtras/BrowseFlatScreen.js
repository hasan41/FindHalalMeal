import React, { useRef, useState, useEffect } from 'react';
import { Animated, Dimensions, ViewPropTypes } from 'react-native';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
import SearchBar from '../bottom-nav-bar/SearchBar';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import { FontAwesome } from 'react-native-vector-icons';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';

import halalRestaurantData from '../../../Halal_restaurant_data.json';


const BrowseScreen = () => {
  const [region, setRegion] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    let prevScrollX = 0;
    const listenerId = scrollX.addListener(({ value }) => {
      const newValue = Math.floor(value / (fixedCardWidth + spacing));
      const oldValue = Math.floor(prevScrollX / (fixedCardWidth + spacing));
  
      if (newValue > oldValue) {
        triggerHapticFeedback();
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

  const [isUserOutOfLocation, setIsUserOutOfLocation] = useState(false);

  const onMapRegionChangeComplete = async (newRegion) => {
    setRegion(newRegion);
    setSearchButtonVisible(true);

    if (userLocation) {
      const distance = Math.sqrt(
        Math.pow(newRegion.latitude - userLocation.latitude, 2) +
          Math.pow(newRegion.longitude - userLocation.longitude, 2)
      );

      setIsUserOutOfLocation(distance > 0.01); // Set threshold as needed
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
    })();
  }, []);

  const searchArea = async () => {
    const currentRegion = await mapRef.current.getCamera();
    setRegion(currentRegion);
    setSearchButtonVisible(false);
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
  
  

  const fixedCardHeight = 220;
  const fixedCardWidth = Dimensions.get('window').width / 1.8;
  const spacing = 2; // Spacing between restaurant cards

  const renderRestaurant = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (fixedCardWidth + spacing),
      index * (fixedCardWidth + spacing),
      (index + 1) * (fixedCardWidth + spacing),
    ];
  
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });
  
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85],
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
  
  

  const birminghamRestaurants = halalRestaurantData.Alabama.Birmingham;

  const renderMarker = () => {
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
          color={selectedRestaurantIndex === index ? 'red' : 'black'}
        />
      </Marker>
    ));
  };

  const triggerHapticFeedback = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

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
          {renderMarker()}
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
      {searchButtonVisible && (
        <View style={styles.searchButtonContainer}>
          <Button title="Search this area" onPress={searchArea} />
        </View>
      )}
      <View style={styles.restaurantScrollViewContainer}>
<Animated.FlatList
  ref={restaurantScrollViewRef}
  data={birminghamRestaurants}
  renderItem={renderRestaurant}
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
    paddingLeft: Dimensions.get('window').width / 2 - fixedCardWidth / 2,
    paddingRight: Dimensions.get('window').width / 2 - fixedCardWidth / 2,
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
    bottom: 150,  // Decrease this value to lift up the restaurant cards
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  restaurantCard: {
    backgroundColor: '#F2E9FF',
    borderRadius: 40,
    padding: 10,
    width: 280,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    marginRight: 10,
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
    top: -40, // Adjust this value as needed
    height: 80,
    width: 80,
    borderRadius: 50,
    overflow: 'visible',
    zIndex: 1,
  },
  restaurantImage: {
    height: '80%', // Adjust the percentage as needed
    width: '100%',
    borderRadius: 50,
  },
  restaurantName: {
    fontSize: 18, // Increased from 16 to 18
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center', // Align the text in the center
  },
  restaurantCuisine: {
    fontSize: 16, // Increased from 14 to 16
    color: '#666',
    textAlign: 'center', // Align the text in the center
  },
  restaurantLocation: {
    fontSize: 16, // Increased from 14 to 16
    color: '#666',
    textAlign: 'center', // Align the text in the center
  },
  restaurantRating: {
    fontSize: 16, // Increased from 14 to 16
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
  iconImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  iconTextContainer: {
    flex: 1,
    marginLeft: 20,
  },
  iconText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#4e70ab',
  },
  iconSubText: {
    color: '#999999',
  },
  markerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
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
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  userLocationButtonContainer: {
    position: 'absolute',
    top: 130,
    right: 20,
    zIndex: 1,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5dff0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BrowseScreen;