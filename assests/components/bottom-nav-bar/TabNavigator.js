import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ReanimatedArc } from 'react-native-redash';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ExploreScreen from '../screens/ExploreScreen';
import BrowseScreen from '../screens/BrowseScreen';

const Tab = createBottomTabNavigator();

const AnimatedIcon = ({ name, color, size, focused }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: focused ? withSpring(-6) : 0 }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
};

const handleTabPress = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'ios-home';
          } else if (route.name === 'Profile') {
            iconName = 'ios-person';
          } else if (route.name === 'Explore') {
            iconName = 'ios-search';
          } else if (route.name === 'Browse') {
            iconName = 'ios-map';
          }

          return <AnimatedIcon name={iconName} size={size} color={color} focused={focused} />;
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: '#f5dff0',
          borderRadius: 50,
          height: 90,
          ...styles.shadow,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 3,
          marginLeft: 4,  // Add marginLeft
          marginRight: 4, // Add marginRight
        },
        tabBarIconStyle: {
          marginTop: 6,
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray', //8871cc
        tabBarButton: (props) => (
          <TouchableOpacity onPress={() => { handleTabPress(); props.onPress(); }}>
            <View style={[props.style, styles.iconContainer]}>
              {props.children}
            </View>
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Browse" component={BrowseScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
    shadow: {
      shadowColor: '#7F5DF0', //#88fc90
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
    iconContainer: {
      marginHorizontal: 22,
    },
  });
  
  export default TabNavigator;
  
