import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBar from '../search/SearchBar';
import { EXPLORE_ICONS, EXPLORE_RECTANGLE_ICONS } from '../../../assests/constants'

const ICON_SIZE = 48;
const RECTANGLE_ICON_SIZE = 80;


const ExploreScreen = () => {

  const rows = Math.floor(EXPLORE_ICONS.length / 4);
  const lastRowIconsCount = EXPLORE_ICONS.length % 4;

  const rectangleRows = Math.floor(EXPLORE_RECTANGLE_ICONS.length / 2);
  const lastRectangleRowIconsCount = EXPLORE_RECTANGLE_ICONS.length % 2;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Explore</Text>
      </View>
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={true}>
      <View style={styles.scrollContent}> 
        <View style={styles.grid}>
          {[...Array(rows)].map((_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {[...Array(4)].map((_, colIndex) => {
                const iconIndex = rowIndex * 4 + colIndex;
                const icon = EXPLORE_ICONS[iconIndex];
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
                const iconIndex = EXPLORE_ICONS.length - lastRowIconsCount + colIndex;
                const icon = EXPLORE_ICONS[iconIndex];
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
        <View style={styles.browseHeader}>
          <Text style={styles.browseHeaderText}>Halal food near me</Text>
        </View>
        <View style={styles.rectangleGrid}>
          {[...Array(rectangleRows)].map((_, rowIndex) => (
            <View key={rowIndex} style={styles.rectangleRow}>
              {[...Array(2)].map((_, colIndex) => {
                const iconIndex = rowIndex * 2 + colIndex;
                const icon = EXPLORE_RECTANGLE_ICONS[iconIndex];
                return (
                  <TouchableOpacity key={icon.name} style={styles.rectangleIconContainer}>
                    <View style={styles.rectangleIconBackground}>
                      <MaterialCommunityIcons name={icon.name} size={RECTANGLE_ICON_SIZE} color="#ff82b2" />
                    </View>
                    <Text style={styles.rectangleIconLabel}>{icon.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
          {lastRectangleRowIconsCount > 0 && (
            <View style={styles.rectangleRow}>
              {[...Array(lastRectangleRowIconsCount)].map((_, colIndex) => {
                const iconIndex = EXPLORE_RECTANGLE_ICONS.length - lastRectangleRowIconsCount + colIndex;
                const icon = EXPLORE_RECTANGLE_ICONS[iconIndex];
                return (
                  <TouchableOpacity key={icon.name} style={styles.rectangleIconContainer}>
                    <View style={styles.rectangleIconBackground}>
                      <MaterialCommunityIcons name={icon.name} size={RECTANGLE_ICON_SIZE} color="#ff82b2" />
                    </View>
                    <Text style={styles.rectangleIconLabel}>{icon.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5D4FF', //#bbd1ed #ffdfd9
  },
  headerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 0,
    marginLeft: 0,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginLeft: -170, // Add this line to move the text to the left
  },
  searchBarContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '100%',
    paddingTop: 20,
  },
  
  grid: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    height: ICON_SIZE + 28,
    margin: 1.4,
    },
    iconBackground: {
    width: ICON_SIZE + 20,
    height: ICON_SIZE + 8,
    backgroundColor: '#d3c5fa',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    },
    iconLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#5a5e56',
    marginTop: 4,
    },
    browseHeader: {
      marginTop: 20,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    browseHeaderText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      marginLeft: -140,
    },
    rectangleGrid: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 20,
    },
    rectangleRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      marginBottom: 6,
    },
    rectangleIconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: RECTANGLE_ICON_SIZE + 100, // Update the width
      height: RECTANGLE_ICON_SIZE + 30, // Update the height
      backgroundColor: '#d3c5fa',
      borderRadius: 20,
      margin: 1.4,
    },
    rectangleIconBackground: {
      position: 'absolute', // Set position to absolute
      bottom: 4, // Align the icon to the bottom right
      right: 4,
    },
    rectangleIconLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#5a5e56',
      position: 'absolute', // Set position to absolute
      top: 8, // Align the label to the top left
      left: 8,
    },
    scrollContent: {
      paddingBottom: 100, // Add some padding at the bottom
      flexGrow: 1,
    },
    });
    export default ExploreScreen;

