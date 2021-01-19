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
import * as firebase from 'firebase';
// import {Form, Item, Input, Label} from 'native-base';

import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import {colors, scale} from '../constants/globalStyles';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const signUpUser = (_email, _name, _password) => {
    firebase
      .auth()
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
            {/* <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
              <Label style={{color: colors.cherry}}>Почта</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(e) => setEmail(e)}
                style={{color: colors.cherry}}
              />
            </Item>
            <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
              <Label style={{color: colors.cherry}}>Имя</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="name-phone-pad"
                onChangeText={(n) => setName(n)}
                style={{color: colors.cherry}}
              />
            </Item>
            <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
              <Label style={{color: colors.cherry}}>Пароль</Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(p) => setPassword(p)}
                style={{color: colors.cherry}}
              />
            </Item> */}
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
