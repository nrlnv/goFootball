import React, {useState} from 'react';
import * as firebase from 'firebase';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Form, Item, Input, Label} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../components/Button';
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={30} color={colors.marzipan} />
        </TouchableOpacity>
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
  mainContainer: {
    backgroundColor: colors.cherry,
    flex: 1,
    borderBottomLeftRadius: scale(50),
    borderBottomRightRadius: scale(50),
  },
  form: {
    marginTop: scale(250),
    padding: scale(20),
    width: '90%',
    marginBottom: scale(30),
    backgroundColor: colors.marzipan,
    marginHorizontal: scale(20),
    borderRadius: scale(20),
  },
  backButton: {
    width: scale(50),
    height: scale(50),
    backgroundColor: colors.cherry,
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(20),
    marginTop: scale(20),
    marginBottom: -scale(50),
  },
});

export default ChangePasswordScreen;
