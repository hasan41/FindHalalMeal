import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
import SearchBar from '../bottom-nav-bar/SearchBar';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';

import halalRestaurantData from '../../../Halal_restaurant_data.json';

const BrowseScreen = () => {
    
  const bottomSheetRef = useRef(null);
  const [region, setRegion] = useState(null);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
  const mapRef = useRef(null);

  
 useEffect(() => {
    if (selectedRestaurant) {
      setRegion({
        ...region,
        latitude: selectedRestaurant.latitude,
        longitude: selectedRestaurant.longitude,
      });
    }
  }, [selectedRestaurant]);

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
  

  const onIconPress = (restaurant) => {
    setSelectedRestaurant(restaurant);
    animateToRestaurant(restaurant);
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

  const [userLocation, setUserLocation] = useState(null); // User's current location

  //Locate to User's location
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
    // Get the current region from the map view
    const currentRegion = await mapRef.current.getCamera();
    setRegion(currentRegion);
    setSearchButtonVisible(false);
  };



const renderRow = (restaurant) => (
  <TouchableOpacity onPress={() => onIconPress(restaurant)}>
    <LinearGradient
      colors={['#efe4f5', '#e7baff']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.iconRow}
    >
      <Image source={{ uri: restaurant.photo }} style={styles.iconImage} />
      <View style={styles.iconTextContainer}>
        <Text style={styles.iconText}>{restaurant.name}</Text>
        <Text style={styles.iconSubText}>{restaurant.cuisine}</Text>
        <Text style={styles.iconSubText}>{restaurant.location}</Text>
        <Text style={styles.iconSubText}>Rating: {restaurant.rating}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="#ff82b2" />
    </LinearGradient>
  </TouchableOpacity>
);

  const birminghamRestaurants = halalRestaurantData.Alabama.Birmingham;

  const renderMarker = () => {
    if (selectedRestaurant) {
      return (
        <Marker
          coordinate={{
            latitude: selectedRestaurant.latitude,
            longitude: selectedRestaurant.longitude,
          }}
          title={selectedRestaurant.name}
          description={selectedRestaurant.cuisine}
        >
          <View style={styles.markerContainer}>
            <Image
              source={{ uri: selectedRestaurant.photo }}
              style={styles.markerImage}
            />
            <Text style={styles.markerText}>{selectedRestaurant.name}</Text>
          </View>
        </Marker>
      );
    }
    return null;
  };
  
  //Haptic Feedback on iPhone
  const triggerHapticFeedback = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }; 

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
        {/* Wrap the loading message in a Text component */}
        <Text>Loading...</Text>
      </View>
      )}
      {searchButtonVisible && (
        <View style={styles.searchButtonContainer}>
          <Button title="Search this area" onPress={searchArea} />
        </View>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['28%', '50%', '75%']}
        backgroundComponent={({ style }) => (
          <View
            style={[
              style,
              styles.bottomSheetBackground,
            ]}
          />
        )}
      >
        <BottomSheetScrollView contentContainerStyle={styles.scrollView}>
          {birminghamRestaurants.map((restaurant, index) => (
            <React.Fragment key={index}>{renderRow(restaurant)}</React.Fragment>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
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
        paddingHorizontal: 8, // Add this line to create gaps on the left and right sides
      },
    map: {
      flex: 1,
    },
    bottomSheetBackground: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: '#bbd1ed',
      paddingHorizontal: 10,
      paddingVertical: 20,
      width: '100%',
      left: 0,
      right: 0,
      bottom: 0,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        borderRadius: 50, // Increase this value to make the container more curvy
        backgroundColor: '#efe4f5', 
        padding: 20, // Reduce this value to make the container smaller
      },
      iconImage: {
        width: 30, // Reduce this value to make the image smaller
        height: 30, // Reduce this value to make the image smaller
        borderRadius: 15, // Reduce this value to match the image size
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
        top: 130, // Adjust this value as needed
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

