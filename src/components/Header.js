import React from 'react';

import {Text, StyleSheet} from 'react-native';

import {colors, scale} from '../constants/globalStyles';

const Header = ({text}) => <Text style={styles.gamesText}>{text}</Text>;

const styles = StyleSheet.create({
  gamesText: {
    fontSize: scale(20),
    fontWeight: '600',
    color: colors.marzipan,
    // marginTop: scale(20),
    marginLeft: scale(20),
  },
});

export default Header;
