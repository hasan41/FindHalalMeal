import React from 'react';
import {StyleSheet, FlatList, View, Text, Dimensions, Image, ScrollView, Button} from 'react-native';
import SearchBar from '../search/SearchBar';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
} from 'react-native-reanimated';

import halalRestaurantData from '../../../Halal_restaurant_data.json';

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#d7cdf7'}}>
      <Text>Settings Screen</Text>
      <Button
        title= "Click Here"
        onPress={() => alert('Butotn Clicked')}
      />
    </View>
  );
};

export default ProfileScreen;

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
// const ITEM_SPACING = 2;

// const items = halalRestaurantData.Georgia.AtlantaMetro.map((restaurant, index) => {
//   return {
//     id: index + 1,
//     text: restaurant.name,
//     link: restaurant.link,
//     photo: restaurant.photo,
//     cuisine: restaurant.cuisine,
//     location: restaurant.location,
//     rating: restaurant.rating,
//   };
// });

// const {width: SCREEN_WIDTH} = Dimensions.get('window');
// const ITEM_WIDTH = SCREEN_WIDTH / 1.8; // make boxes larger
// const ITEM_HEIGHT = ITEM_WIDTH;

// const Home = () => {
  
//   const transX = useSharedValue(0);

//   const renderItem = ({item, index}) => {
//     return <Item index={index} item={item} transX={transX} />;
//   };

//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       transX.value = event.contentOffset.x;
//     },
//   });

//   return (
//     <View style={styles.container}>
//       <View style={styles.listContainer}>
//         <AnimatedFlatList
//           onScroll={scrollHandler}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.list}
//           data={items}
//           decelerationRate="fast"
//           snapToInterval={ITEM_WIDTH + ITEM_SPACING} // Snap to the width of the item + the spacing
//           scrollEventThrottle={16}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => `${item.id}-${index}`}
//           contentContainerStyle={{ // Add padding to the content container
//             paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2 - ITEM_SPACING / 2,
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// const Item = ({index, item, transX}) => {
//   const udv = useDerivedValue(() => {
//     if (
//       transX.value >= (index - 3) * ITEM_WIDTH &&
//       transX.value <= (index + 3) * ITEM_WIDTH
//     ) {
//       return transX.value;
//     } else if (transX.value < (index - 3) * ITEM_WIDTH) {
//       return (index - 3) * ITEM_WIDTH;
//     } else if (transX.value > (index + 3) * ITEM_WIDTH) {
//       return (index + 3) * ITEM_WIDTH;
//     }
//   });

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{scale: scaleAnimation(udv, index)}],
//       opacity: opacityAnimation(transX, index),
//     };
//   });

//   return (
//     <Animated.View style={[styles.box, animatedStyle]} item={item}>
//       <ScrollView contentContainerStyle={{alignItems: 'center'}}>
//         <Text style={styles.label}>{item.text}</Text>
//         <Text>{item.cuisine}</Text>
//         <Text>{item.location}</Text>
//         <Text>{item.rating}</Text>
//         <Image style={styles.image} source={{uri: item.photo}} />
//       </ScrollView>
//     </Animated.View>
//   );
  
// };

// const scaleAnimation = (udv, index) => {
//   'worklet';

//   return udv.value === null
//     ? 0
//     : interpolate(
//         udv.value,
//         [
//           (index - 2) * (ITEM_WIDTH + ITEM_SPACING),
//           (index - 1) * (ITEM_WIDTH + ITEM_SPACING),
//           index * (ITEM_WIDTH + ITEM_SPACING),
//           (index + 1) * (ITEM_WIDTH + ITEM_SPACING),
//           (index + 2) * (ITEM_WIDTH + ITEM_SPACING),
//         ],
//         [0.5, 0.7, 1, 0.7, 0.5],
//         Extrapolate.CLAMP,
//       );
// };

// const opacityAnimation = (transX, index) => {
//   'worklet';

//   return interpolate(
//     transX.value,
//     [
//       (index - 3) * ITEM_WIDTH,
//       (index - 2) * ITEM_WIDTH,
//       (index - 1) * ITEM_WIDTH,
//       index * ITEM_WIDTH,
//       (index + 1) * ITEM_WIDTH,
//       (index + 2) * ITEM_WIDTH,
//       (index + 3) * ITEM_WIDTH,
//     ],
//     [0, 0.5, 0.8, 1, 0.8, 0.5, 0],
//     Extrapolate.CLAMP,
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#efefef',
//   },
//   listContainer: {
//     height: ITEM_HEIGHT + 250,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   list: {
//     height: ITEM_HEIGHT * 2,
//   },
//   box: {
//     marginHorizontal: ITEM_SPACING / 2, // Add horizontal margin to the box
//     width: ITEM_WIDTH,
//     height: ITEM_HEIGHT,
//     backgroundColor: 'blue',
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 6,
//     },
//     shadowOpacity: 0.37,
//     shadowRadius: 7.49,

//     elevation: 12,
//   },

//   label: {
//     fontWeight: 'bold',
//     fontSize: 24,
//     color: '#fff',
//     textAlign: 'center', // center the text
//   },
//   image: {
//     width: ITEM_WIDTH - 40, // sufbtract padding
//     height: ITEM_HEIGHT / 2, // or whatever height you want
//     resizeMode: 'cover', // or 'contain' if you want to see the whole image
//   },
// });



// export default Home;