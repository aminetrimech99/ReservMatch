// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Accueil from '../interfaces/Accueil';
import Profile from '../interfaces/Profile';
import { Text } from 'react-native';
import SvgUri from 'react-native-svg-uri';

const Tab = createBottomTabNavigator();

const HomeIcon = ({ focused }) => (
  <SvgUri
    source={require('../assets/home.svg')}
    style={{ width: 24, height: 24, tintColor: focused ? 'blue' : 'gray' }}
  />
);

const ProfileIcon = ({ focused }) => (
  <SvgUri
    source={require('../assets/profile.svg')}
    style={{ width: 24, height: 24, tintColor: focused ? 'blue' : 'gray' }}
  />
);

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Accueil"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={Accueil}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'blue' : 'gray' }}>Accueil</Text>
          ),
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'blue' : 'gray' }}>Profile</Text>
          ),
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
