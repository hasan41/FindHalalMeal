// CartIcon.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const iconContainerStyle = {
  marginRight: 6,
  backgroundColor: '#f5dff0',
  borderRadius: 50,
  padding: 8,
};

const CartIcon = () => (
  <TouchableOpacity style={iconContainerStyle}>
    <Ionicons name="cart-outline" size={22} color="tomato"/>
  </TouchableOpacity>
);

export default CartIcon;
