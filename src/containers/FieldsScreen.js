import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import FieldItem from '../components/FieldItem';
import {DATA} from '../constants/fields';
import {colors, scale} from '../constants/globalStyles';

const FiledsScreen = () => {
  const renderItem = ({item}) => {
    return <FieldItem item={item} />;
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
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
    borderBottomLeftRadius: scale(50),
    borderBottomRightRadius: scale(50),
    paddingBottom: 10,
  },
});

export default FiledsScreen;
