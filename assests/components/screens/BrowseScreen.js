    import React from 'react';
    import { View, StyleSheet, Text, ScrollView } from 'react-native';
    import SearchBar from '../bottom-nav-bar/SearchBar';
    import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
    import { Ionicons } from '@expo/vector-icons';

    const BrowseScreen = () => {
    return (
        <View style={styles.container}>
        <View style={styles.searchBarContainer}>
            <SearchBar style={styles.searchBarContainer}/>
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
        >
        </MapView>
        <View style={styles.bottomSheet}>
            <ScrollView contentContainerStyle={styles.bottomSheetContent}>
        <View style={styles.iconRow}>
        <Ionicons name="restaurant-outline" size={24} color="black" />
        <View style={styles.iconTextContainer}>
            <Text style={styles.iconText}>Restaurant Name</Text>
            <Text style={styles.iconSubText}>Restaurants details...</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
        <View style={styles.iconRow}>
        <Ionicons name="restaurant-outline" size={24} color="black" />
        <View style={styles.iconTextContainer}>
            <Text style={styles.iconText}>Restaurant Name</Text>
            <Text style={styles.iconSubText}>Restaurants details...</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
        <View style={styles.iconRow}>
        <Ionicons name="restaurant-outline" size={24} color="black" />
        <View style={styles.iconTextContainer}>
            <Text style={styles.iconText}>Restaurant Name</Text>
            <Text style={styles.iconSubText}>Restaurants details...</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
        <View style={styles.iconRow}>
        <Ionicons name="restaurant-outline" size={24} color="black" />
        <View style={styles.iconTextContainer}>
            <Text style={styles.iconText}>Restaurant Name</Text>
            <Text style={styles.iconSubText}>Restaurants details...</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
        <View style={styles.iconRow}>
        <Ionicons name="restaurant-outline" size={24} color="black" />
        <View style={styles.iconTextContainer}>
            <Text style={styles.iconText}>Restaurant Name</Text>
            <Text style={styles.iconSubText}>Restaurants details...</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
        <View style={styles.iconRow}>
        <Ionicons name="restaurant-outline" size={24} color="black" />
        <View style={styles.iconTextContainer}>
            <Text style={styles.iconText}>Restaurant Name</Text>
            <Text style={styles.iconSubText}>Restaurants details...</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
        <View style={styles.iconRow}>
        <Ionicons name="restaurant-outline" size={24} color="black" />
        <View style={styles.iconTextContainer}>
            <Text style={styles.iconText}>Restaurant Name</Text>
            <Text style={styles.iconSubText}>Restaurants details...</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
    </ScrollView>
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
    map: {
        flex: 1,
    },
    bottomSheetContent: {
        paddingBottom: 20,
    },
    bottomSheet: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        flex: 1,
        justifyContent: 'flex-end',
      },
      iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        borderRadius: 50,
        backgroundColor: '#efe4f5',
        padding: 20,
      },      
      
    // iconRow: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginVertical: 10,
    // },
    iconTextContainer: {
        flex: 1,
        marginLeft: 10,
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


//     import React from 'react';
//     import {
//       View,
//       StyleSheet,
//       Text,
//       ScrollView,
//       Animated,
//       Dimensions,
//     } from 'react-native';
//     import { PanGestureHandler, State } from 'react-native-gesture-handler';
//     import { onGestureEvent } from 'react-native-redash';
    
//     const bottomSheetContentPadding = 20;
//     const iconRowHeight = 70;
//     const deviceHeight = Dimensions.get('window').height;
//     const paddingBottom =
//       deviceHeight - bottomSheetContentPadding - iconRowHeight * 3; // assuming there are three iconRow components
    
//     const BottomSheet = () => {
//       const translateY = new Animated.Value(0);
    
//       const gestureHandler = onGestureEvent({ y: translateY });
    
//       return (
//         <View style={styles.container}>
//           <View style={styles.searchBarContainer}>
//             <Text style={styles.searchBarText}>Search Bar</Text>
//           </View>
//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <View style={styles.mapContainer}>
//               <Text style={styles.mapText}>Map View</Text>
//             </View>
//           </ScrollView>
//           <View style={styles.bottomSheet}>
//             <PanGestureHandler
//               onGestureEvent={gestureHandler}
//               onHandlerStateChange={({ nativeEvent }) => {
//                 if (nativeEvent.state === State.END) {
//                   // animate to the nearest 100px position
//                   Animated.timing(translateY, {
//                     toValue: Math.round(nativeEvent.translationY / 100) * 100,
//                     duration: 200,
//                     useNativeDriver: true,
//                   }).start();
//                 }
//               }}>
//               <Animated.View
//                 style={[
//                   styles.bottomSheetContent,
//                   { paddingBottom, transform: [{ translateY }] },
//                 ]}>
//                 <View style={styles.iconRow}>
//                   <Text style={styles.iconText}>Icon 1</Text>
//                 </View>
//                 <View style={styles.iconRow}>
//                   <Text style={styles.iconText}>Icon 2</Text>
//                 </View>
//                 <View style={styles.iconRow}>
//                   <Text style={styles.iconText}>Icon 3</Text>
//                 </View>
//               </Animated.View>
//             </PanGestureHandler>
//           </View>
//         </View>
//       );
//     };
    
//     const styles = StyleSheet.create({
//       container: {
//         flex: 1,
//       },
//       searchBarContainer: {
//         height: 60,
//         backgroundColor: 'white',
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       searchBarText: {
//         fontSize: 20,
//       },
//       scrollContainer: {
//         flex: 1,
//       },
//       mapContainer: {
//         height: 300,
//         backgroundColor: 'gray',
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       mapText: {
//         fontSize: 20,
//       },
//       bottomSheet: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         backgroundColor: 'white',
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         shadowColor: 'black',
//         shadowOffset: {
//           width: 0,
//           height: -2,
//         },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//         elevation: 3,
//       },
//       bottomSheetContent: {
//         padding: bottomSheetContentPadding,
//         backgroundColor: 'white',
//       },
//       iconRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: iconRowHeight,
//         borderBottomWidth: StyleSheet.hairlineWidth,
//         borderBottomColor: 'gray',
//           },
//   iconText: {
//     fontSize: 20,
//   },
// });

// export default BottomSheet;

    