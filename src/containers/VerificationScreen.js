import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import Logo from '../components/Logo';
import Button from '../components/Button';

import * as firebase from 'firebase';

const FiledsScreen = ({navigation}) => {
  var user = firebase.auth().currentUser;

  useEffect(() => {
    isVerified();
  });

  const isVerified = () => {
    user.reload();
    if (user.emailVerified) {
      navigation.replace('MainTabs');
    }
  };

  const signOutUser = () => {
    user
      .delete()
      .then(() => console.log('user deleted'))
      .catch((error) => console.log(error.message));
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('back to home screen');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      {!user.emailVerified && (
        <View style={styles.welcomeView}>
          <Text style={styles.title}>Welcome, {user.displayName}!</Text>
          <Text style={styles.body}>
            You are almost ready to start enjoying goFootball, to complete
            registration, please confirm your email, verification link has been
            sent. Click Done once email is confirmed or go Back to home screen.
          </Text>
          <Button text="Done" onPress={() => isVerified()} />
          <Button text="Back to home" onPress={() => signOutUser()} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  welcomeView: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5.84,

    elevation: 5,
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '800',
  },
  body: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default FiledsScreen;
