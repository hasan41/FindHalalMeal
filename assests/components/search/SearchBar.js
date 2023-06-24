import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';


const SearchBar = ({onApplySort}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [ratingSort, setRatingSort] = useState(false);
  const [deliverySort, setDeliverySort] = useState(false);
  const [cuisineSort, setCuisineSort] = useState(false);
  const [priceRange, setPriceRange] = useState(null);

  const applySort = () => {
    onApplySort({ ratingSort, deliverySort, cuisineSort, priceRange });
    setModalVisible(false);
  };

  const clearSort = () => {
    setRatingSort(false);
    setDeliverySort(false);
    setCuisineSort(false);
    setPriceRange(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <LinearGradient
          colors={['#fcc5dc', '#E5BEEC']}
          start={[0, 1]}
          end={[1, 0]}
          style={styles.gradient}
        >
          <FontAwesome name="search" size={22} color="#fc4992" style={styles.iconStyle} />
          <TextInput
            placeholder="Search Halal"
            placeholderTextColor="#fc4992"
            style={styles.inputStyle}
          />
          <View style={styles.separator} />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FontAwesome name="unsorted" size={24} color="#fc4992" style={styles.iconStyle} />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={{ backgroundColor: 'white', padding: 22, borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.1)' }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Sort Filter</Text>
            <TouchableOpacity onPress={clearSort}>
              <Text style={styles.clearButton}>Clear</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sortOptionText}>Sort</Text>
          <View style={styles.sortOption}>
            <Text>Rating</Text>
            <Switch value={ratingSort} onValueChange={setRatingSort} trackColor={{true: 'green'}} />
          </View>
          <View style={styles.sortOption}>
            <Text>Delivery Time</Text>
            <Switch value={deliverySort} onValueChange={setDeliverySort} trackColor={{true: 'green'}} />
          </View>
          <View style={styles.sortOption}>
            <Text>Cuisine Types</Text>
            <Switch value={cuisineSort} onValueChange={setCuisineSort} trackColor={{true: 'green'}} />
          </View>

          <Text style={{fontSize: 16, marginBottom: 5, marginTop: 20, marginBottom: 20}}>Price Range</Text>
            <View style={styles.priceRange}>
              <TouchableOpacity style={priceRange === '$' ? styles.priceButtonActive : styles.priceButton} onPress={() => setPriceRange('$')}>
                <Text style={priceRange === '$' ? styles.priceButtonTextActive : styles.priceButtonText}>$</Text>
              </TouchableOpacity>
              <TouchableOpacity style={priceRange === '$$' ? styles.priceButtonActive : styles.priceButton} onPress={() => setPriceRange('$$')}>
                <Text style={priceRange === '$$' ? styles.priceButtonTextActive : styles.priceButtonText}>$$</Text>
              </TouchableOpacity>
              <TouchableOpacity style={priceRange === '$$$' ? styles.priceButtonActive : styles.priceButton} onPress={() => setPriceRange('$$$')}>
                <Text style={priceRange === '$$$' ? styles.priceButtonTextActive : styles.priceButtonText}>$$$</Text>
              </TouchableOpacity>
            </View>

          <TouchableOpacity style={styles.applyButton} onPress={applySort}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
    marginTop: -18,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 25,
    paddingLeft: 15,
    overflow: 'hidden',
    width: '100%',
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 18,
    color: 'white',
    backgroundColor: 'transparent',
  },
  iconStyle: {
    marginRight: 10,
  },
  separator: {
    borderLeftWidth: 1,
    borderLeftColor: '#fc4992',
    height: '80%',
    marginRight: 10,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingLeft: 15,
    height: 40,
    width: '100%',
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  sortOptionText: {
    fontSize: 18, 
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: '#fc4992',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    fontSize: 20,
  },
  clearButton: {
    fontSize: 16,
    color: '#fc4992',
  },
  priceRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  priceButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  priceButtonActive: {
    backgroundColor: 'white',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  priceButtonText: {
    color: 'grey',
    fontSize: 16,
  },
  priceButtonTextActive: {
    color: 'black',
    fontSize: 14,
  },
});

export default SearchBar;
