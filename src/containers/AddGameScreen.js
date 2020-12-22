import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AddGameScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text>Add game screen</Text>
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
  },
});

export default AddGameScreen;
