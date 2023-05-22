// import React, { useRef, useState, useEffect } from 'react';
// import { Animated, Dimensions } from 'react-native';
// import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Button, Callout } from 'react-native';
// import SearchBar from '../bottom-nav-bar/SearchBar';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import { Ionicons } from '@expo/vector-icons';
// import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as Location from 'expo-location';
// import * as Haptics from 'expo-haptics';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { FontAwesome } from 'react-native-vector-icons';

// import halalRestaurantData from '../../../Halal_restaurant_data.json';

// const BrowseScreen = () => {
    
//   const [region, setRegion] = useState(null);

//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
//   const mapRef = useRef(null);

  
//  useEffect(() => {
//     if (selectedRestaurant) {
//       setRegion({
//         ...region,
//         latitude: selectedRestaurant.latitude,
//         longitude: selectedRestaurant.longitude,
//       });
//     }
//   }, [selectedRestaurant]);

//   const animateToRestaurant = (restaurant) => {
//     if (mapRef.current) {
//       mapRef.current.animateCamera(
//         {
//           center: {
//             latitude: restaurant.latitude,
//             longitude: restaurant.longitude,
//           },
//           zoom: 15,
//         },
//         1000
//       );
//     }
//   };

  
//   const [isUserOutOfLocation, setIsUserOutOfLocation] = useState(false);

//   const onMapRegionChangeComplete = async (newRegion) => {
//     setRegion(newRegion);
//     setSearchButtonVisible(true);
  
//     if (userLocation) {
//       const distance = Math.sqrt(
//         Math.pow(newRegion.latitude - userLocation.latitude, 2) +
//           Math.pow(newRegion.longitude - userLocation.longitude, 2)
//       );
  
//       setIsUserOutOfLocation(distance > 0.01); // Set threshold as needed
//     }
//   };

//   const [searchButtonVisible, setSearchButtonVisible] = useState(false);

//   const [userLocation, setUserLocation] = useState(null); // User's current location

