import React from 'react';

import {Text, View, StyleSheet, Image} from 'react-native';

const Logo = ({onPress, text = '', style}) => (
  <View style={styles.logoContainer}>
    <Image source={require('../assets/logo.png')} style={styles.image} />
    <Text style={styles.textStyle}>goFootball</Text>
  </View>
);

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 100,
  },
  image: {
    width: 150,
    height: 150,
  },
  textStyle: {
    marginTop: 10,
    fontSize: 20,
  },
});

export default Logo;
