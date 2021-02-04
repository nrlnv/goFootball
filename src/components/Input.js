import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';

import {colors, scale} from '../constants/globalStyles';

const Input = ({
  label,
  isPassword,
  togglePassword,
  value,
  keyboardType,
  onChangeText,
  multiline,
}) => (
  <View style={styles.inputContainer}>
    <FloatingLabelInput
      autoCorrect={false}
      autoCapitalize="none"
      label={label}
      isPassword={isPassword}
      togglePassword={togglePassword}
      value={value}
      keyboardType={keyboardType}
      multiline={multiline}
      onChangeText={onChangeText}
      containerStyles={styles.containerStyles}
      labelStyles={{
        color: colors.marzipan,
      }}
      inputStyles={styles.inputStyles}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: scale(5),
  },
  showText: {
    color: colors.cherry,
  },
  containerStyles: {
    borderWidth: 2,
    padding: scale(10),
    borderRadius: scale(10),
    borderColor: colors.cherry,
  },
  inputStyles: {
    color: colors.cherry,
    fontSize: scale(19),
    paddingHorizontal: 10,
  },
});

export default Input;
