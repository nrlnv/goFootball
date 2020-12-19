import React from 'react';

import MainScreen from '../containers/MainScreen';
import ProfileScreen from '../containers/ProfileScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator initialRouteName="MainScreen">
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          tabBarLabel: 'Games',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="soccer-field"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile settings',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="person-outline" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
