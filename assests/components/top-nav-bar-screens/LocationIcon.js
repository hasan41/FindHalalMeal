import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const LocationIcon = ({ bottomSheetRef }) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission to access location was denied');
        }

        const location = await Location.getCurrentPositionAsync({});
        const geocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        const formattedAddress = geocode.map(
          (addressPart) => addressPart.name
        ).join(', ');

        setAddress(formattedAddress);
      } catch (error) {
        console.error('Error getting location and address:', error.message);
      }
    })();
  }, []);

  const handleLocationPress = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand(); // Open the bottom sheet
    }
  };

  return (
    <>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8, paddingTop: 6}}
        onPress={handleLocationPress}
      >
        <Ionicons name="location-outline" size={22} color="tomato" />
        <Text style={{ marginLeft: 2 }}>{address}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  // Your styles here
});

export default LocationIcon;
