import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

import {colors, scale} from '../constants/globalStyles';
import auth from '@react-native-firebase/auth';

const GameItem = ({item, city, onRemovePress}) => {
  const currentDate = new Date();
  var email = auth().currentUser.email;

  return currentDate.getTime() < moment(item.day).add(1, 'hours') &&
    city === item.city ? (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>{item.field}</Text>
        {email === item.addedBy ? (
          <TouchableOpacity
            style={{position: 'absolute', right: 0}}
            onPress={onRemovePress}>
            <Icon1 name="trash-can-outline" size={24} color={colors.cherry} />
          </TouchableOpacity>
        ) : null}
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
          <Icon1 name="currency-kzt" size={16} color={colors.cherry} />
          <Text style={styles.bodyText}>{item.price} тг в час</Text>
        </View>
        <View style={styles.flexD}>
          <Icon name="phone" size={16} color={colors.cherry} />
          <Text style={styles.bodyText}>
            {item.phone} - {item.name}
          </Text>
        </View>
        {!item.comment || item.comment === '' ? null : (
          <View style={styles.flexD}>
            <Icon1 name="comment" size={16} color={colors.cherry} />
            <Text style={styles.bodyText}>{item.comment}</Text>
          </View>
        )}
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
