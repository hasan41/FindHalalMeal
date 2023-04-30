  import React from 'react';
  //BottomTabNavigator
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import TabNavigator from './assests/components/bottom-nav-bar/TabNavigator';
  import {NavigationContainer} from '@react-navigation/native';

  const Tab = createBottomTabNavigator();

  function App() {
    return (
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
    );
  }

  export default App;
