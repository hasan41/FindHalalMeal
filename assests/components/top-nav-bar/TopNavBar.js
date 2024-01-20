// NavBar.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CartIcon from '../top-nav-bar-screens/CartIcon';
import NotificationIcon from '../top-nav-bar-screens/NotificationIcon';
import ProfileIcon from '../top-nav-bar-screens/ProfileIcon';

const NavBar = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
      <ProfileIcon />
      <NotificationIcon />
      <CartIcon />
    </View>
);

export default NavBar;
