import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import * as firebase from 'firebase';

import Logo from '../components/Logo';
import Button from '../components/Button';
import {colors, scale} from '../constants/globalStyles';

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
          <Text style={styles.title}>Привет, {user.displayName}!</Text>
          <Text style={styles.body}>
            Осталось совсем немного, пожалуйста, подтвердите Ваш почтовый ящик,
            нажав на ссылку, которую, мы отправили на Вашу почту. Нажмите
            "Готово", после того, как подтвердите. Добро пожаловать в сообщество
            любителей футбола!
          </Text>
          <Button text="Готово" onPress={() => isVerified()} />
          <Button text="Назад" onPress={() => signOutUser()} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mulled,
  },
  welcomeView: {
    marginHorizontal: scale(10),
    marginTop: scale(250),
    backgroundColor: colors.marzipan,
    padding: scale(20),
    borderRadius: scale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: scale(0.95),
    shadowRadius: scale(5.84),
    elevation: scale(5),
  },
  title: {
    alignSelf: 'center',
    fontSize: scale(20),
    fontWeight: '800',
    color: colors.cherry,
  },
  body: {
    fontSize: scale(15),
    fontWeight: '400',
    textAlign: 'center',
    color: colors.cherry,
  },
});

export default FiledsScreen;
