import React from 'react';

import GamesScreen from '../containers/GamesScreen';
import ProfileScreen from '../containers/ProfileScreen';
import FieldsScreen from '../containers/FieldsScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator initialRouteName="GamesScreen">
      <Tab.Screen
        name="GamesScreen"
        component={GamesScreen}
        options={{
          tabBarLabel: 'Games',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="sports-soccer" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="FieldsScreen"
        component={FieldsScreen}
        options={{
          tabBarLabel: 'Football fields',
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
