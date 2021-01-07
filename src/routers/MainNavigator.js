import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainTabs from '../routers/MainTabs';
import SignInScreen from '../containers/SignInScreen';
import SignUpScreen from '../containers/SignUpScreen';
import LoadingScreen from '../containers/LoadingScreen';
import VerificationScreen from '../containers/VerificationScreen';
import AddGameScreen from '../containers/AddGameScreen';
import ForgotPasswordScreen from '../containers/ForgotPasswordScreen';
import ChangePasswordScreen from '../containers/ChangePasswordScreen';

import {colors} from '../constants/globalStyles';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen">
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              shadowColor: 'transparent',
              height: 30,
              elevation: 0,
              backgroundColor: colors.cherry,
            },
            headerLeft: () => {
              return null;
            },
          }}
        />
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VerificationScreen"
          component={VerificationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddGameScreen"
          component={AddGameScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
