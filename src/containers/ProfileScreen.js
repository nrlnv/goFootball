/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import auth from '@react-native-firebase/auth';

import Button from '../components/Button';
import {colors, scale} from '../constants/globalStyles';

const ProfileScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      auth().onAuthStateChanged((authenticate) => {
        if (authenticate) {
          setEmail(authenticate.email);
          setName(authenticate.displayName);
          setPhotoUrl(authenticate.photoURL);
        } else {
          navigation.replace('SignInScreen');
        }
      });
    });
    return unsubscribe;
  }, [navigation]);

  const signOutUser = () => {
    auth()
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
      <View style={styles.mainContainer}>
        <View style={styles.photoView}>
          <View style={styles.avatar}>
            {photoUrl ? (
              <Image
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 150 / 2,
                }}
                source={{uri: photoUrl}}
              />
            ) : (
              <Image
                source={require('../assets/avatar.png')}
                style={{width: 100, height: 100}}
              />
            )}
          </View>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.detailText}>Привет, {name}</Text>
          <Text style={styles.detailText}>Вы вошли как {email}</Text>
          <Button
            text="Сменить пароль"
            onPress={() => navigation.navigate('ChangePasswordScreen')}
          />
          <Button
            text="Сменить фото"
            onPress={() => navigation.navigate('ChangePhotoScreen')}
          />
          <Button text="Выйти" onPress={() => signOutUser()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mulled,
  },
  mainContainer: {
    backgroundColor: colors.cherry,
    flex: 1,
    borderBottomLeftRadius: scale(40),
    borderBottomRightRadius: scale(40),
  },
  userDetails: {
    backgroundColor: colors.marzipan,
    marginHorizontal: scale(20),
    padding: scale(20),
    borderRadius: scale(20),
  },
  detailText: {
    alignSelf: 'center',
    fontSize: scale(15),
    color: colors.cherry,
  },
  avatar: {
    backgroundColor: colors.marzipan,
    borderRadius: scale(150 / 2),
    width: scale(120),
    height: scale(120),
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoView: {
    marginTop: scale(40),
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: scale(40),
  },
});

export default ProfileScreen;
