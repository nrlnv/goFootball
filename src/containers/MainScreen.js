import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Main screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default MainScreen;
