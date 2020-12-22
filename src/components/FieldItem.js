import React from 'react';

import {Text, StyleSheet, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

const FieldItem = ({item}) => (
  <View style={styles.mainView}>
    <View style={styles.headerView}>
      <Text style={styles.headerText}>{item.name}</Text>
    </View>
    <View>
      <View style={styles.flexD}>
        <Icon name="location-pin" size={16} color="#d1d7f4" />
        <Text style={styles.bodyText}>{item.address}</Text>
      </View>
      <View style={styles.flexD}>
        <Icon name="phone" size={16} color="#d1d7f4" />
        <Text style={styles.bodyText}>{item.phone}</Text>
      </View>
      <View style={styles.flexD}>
        <Icon name="people" size={16} color="#d1d7f4" />
        <Text style={styles.bodyText}>{item.count}</Text>
      </View>
      <View style={styles.flexD}>
        <Icon name="attach-money" size={16} color="#d1d7f4" />
        <Text style={styles.bodyText}>{item.price}</Text>
      </View>
      <View style={styles.flexD}>
        <Icon1 name="soccer-field" size={16} color="#d1d7f4" />
        <Text style={styles.bodyText}>{item.field}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 10,
    backgroundColor: '#3e206d',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#3e206d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5.84,
    elevation: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  headerView: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fb74bb',
  },
  bodyText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#d1d7f4',
  },
  flexD: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});

export default FieldItem;
