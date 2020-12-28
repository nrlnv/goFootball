import React from 'react';

import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

import {colors, scale} from '../constants/globalStyles';

const BackButton = ({onPress, text = '', style}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}>
      <Icon name="arrow-back-ios" size={30} color={colors.marzipan} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: scale(50),
    height: scale(50),
    backgroundColor: colors.cherry,
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(20),
    // marginTop: scale(40),
  },
});

export default BackButton;
