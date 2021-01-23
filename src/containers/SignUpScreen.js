/* eslint-disable no-alert */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
// import * as firebase from 'firebase';
import auth from '@react-native-firebase/auth';

import Button from '../components/Button';
import Input from '../components/Input';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import {colors, scale} from '../constants/globalStyles';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);

  const signUpUser = (_email, _name, _password) => {
    auth()
      .createUserWithEmailAndPassword(_email, _password)
      .then((authenticate) => {
        return authenticate.user
          .updateProfile({
            displayName: _name,
          })
          .then(() => {
            authenticate.user
              .sendEmailVerification()
              .then(() => console.log('Verification sent1'));
            navigation.replace('VerificationScreen');
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView>
          <BackButton />
          <Logo />
          <View style={styles.form}>
            <Input
              label="Почта"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
            <Input
              label="Имя"
              value={name}
              onChangeText={(value) => setName(value)}
            />
            <Input
              label="Пароль"
              value={password}
              onChangeText={(value) => setPassword(value)}
              isPassword
              togglePassword={show}
            />
            <Button
              text="Зарегистрироваться"
              onPress={() => signUpUser(email, name, password)}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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

export default SignUpScreen;
