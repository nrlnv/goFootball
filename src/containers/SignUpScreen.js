import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import * as firebase from 'firebase';
import {Form, Item, Input, Label} from 'native-base';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import Button from '../components/Button';
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
          </Item>
          <Button
            text="Зарегистрироваться"
            onPress={() => signUpUser(email, name, password)}
          />
        </Form>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={styles.footerText}>Уже есть аккаунт?</Text>
          </TouchableOpacity>
        </View>
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
    width: '90%',
    marginTop: scale(300),
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

export default SignUpScreen;
