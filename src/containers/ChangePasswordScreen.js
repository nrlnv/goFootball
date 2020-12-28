import React, {useState} from 'react';
import * as firebase from 'firebase';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  SafeAreaView,
} from 'react-native';
import {Form, Item, Input, Label} from 'native-base';

import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import {colors, scale} from '../constants/globalStyles';

const ChangePasswordScreen = ({navigation}) => {
  const [password, setPassword] = useState('');

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
        <Form style={styles.form}>
          <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
            <Label style={{color: colors.cherry}}>Новый пароль</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(x) => setPassword(x)}
              style={{color: colors.cherry}}
            />
          </Item>
          <Button
            text="Сменить пароль"
            onPress={() => changePassword(password)}
          />
        </Form>
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
