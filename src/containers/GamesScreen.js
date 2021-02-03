import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  LogBox,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import database from '@react-native-firebase/database';

import GameItem from '../components/GameItem';
import Header from '../components/Header';
import CityPicker from '../components/CityPicker';
import {colors, scale} from '../constants/globalStyles';

const MainScreen = ({navigation}) => {
  const [games, setGames] = useState(null);
  const [city, setCity] = useState('Орал');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    var gamesListRef = database().ref('games');
    gamesListRef.on('value', (dataSnapshot) => {
      if (dataSnapshot.val()) {
        const gamesList = Object.values(dataSnapshot.val());
        gamesList
          .sort(function compare(a, b) {
            var dateA = new Date(a.day);
            var dateB = new Date(b.day);
            return dateA - dateB;
          })
          .reverse();
        setGames(gamesList);
      }
    });
  }, []);

  const onRemovePress = (item) => {
    var query = database()
      .ref('games')
      .orderByChild('addedTime')
      .equalTo(item.addedTime);
    query.once('value', function (snapshot) {
      snapshot.forEach(function (child) {
        child.ref.remove();
      });
    });
    console.log('pressed');
  };

  const createTwoButtonAlert = (item) =>
    Alert.alert(
      'Удаление матча',
      'Вы хотите удалить матч?',
      [
        {
          text: 'Нет',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Да', onPress: () => onRemovePress(item)},
      ],
      {cancelable: false},
    );

  const renderItem = ({item}) => {
    return (
      <GameItem
        item={item}
        city={city}
        onRemovePress={() => createTwoButtonAlert(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: scale(10),
          }}>
          <Header text="МАТЧИ" />
          <CityPicker
            city={city}
            onPress={() => setShowModal(true)}
            showModal={showModal}
            onBackdropPress={() => setShowModal(false)}
            onValueChange={(value) => setCity(value)}
            onPressButton={() => setShowModal(false)}
          />
        </View>

        {games ? (
          <FlatList
            data={games}
            renderItem={renderItem}
            keyExtractor={(item) => item.addedTime.toString()}
          />
        ) : (
          <ActivityIndicator size="large" color={colors.marzipan} />
        )}
        <TouchableOpacity
          style={styles.addGameView}
          onPress={() => navigation.navigate('AddGameScreen')}>
          <Icon name="plus" color={colors.mulled} size={30} />
        </TouchableOpacity>
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
    borderBottomLeftRadius: scale(40),
    borderBottomRightRadius: scale(40),
    paddingBottom: scale(10),
  },
  addGameView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: scale(50),
    height: scale(50),
    borderRadius: scale(150 / 2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: scale(0.95),
    shadowRadius: scale(5.84),
    elevation: scale(5),
    backgroundColor: colors.wax,
    justifyContent: 'center',
    alignItems: 'center',
    margin: scale(20),
  },
  gamesText: {
    fontSize: scale(20),
    fontWeight: '600',
    color: colors.marzipan,
    marginTop: scale(20),
    marginLeft: scale(20),
  },
});

LogBox.ignoreLogs(['Sending...']);

export default MainScreen;
