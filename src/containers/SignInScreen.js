/* eslint-disable no-alert */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
// import * as firebase from 'firebase';
import auth from '@react-native-firebase/auth';

import Button from '../components/Button';
import Logo from '../components/Logo';
import Input from '../components/Input';
import {colors, scale} from '../constants/globalStyles';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const signInUser = (e, p) => {
    auth()
      .signInWithEmailAndPassword(e, p)
      .then(() => {
        navigation.replace('MainTabs');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView>
          <Logo />
          <View style={styles.form}>
            <Input
              label="Почта"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
            <Input
              label="Пароль"
              value={password}
              onChangeText={(value) => setPassword(value)}
              isPassword
              togglePassword={show}
            />
            <Button text="Войти" onPress={() => signInUser(email, password)} />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.footerView}
              onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={styles.footerText}>Создать аккаунт</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text style={styles.footerText}>Забыл пароль?</Text>
            </TouchableOpacity>
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
    marginHorizontal: scale(20),
    marginTop: scale(300),
    marginBottom: scale(30),
    backgroundColor: colors.marzipan,
    borderRadius: scale(20),
  },
  footer: {
    alignItems: 'center',
  },
  footerView: {
    marginBottom: scale(10),
  },
  footerText: {
    color: colors.marzipan,
    fontSize: scale(15),
  },
});

export default SignInScreen;
