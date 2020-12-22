import React from 'react';
import {SafeAreaView, StyleSheet, FlatList, View} from 'react-native';

import FieldItem from '../components/FieldItem';
import {DATA} from '../constants/fields';

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
    backgroundColor: '#3e206d',
  },
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingBottom: 10,
  },
});

export default FiledsScreen;
