import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TemporaryRestaurantsScreen = () => {
  const tempRestaurants = [
    { name: 'Restaurant 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { name: 'Restaurant 2', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    { name: 'Restaurant 3', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { name: 'Restaurant 4', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { name: 'Restaurant 5', description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.' },
  ];

  const renderTemporaryRestaurants = () => {
    return tempRestaurants.map((restaurant, index) => (
      <TouchableOpacity key={index} style={styles.iconContainer}>
        <Text style={styles.iconText}>{restaurant.name}</Text>
        <Text style={styles.iconDescription}>{restaurant.description}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton}>
        <MaterialIcons name="close" size={24} color="white" />
      </TouchableOpacity>
      <ScrollView style={styles.scrollContainer}>{renderTemporaryRestaurants()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scrollContainer: {
    flex: 1,
  },
  iconContainer: {
    width: '100%',
    height: 70,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iconText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  iconDescription: {
    fontSize: 14,
    color: 'gray',
  },
});

export default TemporaryRestaurantsScreen;
