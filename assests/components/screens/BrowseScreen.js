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
