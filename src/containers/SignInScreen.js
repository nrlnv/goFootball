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
import {colors, scale} from '../constants/globalStyles';

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
          <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
            <Label style={{color: colors.cherry}}>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(e) => setEmail(e)}
              style={{color: colors.cherry}}
            />
          </Item>
          <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
            <Label style={{color: colors.cherry}}>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={(p) => setPassword(p)}
              style={{color: colors.cherry}}
            />
          </Item>
          <Button text="Sign in" onPress={() => signInUser(email, password)} />
        </Form>
        <View style={styles.footer}>
          <Text style={styles.footerText}>OR</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.footerText}>Create a new account</Text>
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

export default SignInScreen;
