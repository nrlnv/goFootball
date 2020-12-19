import React, {useState} from 'react';

import {StyleSheet, Text, KeyboardAvoidingView, Keyboard} from 'react-native';

import * as firebase from 'firebase';

import {Form, Item, Input, Label, View} from 'native-base';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import Button from '../components/Button';
import Logo from '../components/Logo';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInUser = (e, p) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(e, p)
      .then(() => {
        navigation.replace('MainTabs');
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
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(e) => setEmail(e)}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(p) => setPassword(p)}
            />
          </Item>
          <Button text="Sign in" onPress={() => signInUser(email, password)} />
        </Form>
        <View style={styles.footer}>
          <Text>OR</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text>Create a new account</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 100,
  },
  form: {
    padding: 20,
    width: '100%',
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
  },
});

export default SignInScreen;
