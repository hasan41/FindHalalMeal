import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import SearchBar from '../search/SearchBar';

const CustomBottomSheet = ({ bottomSheetRef }) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={['1%', '92%']}
      enablePanDownToClose={true}
      backgroundComponent={() => (
        <View style={styles.bottomSheetBackground} />
      )}
    >
      <View style={styles.sheetContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.exploreText}>Addresses</Text>
        </View>
        <View style={styles.searchContainer}>
        <SearchBar isBottomSheet={true} />
        </View>
        <View style={styles.exploreNearbyContainer}>
          <Text style={styles.exploreNearbyText}>Explore nearby</Text>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    flex: 1,
    backgroundColor: 'white',
  },
  sheetContainer: {
    height: 630,
    backgroundColor: '#f5dff0',
    paddingHorizontal: 2,
    paddingTop: 16,
    borderRadius: 62,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  exploreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
    marginLeft: 30,
  },
  searchContainer: {
    marginBottom: 20, // Adjust as needed
  },
  exploreNearbyContainer: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10, // Adjust as needed
  },
  exploreNearbyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },
});

export default CustomBottomSheet;
