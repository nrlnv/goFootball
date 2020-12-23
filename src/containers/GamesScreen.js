import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {colors, scale} from '../constants/globalStyles';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text>Main screen</Text>
      </View>
    </View>
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
});

export default MainScreen;
