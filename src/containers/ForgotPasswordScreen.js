import React, {useState} from 'react';
import {StyleSheet, Keyboard, View, Text} from 'react-native';
import * as firebase from 'firebase';
import {Form, Item, Input, Label} from 'native-base';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import Button from '../components/Button';

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
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Logo />
        <Form style={styles.form}>
          <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
            <Label style={{color: colors.cherry}}>Почта</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(e) => setEmail(e)}
              style={{color: colors.cherry}}
            />
          </Item>
          <Button
            text="Восстановить пароль"
            onPress={() => resetPassword(email)}
          />
        </Form>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.footerText}>Назад</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mulled,
  },
  form: {
    padding: scale(20),
    width: '90%',
    marginBottom: scale(30),
    backgroundColor: colors.marzipan,
    marginHorizontal: scale(20),
    borderRadius: scale(20),
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: colors.marzipan,
    fontSize: scale(15),
  },
});

export default ForgotPasswordScreen;
