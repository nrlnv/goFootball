import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import {colors} from '../constants/globalStyles';

const Logo = ({onPress, text = '', style}) => (
  <View style={styles.logoContainer}>
    <Image source={require('../assets/logo.png')} style={styles.image} />
    <Text style={styles.textStyle}>GOFOOTBALL</Text>
  </View>
);

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 80,
  },
  image: {
    width: 150,
    height: 150,
  },
  textStyle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '700',
    color: colors.marzipan,
  },
});

export default Logo;
