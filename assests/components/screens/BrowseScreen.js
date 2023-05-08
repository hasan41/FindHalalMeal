import React, { useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import SearchBar from '../bottom-nav-bar/SearchBar';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

// Import the JSON object
import halalRestaurantData from '../../../Halal_restaurant_data.json';

const BrowseScreen = () => {
  const bottomSheetRef = useRef(null);

  const renderRow = (restaurant) => (
    <View style={styles.iconRow}>
      <Image source={{ uri: restaurant.photo }} style={styles.iconImage} />
      <View style={styles.iconTextContainer}>
        <Text style={styles.iconText}>{restaurant.name}</Text>
        <Text style={styles.iconSubText}>{restaurant.cuisine}</Text>
        <Text style={styles.iconSubText}>{restaurant.location}</Text>
        <Text style={styles.iconSubText}>Rating: {restaurant.rating}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="black" />
    </View>
  );

  const birminghamRestaurants = halalRestaurantData.Alabama.Birmingham;

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar style={styles.searchBarContainer} />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      ></MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['28%', '50%', '75%']}
        backgroundComponent={({ style }) => (
          <View
            style={[
              style,
              {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: '#bbd1ed',
              },
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
    paddingBottom: 20,
  },
  map: {
    flex: 1,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 50,
    backgroundColor: '#efe4f5',
    padding: 30,
  },
  iconImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconTextContainer: {
    flex: 1,
    marginLeft: 20,
  },
  iconText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  iconSubText: {
    color: '#999999',
  },
});

export default BrowseScreen;

