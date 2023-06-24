import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SortButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ marginLeft: 10 }}>
    <Ionicons name="ios-filter" size={24} color="#fc4992" />
  </TouchableOpacity>
);

export default SortButton;
