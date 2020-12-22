import React from 'react';

import GamesScreen from '../containers/GamesScreen';
import ProfileScreen from '../containers/ProfileScreen';
import FieldsScreen from '../containers/FieldsScreen';
import AddGameScreen from '../containers/AddGameScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'native-base';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="GamesScreen"
      tabBarOptions={{
        inactiveTintColor: 'white',
        activeTintColor: '#fb74bb',
        style: {
          backgroundColor: '#3e206d',
          borderTopColor: '#3e206d',
          height: 90,
        },
      }}>
      <Tab.Screen
        name="GamesScreen"
        component={GamesScreen}
        options={{
          tabBarLabel: 'Games',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="sports-soccer" color={color} size={30} />
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
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddGameScreen"
        component={AddGameScreen}
        options={{
          tabBarLabel: 'Add Game',
          tabBarIcon: ({color}) => (
            <AntDesign name="pluscircle" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile settings',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="person-outline" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
