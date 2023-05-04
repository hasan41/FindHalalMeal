import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

const ExpandableScrollView = ({ isExpanded, toggleExpand, contentContainerStyle }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={toggleExpand}>
        <Text>{isExpanded ? 'Collapse' : 'Expand'}</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}>
          <View style={{ height: isExpanded ? 1000 : 300 }}>
            <Text>{isExpanded ? 'Expanded' : 'Collapsed'}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ExpandableScrollView;
