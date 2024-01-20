  // import React from 'react';
  // //BottomTabNavigator
  // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  // import TabNavigator from './assests/components/bottom-nav-bar/TabNavigator';
  // import {NavigationContainer} from '@react-navigation/native';

  // const Tab = createBottomTabNavigator();

  // function App() {
  //   return (
  //   <NavigationContainer>
  //       <TabNavigator />
  //   </NavigationContainer>
  //   );
  // }

  // export default App;


import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabNavigator from './assests/components/bottom-nav-bar/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
