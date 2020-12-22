import React, {useState} from 'react';

import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  Image,
} from 'react-native';

import * as firebase from 'firebase';

import {Form, Item, Input, Label} from 'native-base';

import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import Button from '../components/Button';
import Logo from '../components/Logo';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+77474041064');

  const signUpUser = (_email, _name, _password, _phone) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(_email, _password)
      .then((authenticate) => {
        return authenticate.user
          .updateProfile({
            displayName: _name,
            phoneNumber: _phone,
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
        {/* <Logo /> */}
        <TouchableOpacity style={styles.photoView}>
          <View style={styles.avatar}>
            <Image
              source={require('../assets/avatar.png')}
              style={{width: 100, height: 100}}
            />
          </View>
          <Text style={styles.choosePhotoText}>Choose photo</Text>
        </TouchableOpacity>

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
            <Label>Name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="name-phone-pad"
              onChangeText={(n) => setName(n)}
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
          <Button
            text="Sign up"
            onPress={() => signUpUser(email, name, password)}
          />
        </Form>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <Text>Already have an account?</Text>
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
  avatar: {
    backgroundColor: '#3e206d',
    borderRadius: 150 / 2,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoView: {
    marginTop: 100,
    alignSelf: 'center',
    alignItems: 'center',
  },
  choosePhotoText: {
    fontSize: 20,
    marginTop: 10,
  },
});

export default SignUpScreen;
