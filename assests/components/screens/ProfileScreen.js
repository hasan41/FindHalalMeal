import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Profile screen</Text>
      <Button
        title= "Click Here"
        onPress={() => alert('Butotn Clicked')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8fcbbc',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProfileScreen;
