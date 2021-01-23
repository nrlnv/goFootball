import React, {useEffect} from 'react';

import {SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';

// import * as firebase from 'firebase';
import auth from '@react-native-firebase/auth';

const LoadingScreen = ({navigation}) => {
  useEffect(() => {
    auth().onAuthStateChanged((authenticate) => {
      if (authenticate) {
        navigation.replace('VerificationScreen');
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
