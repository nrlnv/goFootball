/* eslint-disable no-alert */
import React, {useState} from 'react';
import * as firebase from 'firebase';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  View,
} from 'react-native';
// import {Form, Item, Input, Label} from 'native-base';

import Button from '../components/Button';
import Input from '../components/Input';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import {colors, scale} from '../constants/globalStyles';

const ChangePasswordScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const changePassword = (p) => {
    var user = firebase.auth().currentUser;
    user
      .updatePassword(p)
      .then(function () {
        navigation.goBack();
        alert('Вы поменяли на новый пароль');
      })
      .catch(function (error) {
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
            label="Пароль"
            value={password}
            onChangeText={(value) => setPassword(value)}
            isPassword
            togglePassword={show}
          />
          <Button
            text="Сменить пароль"
            onPress={() => changePassword(password)}
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
    marginTop: scale(200),
    padding: scale(20),
    marginBottom: scale(30),
    backgroundColor: colors.marzipan,
    marginHorizontal: scale(20),
    borderRadius: scale(20),
  },
});

export default ChangePasswordScreen;
