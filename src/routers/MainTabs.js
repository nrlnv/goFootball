import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import GamesScreen from '../containers/GamesScreen';
import ProfileScreen from '../containers/ProfileScreen';
import FieldsScreen from '../containers/FieldsScreen';

import {colors, scale} from '../constants/globalStyles';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="GamesScreen"
      tabBarOptions={{
        inactiveTintColor: 'white',
        activeTintColor: colors.marzipan,
        style: {
          backgroundColor: colors.mulled,
          borderTopColor: 'transparent',
          height: scale(75),
        },
      }}>
      <Tab.Screen
        name="GamesScreen"
        component={GamesScreen}
        options={{
          tabBarLabel: 'МАТЧИ',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="sports-soccer" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="FieldsScreen"
        component={FieldsScreen}
        options={{
          tabBarLabel: 'ФУТБОЛЬНЫЕ ПОЛЯ',
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'ПРОФИЛЬ',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="person-outline" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
