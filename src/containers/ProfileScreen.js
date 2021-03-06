/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';

import Button from '../components/Button';
import {colors, scale} from '../constants/globalStyles';

const ProfileScreen = ({navigation}) => {
  const user = auth().currentUser;

  // const [email, setEmail] = useState('');
  // const [name, setName] = useState('');
  const name = user.displayName;
  const email = user.email;
  const uid = user.uid;
  // const photoUrl = user.photoURL;
  const [city, setCity] = useState('Орал');
  const [photoUrl, setPhotoUrl] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    // const unsubscribe = navigation.addListener('didFocus', () => {
    auth().onAuthStateChanged((authenticate) => {
      if (authenticate) {
        // setEmail(authenticate.email);
        // setName(authenticate.displayName);
        setPhotoUrl(authenticate.photoURL);
      } else {
        navigation.replace('SignInScreen');
      }
    });
    var userRef = database().ref('/users/' + uid);
    userRef.once('value').then((snapshot) => {
      // console.log('User data: ', snapshot.val().city);
      setCity(snapshot.val().city);
    });
    // });
    // userRef.on('value', (dataSnapshot) => {
    //   if (dataSnapshot.val()) {
    //     const userDetail = Object.values(dataSnapshot.val());
    //     // console.log('city: ', fieldsList[1]);
    //     setCity(userDetail[0]);
    //     console.log(userDetail);
    //   }
    // });
    // return unsubscribe;
  }, [navigation, uid, isFocused]);

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
              <Image style={styles.imageView} source={{uri: photoUrl}} />
            ) : (
              <Image
                source={require('../assets/avatar.png')}
                style={{width: 100, height: 100}}
              />
            )}
          </View>
          <Text style={styles.detailText}>
            {name} {'\n'} {email} {'\n'} {city}
          </Text>
          <TouchableOpacity
            style={styles.editView}
            onPress={() => navigation.navigate('ChangePhotoScreen')}>
            <Icon name="account-edit-outline" size={30} color={colors.cherry} />
          </TouchableOpacity>
        </View>
        <View style={styles.userDetails}>
          <Button
            text="Сменить пароль"
            onPress={() => navigation.navigate('ChangePasswordScreen')}
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
    marginHorizontal: scale(20),
    padding: scale(20),
    borderRadius: scale(20),
  },
  detailText: {
    textAlign: 'center',
    fontSize: scale(20),
    fontWeight: '600',
    color: colors.cherry,
  },
  avatar: {
    backgroundColor: colors.cherry,
    borderRadius: scale(150 / 2),
    width: scale(100),
    height: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoView: {
    marginTop: scale(40),
    marginBottom: scale(40),
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.marzipan,
    width: scale(320),
    height: scale(190),
    paddingVertical: scale(10),
    borderRadius: scale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: scale(0.95),
    shadowRadius: scale(5.84),
    elevation: scale(5),
  },
  editView: {
    position: 'absolute',
    top: scale(10),
    right: scale(10),
  },
  imageView: {
    width: scale(100),
    height: scale(100),
    borderRadius: 150 / 2,
  },
});

export default ProfileScreen;
