// SortModal.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const SortModal = ({ isVisible, onClose, onClear, onApplySort }) => {
    const [ratingSort, setRatingSort] = useState(false);
    const [deliverySort, setDeliverySort] = useState(false);
    const [cuisineSort, setCuisineSort] = useState(false);
    const [priceRange, setPriceRange] = useState(null);
  
    const applySort = () => {
      onApplySort({ ratingSort, deliverySort, cuisineSort, priceRange });
      onClose();
    };
  
    const clearSort = () => {
      setRatingSort(false);
      setDeliverySort(false);
      setCuisineSort(false);
      setPriceRange(null);
    };  

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalHeaderText}>Sort Filter</Text>
          <TouchableOpacity onPress={clearSort}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sortOptionText}>Sort</Text>
        <View style={styles.sortOption}>
          <Text>Rating</Text>
          <Switch value={ratingSort} onValueChange={setRatingSort} trackColor={{ true: 'green' }} />
        </View>
        <View style={styles.sortOption}>
          <Text>Delivery Time</Text>
          <Switch value={deliverySort} onValueChange={setDeliverySort} trackColor={{ true: 'green' }} />
        </View>
        <View style={styles.sortOption}>
          <Text>Cuisine Types</Text>
          <Switch value={cuisineSort} onValueChange={setCuisineSort} trackColor={{ true: 'green' }} />
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
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#f5dff0', 
    padding: 22, 
    borderRadius: 4, 
    borderColor: 'rgba(0, 0, 0, 0.1)',
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
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
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

export default SortModal;
