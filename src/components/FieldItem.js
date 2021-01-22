import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors, scale} from '../constants/globalStyles';

const FieldItem = ({item, city}) => {
  return city === item.city ? (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>{item.name}</Text>
      </View>
      <View>
        <View style={styles.flexD}>
          <Icon name="location-pin" size={scale(16)} color={colors.cherry} />
          <Text style={styles.bodyText}>{item.address}</Text>
        </View>
        <View style={styles.flexD}>
          <Icon name="phone" size={scale(16)} color={colors.cherry} />
          <Text style={styles.bodyText}>{item.phone}</Text>
          <Icon1 name="instagram" size={scale(16)} color={colors.cherry} />
          <Text style={styles.bodyText}>{item.instagram}</Text>
        </View>
        <View style={styles.flexD}>
          <Icon name="people" size={scale(16)} color={colors.cherry} />
          <Text style={styles.bodyText}>{item.count}</Text>
          <Icon1 name="soccer-field" size={scale(16)} color={colors.cherry} />
          <Text style={styles.bodyText}>{item.field}</Text>
          <Icon1 name="currency-kzt" size={scale(16)} color={colors.cherry} />
          <Text style={styles.bodyText}>{item.price} тг в час</Text>
        </View>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: scale(20),
    backgroundColor: colors.marzipan,
    padding: scale(20),
    borderRadius: scale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: scale(0.95),
    shadowRadius: scale(5.84),
    elevation: scale(50),
    marginBottom: scale(10),
    marginTop: scale(10),
  },
  headerView: {
    marginBottom: scale(5),
  },
  headerText: {
    fontSize: scale(20),
    fontWeight: '700',
    color: colors.cherry,
  },
  bodyText: {
    fontSize: scale(15),
    marginLeft: scale(3),
    marginRight: scale(10),
    color: colors.cherry,
  },
  flexD: {
    flexDirection: 'row',
    marginBottom: scale(2),
  },
});

export default FieldItem;