//   //Locate to User's location
//   const animateToUserLocation = () => {
//     if (mapRef.current && userLocation) {
//       mapRef.current.animateCamera(
//         {
//           center: {
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//           },
//           zoom: 15,
//         },
//         1000
//       );
//     }
//   };
  

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.error('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setUserLocation(location.coords);
//       setRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.015,
//         longitudeDelta: 0.0121,
//       });
//     })();
//   }, []);


//   const searchArea = async () => {
//     // Get the current region from the map view
//     const currentRegion = await mapRef.current.getCamera();
//     setRegion(currentRegion);
//     setSearchButtonVisible(false);
//   };


//   const scrollX = useRef(new Animated.Value(0)).current;

//   const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState(null);
//   const restaurantScrollViewRef = useRef(null);
//   const [scrollWidth, setScrollWidth] = useState(0);
//   const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);


//   const onIconPress = (restaurant, index) => {
//     setSelectedRestaurant(restaurant);
//     setSelectedRestaurantIndex(index);
//     animateToRestaurant(restaurant);
  
//     // Scroll to the selected restaurant in the Animated.ScrollView
//     if (restaurantScrollViewRef.current) {
//       const cardWidth = 250; // Replace with your card width
//       const cardSpacing = 20; // Replace with your card spacing
//       const screenHalfWidth = Dimensions.get('window').width / 2;
//       const scrollToX = (cardWidth + cardSpacing) * index - screenHalfWidth + cardWidth / 2;
//       restaurantScrollViewRef.current.scrollTo({
//         x: scrollToX,
//         animated: true,
//       });
//     }
//   };
  
  
  
//   const renderRestaurant = (restaurant, index) => {
//     const cardWidth = 250; // Width of each restaurant card
//     const spacing = 20; // Spacing between restaurant cards
//     const inputRange = birminghamRestaurants.map((_, i) => i * (cardWidth + spacing));
  
//     const middleIndex = (birminghamRestaurants.length - 1) / 2;
  
//     const opacityOutputRange = inputRange.map((inputIndex) => {
//       const diff = Math.abs(middleIndex - inputIndex);
//       const opacity = 1 - diff / middleIndex * 0.3; // Change 0.5 to 0.3 to make cards less transparent
//       // ensure minimum opacity is 1
//       return Math.max(opacity, 1); // Change 0.7 to 1 to ensure cards are not transparent at all
//     });
  
//     const scaleOutputRange = inputRange.map((inputIndex) => {
//       const diff = Math.abs(middleIndex - inputIndex);
//       const scale = 1 - diff / middleIndex * 0.2;
//       // ensure minimum scale is 0.8
//       return Math.max(scale, 0.8);
//     });
  
//     const animStyle = {
//       opacity: scrollX.interpolate({
//         inputRange,
//         outputRange: opacityOutputRange,
//         extrapolate: 'clamp',
//       }),
//       transform: [
//         {
//           scale: scrollX.interpolate({
//             inputRange,
//             outputRange: scaleOutputRange,
//             extrapolate: 'clamp',
//           }),
//         },
//       ],
//     };
  
//     const isSelected = selectedRestaurantIndex === index;
  
//     return (
//       <Animated.View
//         key={restaurant.id}
//         style={{
//           ...styles.restaurantCard,
//           ...animStyle,
//           top: 10,
//           borderColor: isSelected ? '#42f55a' : 'transparent',
//           borderWidth: isSelected ? 1 : 0,
//           backgroundColor: '#F2E9FF', // Add this line for light purple background color
//         }}
//       >
//         <View style={styles.imageContainer}>
//           <Image source={{ uri: restaurant.photo }} style={styles.restaurantImage} />
//         </View>
//         <TouchableOpacity
//           onPress={() => onIconPress(restaurant, index)}
//           style={{ width: '100%', height: '100%' }}
//         >
//           <Text style={styles.restaurantName}>{restaurant.name}</Text>
//           <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
//           <Text style={styles.restaurantLocation}>{restaurant.location}</Text>
//           <Text style={styles.restaurantRating}>Rating: {restaurant.rating}</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     );
//   };
  


//   const birminghamRestaurants = halalRestaurantData.Alabama.Birmingham;

//   const renderMarker = () => {
//     return birminghamRestaurants.map((restaurant, index) => (
//       <Marker
//         key={index}
//         coordinate={{
//           latitude: restaurant.latitude,
//           longitude: restaurant.longitude,
//         }}
//         title={restaurant.name}
//         description={restaurant.cuisine}
//         onPress={() => onIconPress(restaurant, index)}
//       >
//         <FontAwesome
//           name="cutlery"
//           size={30}
//           color={selectedRestaurantIndex === index ? 'red' : 'black'}
//         />
//       </Marker>
//     ));
//   };
  
  
  
  
//   //Haptic Feedback on iPhone
//   const triggerHapticFeedback = async () => {
//     await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
// }; 

// useEffect(() => {
//     if (selectedRestaurantIndex !== null && restaurantScrollViewRef.current) {
//       const offsetX = selectedRestaurantIndex * 250;
//       const scrollPosition = Math.max(0, offsetX - (scrollWidth / 2) + 125);
//       restaurantScrollViewRef.current.scrollTo({
//         x: scrollPosition,
//         animated: true,
//       });
//     }
//   }, [selectedRestaurantIndex]);
  

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchBarContainer}>
//         <SearchBar style={styles.searchBarContainer} />
//       </View>
//       {isUserOutOfLocation && (
//       <TouchableOpacity
//       style={styles.userLocationButtonContainer}
//       onPress={() => {
//         animateToUserLocation();
//         triggerHapticFeedback();
//     }}
// >
//   <Ionicons name="locate-sharp" size={30} color="#ff82b2" />
//     </TouchableOpacity>
//     )}
//     {region ? (
//     <MapView
//         ref={mapRef}
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={region}
//         onRegionChangeComplete={onMapRegionChangeComplete}
//       >
//       {renderMarker()}
//       {userLocation && (
//       <Marker
//         coordinate={{
//         latitude: userLocation.latitude,
//         longitude: userLocation.longitude,
//       }}
//       pinColor="blue"
//       />
//       )}
//       </MapView>
//       ) : (
//         <View style={styles.map}>
//         {/* Wrap the loading message in a Text component */}
//         <Text>Loading...</Text>
//       </View>
//       )}
//       {searchButtonVisible && (
//         <View style={styles.searchButtonContainer}>
//           <Button title="Search this area" onPress={searchArea} />
//         </View>
//       )}
//       <View style={styles.restaurantScrollViewContainer}>
//         <Animated.ScrollView
//           ref={restaurantScrollViewRef}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.scrollView}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//             { useNativeDriver: false }
//           )}
//           scrollEventThrottle={16}
//         >
//           {birminghamRestaurants.map((restaurant, index) => (
//             <React.Fragment key={index}>
//               {renderRestaurant(restaurant, index)}
//             </React.Fragment>
//           ))}
//         </Animated.ScrollView>
//       </View>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     searchBarContainer: {
//       backgroundColor: 'transparent',
//       position: 'absolute',
//       top: 90,
//       left: 0,
//       right: 0,
//       zIndex: 1,
//       alignItems: 'center',
//     },
//     scrollView: {
//         paddingBottom: 120,
//         paddingHorizontal: 8, // Add this line to create gaps on the left and right sides
//       },
//     map: {
//       flex: 1,
//     },
//     customCallout: {
//         backgroundColor: 'white',
//         padding: 8,
//         borderRadius: 8,
//       },
//       calloutText: {
//         fontWeight: 'bold',
//       },
//       restaurantScrollViewContainer: {
//         position: 'absolute',
//         bottom: 10,
//         left: 10,
//         right: 10,
//         paddingHorizontal: 20, // Adjust this value as needed
//     },
//     restaurantCard: {
//         backgroundColor: '#F2E9FF',
//         borderRadius: 30,
//         padding: 10,
//         width: 250,
//         height: 220,
//         alignItems: 'center',
//         overflow: 'visible', // Allow image to appear outside of card
//         marginRight: 10, // Decrease this value to reduce the space between cards
//       },
//       imageContainer: {
//         position: 'absolute',
//         top: -40, // Move image up by half
//         height: 100,
//         width: 100,
//         borderRadius: 50, // To maintain the circular shape
//         overflow: 'visible', // Allow image to overflow outside the container
//         zIndex: 1, // Ensure image is displayed above card
//       },
//       restaurantImage: {
//         height: '100%',
//         width: '100%',
//         borderRadius: 50, // To maintain the circular shape
//       },
//       restaurantName: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginTop: 60, // Offset for image
//       },
//       restaurantCuisine: {
//         fontSize: 16, // Increase this value to make the text larger
//         color: 'gray',
//       },
//       restaurantLocation: {
//         fontSize: 16, // Increase this value to make the text larger
//         color: 'gray',
//       },
//       restaurantRating: {
//         fontSize: 16, // Increase this value to make the text larger
//         color: 'gray',
//         marginTop: 5,
//       },
//       iconRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 8,
//         borderRadius: 25, // Increase this value to make the container more curvy
//         backgroundColor: '#efe4f5', 
//         padding: 20, // Reduce this value to make the container smaller
//         shadowColor: '#000',
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//       },
//       iconImage: {
//         width: 30, // Reduce this value to make the image smaller
//         height: 30, // Reduce this value to make the image smaller
//         borderRadius: 15, // Reduce this value to match the image size
//       },
//     iconTextContainer: {
//       flex: 1,
//       marginLeft: 20,
//     },
//     iconText: {
//       fontWeight: 'bold',
//       fontSize: 18,
//       color: '#4e70ab',
//     },
//     iconSubText: {
//       color: '#999999',
//     },
//     markerContainer: {
//       flexDirection: 'row',
//       backgroundColor: 'white',
//       borderRadius: 5,
//       padding: 5,
//       borderColor: 'black',
//       borderWidth: 1,
//     },
//     markerImage: {
//       width: 40,
//       height: 40,
//       borderRadius: 20,
//     },
//     markerText: {
//       fontWeight: 'bold',
//       fontSize: 16,
//       marginLeft: 5,
//     },
//     searchButtonContainer: {
//       position: 'absolute',
//       bottom: 20,
//       left: 20,
//       right: 20,
//       zIndex: 1,
//     },
//     userLocationButtonContainer: {
//         position: 'absolute',
//         top: 130, // Adjust this value as needed
//         right: 20,
//         zIndex: 1,
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         backgroundColor: '#f5dff0', 
//         justifyContent: 'center',
//         alignItems: 'center',
//         shadowColor: 'black',
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
      
//         elevation: 5,
//       },
//   });

// export default BrowseScreen;