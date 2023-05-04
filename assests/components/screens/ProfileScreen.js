import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#d7cdf7'}}>
      <Text>Settings Screen</Text>
      <Button
        title= "Click Here"
        onPress={() => alert('Butotn Clicked')}
      />
    </View>
  );
};

export default ProfileScreen;

