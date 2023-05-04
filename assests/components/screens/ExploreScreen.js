import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBar from '../bottom-nav-bar/SearchBar';

const ICON_SIZE = 46;

const icons = [
  { name: 'pizza', label: 'Pizza' },
  { name: 'hamburger', label: 'Burger' },
  { name: 'food-halal', label: 'Halal' },
  { name: 'cake', label: 'Cake' },
  { name: 'cookie', label: 'Cookie' },
  { name: 'ice-cream', label: 'Ice Cream' },
  { name: 'coffee', label: 'Coffee' },
  { name: 'beer', label: 'Beer' },
  { name: 'food-apple', label: 'Apple' },
  { name: 'food-turkey', label: 'Turkey' },
  { name: 'food-kosher', label: 'Kosher' },
  { name: 'food-steak', label: 'Steak' },
];

const ExploreScreen = () => {
  const rows = Math.floor(icons.length / 4);
  const lastRowIconsCount = icons.length % 4;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Explore</Text>
      </View>
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.grid}>
          {[...Array(rows)].map((_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {[...Array(4)].map((_, colIndex) => {
                const iconIndex = rowIndex * 4 + colIndex;
                const icon = icons[iconIndex];
                return (
                  <TouchableOpacity key={icon.name} style={styles.iconContainer}>
                    <View style={styles.iconBackground}>
                      <MaterialCommunityIcons name={icon.name} size={ICON_SIZE} color="#ff82b2" />
                    </View>
                    <Text style={styles.iconLabel}>{icon.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
          {lastRowIconsCount > 0 && (
            <View style={styles.row}>
              {[...Array(lastRowIconsCount)].map((_, colIndex) => {
                const iconIndex = icons.length - lastRowIconsCount + colIndex;
                const icon = icons[iconIndex];
                return (
                  <TouchableOpacity key={icon.name} style={styles.iconContainer}>
                    <View style={styles.iconBackground}>
                      <MaterialCommunityIcons name={icon.name} size={ICON_SIZE} color="#ff82b2" />
                    </View>
                    <Text style={styles.iconLabel}>{icon.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        <View style={styles.searchBarContainer}>
          {/* Your SearchBar component goes here */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bbd1ed',
  },
  headerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 0,
    marginLeft: -240,
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
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -340,
    },
    row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 6,
    },
    iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: ICON_SIZE + 20,
    height: ICON_SIZE + 32,
    margin: 2,
    },
    iconBackground: {
    width: ICON_SIZE + 10,
    height: ICON_SIZE,
    backgroundColor: '#d3c5fa',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    },
    iconLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#5a5e56',
    marginTop: 6,
    },
    });
    export default ExploreScreen;

