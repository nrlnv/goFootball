import React from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';

import FieldItem from '../components/FieldItem';
import {DATA} from '../constants/fields';

const FiledsScreen = () => {
  const renderItem = ({item}) => {
    return <FieldItem item={item} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default FiledsScreen;
