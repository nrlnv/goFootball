import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import {colors, scale} from '../constants/globalStyles';

const Logo = ({onPress, text = '', style}) => (
  <View style={styles.logoContainer}>
    <Image source={require('../assets/avatar.png')} style={styles.image} />
    <Text style={styles.textStyle}>GOFOOTBALL</Text>
  </View>
);

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    top: scale(40),
  },
  image: {
    width: scale(150),
    height: scale(150),
  },
  textStyle: {
    marginTop: scale(10),
    fontSize: scale(20),
    fontWeight: '700',
    color: colors.marzipan,
  },
});

export default Logo;
