import React from 'react';

import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import {colors, scale} from '../constants/globalStyles';

const Button = ({onPress, text = '', style}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.textStyle}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    marginHorizontal: scale(20),
    backgroundColor: colors.mulled,
    height: scale(40),
    marginTop: scale(20),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: colors.marzipan,
    fontSize: scale(16),
  },
});

export default Button;
