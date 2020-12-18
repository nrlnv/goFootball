import React from 'react';

import {Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Button = ({onPress, text = '', style}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.textStyle}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,
    backgroundColor: 'blue',
    height: 40,
    marginTop: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
  },
});

export default Button;
