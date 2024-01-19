import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import SearchBar from '../search/SearchBar';

const CustomBottomSheet = ({ bottomSheetRef }) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={['1%', '90%']}
      enablePanDownToClose={true}
      backgroundComponent={() => (
        <View style={styles.bottomSheetBackground} />
      )}
    >
      <View style={styles.sheetContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.exploreText}>Explore nearby</Text>
        </View>
        <SearchBar />
        <Text style={styles.sheetTitle}>Addresses</Text>
        {/* Add your address content here */}
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
    backgroundColor: '#f5dff0',
    paddingHorizontal: 2,
    paddingTop: 16,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  sheetTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 466,
  },
  headerContainer: {
    alignItems: 'flex-start',
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
});

export default CustomBottomSheet;
