import React from 'react';

import MainScreen from '../containers/MainScreen';
import ProfileScreen from '../containers/ProfileScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator initialRouteName="MainScreen">
      <Tab.Screen name="MainScreen" component={MainScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
