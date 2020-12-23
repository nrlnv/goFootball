import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import * as firebase from 'firebase';

import GameItem from '../components/GameItem';
import {colors, scale} from '../constants/globalStyles';

const MainScreen = () => {
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
        <FlatList
          data={games}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.key}
        />
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
