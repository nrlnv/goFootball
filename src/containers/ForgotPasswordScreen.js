/* eslint-disable no-alert */
import React, {useState} from 'react';
import {
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
} from 'react-native';
import * as firebase from 'firebase';

import Button from '../components/Button';
import Input from '../components/Input';
import BackButton from '../components/BackButton';

import Logo from '../components/Logo';
import {colors, scale} from '../constants/globalStyles';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  const resetPassword = (e) => {
    firebase
      .auth()
      .sendPasswordResetEmail(e)
      .then(() => {
        console.log('password reset was sent');
        navigation.replace('SignInScreen');
        alert('Ссылка для смены пароля отправлена на вашу почту');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Logo />
        <BackButton />
        <View style={styles.form}>
          <Input
            label="Почта"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <Button
            text="Восстановить пароль"
            onPress={() => resetPassword(email)}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mulled,
  },
  form: {
    padding: scale(20),
    marginTop: scale(200),
    marginBottom: scale(30),
    backgroundColor: colors.marzipan,
    marginHorizontal: scale(20),
    borderRadius: scale(20),
  },
});

export default ForgotPasswordScreen;
