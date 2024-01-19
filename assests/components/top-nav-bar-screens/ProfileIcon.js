import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const iconStyle = {
    marginRight: 6,
    backgroundColor: '#f5dff0',
    borderRadius: 50,
    padding: 8,
  };

const ProfileIcon = () => (
    <TouchableOpacity style={iconStyle}>
      <Ionicons name="person-outline" size={22} color="tomato"/>
    </TouchableOpacity>
  );
  
  export default ProfileIcon;