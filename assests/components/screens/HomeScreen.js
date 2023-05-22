import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../bottom-nav-bar/SearchBar';

const ICONS = [
  { id: 0, name: 'ios-restaurant', label: 'Food' },
  { id: 1, name: 'ios-cart', label: 'Grocery' },
  { id: 2, name: 'ios-alarm', label: 'Cool' },
  { id: 3, name: 'ios-medical', label: 'Medicine' },
  { id: 4, name: 'ios-pizza', label: 'Pizza'},
  { id: 5, name: 'ios-ice-cream', label: 'Dessert'},
  // Add more icons here
];

const HomeScreen = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const animations = ICONS.reduce((acc, _, index) => {
    acc[index] = new Animated.Value(1);
    return acc;
  }, {});

  const startAnimation = (index) => {
    setSelectedIcon(index);
    Animated.sequence([
      Animated.timing(animations[index], {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
  }

  const renderItem = ({ item, index }) => {
    const rotateAnimation = animations[index].interpolate({
      inputRange: [1, 1.5],
      outputRange: ['0deg', '45deg']
    });

    return (
      <TouchableOpacity 
        style={[
          styles.iconContainer, 
          {backgroundColor: item.id === selectedIcon ? '#b9a2fa' : '#ffcbc2'}
        ]}
        onPress={() => startAnimation(index)}
      >
        <View style={[styles.imageContainer, { backgroundColor: item.id === selectedIcon ? '#ff82b2' : '#d3c5fa' }]}>
          <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
            <Ionicons name={item.name} size={24} color={item.id === selectedIcon ? '#ffcbc2' : '#ff82b2'} />
          </Animated.View>
        </View>
        <Text style={styles.iconLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Find Halal</Text>
      </View>
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>
      <View style={styles.iconsContainer}>
        <FlatList
          data={ICONS}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.iconsList}
        />
      </View>
      <View style={styles.line} />
      <View style={styles.contentContainer}>
        <Text>Home Screen</Text>
        <Button
          title= "Click Here"
          onPress={() => alert('Button Clicked')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffdfd9', //bbd1ed
  },
  headerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 50,
    marginLeft: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  searchBarContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  iconsList: {
    paddingHorizontal: 0,
    marginRight: 12,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 40, // Adjust to get the oval shape
    paddingVertical: 10, // Padding to include text within the oval shape
    height: 110, // Adjust this as per your requirement
    width: 62, // Adjust this as per your requirement
    overflow: 'hidden' // This will make sure that the child components do not overflow the boundaries of the container
  },
  imageContainer: {
    position: 'absolute', // This allows you to move the view around inside the container using top, bottom, left, and right
    top: 5, // This moves the view up by 15 pixels. Adjust this as per your requirement
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#d3c5fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
    width: '100%',
  },
  iconLabel: {
    marginTop: 50,
    color: 'black',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
