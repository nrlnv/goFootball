import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors, scale} from '../constants/globalStyles';

const GameItem = ({item}) => (
  <View style={styles.mainView}>
    <View style={styles.headerView}>
      <Text style={styles.headerText}>{item.field}</Text>
    </View>
    <View>
      <View style={styles.flexD}>
        <Icon name="calendar-today" size={16} color={colors.cherry} />
        <Text style={styles.bodyText}>{item.day}</Text>
        <Icon name="access-time" size={16} color={colors.cherry} />
        <Text style={styles.bodyText}>{item.time}</Text>
        <Icon1 name="timer-sand" size={16} color={colors.cherry} />
        <Text style={styles.bodyText}>{item.duration}</Text>
      </View>
      <View style={styles.flexD}>
        <Icon name="people" size={16} color={colors.cherry} />
        <Text style={styles.bodyText}>{item.players} igrokov</Text>
        <Icon name="attach-money" size={16} color={colors.cherry} />
        <Text style={styles.bodyText}>{item.price}</Text>
      </View>
      <View style={styles.flexD}>
        <Icon name="phone" size={16} color={colors.cherry} />
        <Text style={styles.bodyText}>{item.phone}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: scale(10),
    backgroundColor: colors.marzipan,
    padding: scale(20),
    borderRadius: scale(20),
    shadowColor: colors.cherry,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.95,
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
    color: colors.cherry,
  },
  bodyText: {
    fontSize: 15,
    marginLeft: 5,
    marginRight: 10,
    color: colors.cherry,
  },
  flexD: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});

export default GameItem;
