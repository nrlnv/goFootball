import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import FieldItem from '../components/FieldItem';
import Header from '../components/Header';
import {DATA} from '../constants/fields';
import {colors, scale} from '../constants/globalStyles';

const FiledsScreen = () => {
  const renderItem = ({item}) => {
    return <FieldItem item={item} />;
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Header text="ФУТБОЛЬНЫЕ ПОЛЯ" />
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
    borderBottomLeftRadius: scale(40),
    borderBottomRightRadius: scale(40),
    paddingBottom: scale(10),
  },
  gamesText: {
    fontSize: scale(20),
    fontWeight: '600',
    color: colors.marzipan,
    marginTop: scale(20),
    marginLeft: scale(20),
  },
});

export default FiledsScreen;
