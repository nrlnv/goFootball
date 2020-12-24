import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import * as firebase from 'firebase';

import GameItem from '../components/GameItem';
import {colors, scale} from '../constants/globalStyles';

const MainScreen = ({navigation}) => {
  const [games, setGames] = useState(null);

  useEffect(() => {
    var gamesListRef = firebase.database().ref('games');
    gamesListRef.on('value', (dataSnapshot) => {
      if (dataSnapshot.val()) {
        let gamesList = Object.values(dataSnapshot.val());
        setGames(gamesList);
        console.log(gamesList);
      }
    });
  }, []);

  const renderItem = ({item}) => {
    return <GameItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.gamesText}>МАТЧИ</Text>
        <FlatList
          data={games}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.key}
        />
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
    borderBottomLeftRadius: scale(50),
    borderBottomRightRadius: scale(50),
  },
  addGameView: {
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
    alignSelf: 'flex-end',
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

export default MainScreen;
