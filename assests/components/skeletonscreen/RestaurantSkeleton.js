import React from 'react';
import { View, StyleSheet } from 'react-native';
import Shimmer from 'react-native-shimmer-placeholder';

const RestaurantSkeleton = () => {
  return (
    <View style={styles.container}>
      <Shimmer style={styles.imageContainer} />
      <View style={styles.textContainer}>
        <Shimmer style={styles.nameShimmer} />
        <Shimmer style={styles.cuisineShimmer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 10,
    backgroundColor: '#E5BEEC',
    borderRadius: 20,
    padding: 10,
    height: 220,
    width: 280,
  },
  imageContainer: {
    height: 130,
    width: '100%',
    borderRadius: 20,
  },
  textContainer: {
    marginTop: 10,
  },
  nameShimmer: {
    height: 20,
    width: '60%',
    marginBottom: 5,
  },
  cuisineShimmer: {
    height: 15,
    width: '40%',
  },
});

export default RestaurantSkeleton;
