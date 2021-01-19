import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';

import {colors, scale} from '../constants/globalStyles';

const Input = ({label, isPassword, togglePassword, value, onChangeText}) => (
  <View style={styles.inputContainer}>
    <FloatingLabelInput
      autoCorrect={false}
      autoCapitalize="none"
      label={label}
      isPassword={isPassword}
      togglePassword={togglePassword}
      value={value}
      onChangeText={onChangeText}
      customShowPasswordComponent={<Text>Show</Text>}
      customHidePasswordComponent={<Text>Hide</Text>}
    />
  </View>
);

const styles = StyleSheet.create({});

export default Input;
