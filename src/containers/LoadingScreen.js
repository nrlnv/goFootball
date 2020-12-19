import React, {useEffect} from 'react';

import {SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';

import * as firebase from 'firebase';

const LoadingScreen = ({navigation}) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((authenticate) => {
      if (authenticate) {
        navigation.replace('MainTabs');
      } else {
        navigation.replace('SignInScreen');
      }
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="grey" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingScreen;
