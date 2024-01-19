import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const RestaurantSkeleton = ({ containerStyle, imageStyle, ratingStyle, nameStyle, cuisineStyle }) => {
  const shimmerValue = new Animated.Value(0);

  useEffect(() => {
    const animateShimmer = () => {
      Animated.loop(
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    };

    animateShimmer();

    return () => shimmerValue.stopAnimation();
  }, []);

  const shimmerOpacity = shimmerValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.5, 0.3],
  });

  return (
    <View style={[styles.restaurantContainer, containerStyle]}>
      <View style={[styles.restaurantImage, imageStyle]}>
        <Animated.View style={[styles.shimmerContainer, { opacity: shimmerOpacity }]}>
          <LinearGradient
            colors={['#f4f4f4', '#e7e7e7', '#f4f4f4']}
            start={[0, 0.5]}
            end={[1, 0.5]}
            style={styles.shimmer}
          />
        </Animated.View>
      </View>
      <View style={[styles.ratingContainer, ratingStyle]}>
        <Animated.View style={[styles.shimmerContainer, { opacity: shimmerOpacity }]}>
          <LinearGradient
            colors={['#f4f4f4', '#e7e7e7', '#f4f4f4']}
            start={[0, 0.5]}
            end={[1, 0.5]}
            style={styles.shimmer}
          />
        </Animated.View>
      </View>
      <View style={[styles.restaurantName, nameStyle]}>
        <Animated.View style={[styles.shimmerContainer, { opacity: shimmerOpacity }]}>
          <LinearGradient
            colors={['#f4f4f4', '#e7e7e7', '#f4f4f4']}
            start={[0, 0.5]}
            end={[1, 0.5]}
            style={styles.shimmer}
          />
        </Animated.View>
      </View>
      <View style={[styles.cuisineContainer, cuisineStyle]}>
        {[...Array(2)].map((_, index) => (
          <View key={index} style={styles.cuisineBox}>
            <Animated.View style={[styles.shimmerContainer, { opacity: shimmerOpacity }]}>
              <LinearGradient
                colors={['#f4f4f4', '#e7e7e7', '#f4f4f4']}
                start={[0, 0.5]}
                end={[1, 0.5]}
                style={styles.shimmer}
              />
            </Animated.View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchBarContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  iconsContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginRight: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  line: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  featuredTitleContainer: {
    paddingHorizontal: 20,
  },
  featuredText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  featuredContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  restaurantContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: '#E5BEEC',
    borderRadius: 20,
    padding: 10,
    height: 220,
    width: 280,
  },  
  shimmerContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  shimmer: {
    flex: 1,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },  
  ratingContainer: {
    width: 40,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  }, 
  restaurantName: {
    flex: 1,
    height: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  cuisineContainer: {
    flexDirection: 'row',
    marginTop: 5,
    flexWrap: 'wrap',
  },  
  cuisineBox: {
    width: 60,
    height: 20,
    borderRadius: 10,
    marginTop: 5,
    marginRight: 5,
  },  
});

export default RestaurantSkeleton;
