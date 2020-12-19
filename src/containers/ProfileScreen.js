import React, {useState, useEffect} from 'react';

import {View, StyleSheet, Text} from 'react-native';

import * as firebase from 'firebase';

import Button from '../components/Button';
import Logo from '../components/Logo';

const ProfileScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authenticate) => {
      if (authenticate) {
        setEmail(authenticate.email);
        setName(authenticate.displayName);
      } else {
        navigation.replace('SignInScreen');
      }
    });
  });
  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('sign out');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.userDetails}>
        <Text>Hey {name}</Text>
        <Text>You are signed in as {email}</Text>
      </View>
      <Button text="Sign out" onPress={() => signOutUser()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 100,
  },
  userDetails: {
    alignItems: 'center',
  },

  button: {
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
});

export default ProfileScreen;
