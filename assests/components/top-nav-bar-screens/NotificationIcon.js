// NotificationIcon.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const iconStyle = {
    marginRight: 6,
    backgroundColor: '#f5dff0',
    borderRadius: 50,
    padding: 8,
  };

const NotificationIcon = () => (
    <TouchableOpacity style={iconStyle}>
      <Ionicons name="notifications-outline" size={22} color="tomato"/>
    </TouchableOpacity>
  );

export default NotificationIcon;