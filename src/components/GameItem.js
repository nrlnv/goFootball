import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

import {colors, scale} from '../constants/globalStyles';

const GameItem = ({item}) => {
  const currentDate = new Date();

  return currentDate.getTime() < moment(item.day).add(1, 'hours') ? (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>{item.field}</Text>
      </View>
      <View>
        <View style={styles.flexD}>
          <Icon name="calendar-today" size={16} color={colors.cherry} />
          <Text style={styles.bodyText}>
            {moment(item.day).format('DD-MM-YY')}
          </Text>
          <Icon name="access-time" size={16} color={colors.cherry} />
          <Text style={styles.bodyText}>
            {moment(item.time).format('HH:mm')}
          </Text>
          <Icon1 name="timer-sand" size={16} color={colors.cherry} />
          <Text style={styles.bodyText}>{item.duration} ч</Text>
        </View>
        <View style={styles.flexD}>
          <Icon name="people" size={16} color={colors.cherry} />
          <Text style={styles.bodyText}>{item.players} игроков</Text>
          <Icon name="attach-money" size={16} color={colors.cherry} />
          <Text style={styles.bodyText}>{item.price} тг в час</Text>
        </View>
        <View style={styles.flexD}>
          <Icon name="phone" size={16} color={colors.cherry} />
          <Text style={styles.bodyText}>{item.phone}</Text>
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
    elevation: scale(5),
    marginBottom: scale(10),
    marginTop: scale(10),
  },
  headerView: {
    marginBottom: scale(10),
  },
  headerText: {
    fontSize: scale(20),
    fontWeight: '700',
    color: colors.cherry,
  },
  bodyText: {
    fontSize: scale(15),
    marginLeft: scale(5),
    marginRight: scale(10),
    color: colors.cherry,
  },
  flexD: {
    flexDirection: 'row',
    marginBottom: scale(5),
  },
});

export default GameItem;
