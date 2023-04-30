import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <Button
        title= "Click Here"
        onPress={() => alert('Butotn Clicked')}
      />
    </View>
  );
};

export default SettingsScreen;

