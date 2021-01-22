import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import * as firebase from 'firebase';

import FieldItem from '../components/FieldItem';
import Header from '../components/Header';
import CityPicker from '../components/CityPicker';
import {colors, scale} from '../constants/globalStyles';

const FiledsScreen = () => {
  const [fields, setFields] = useState(null);
  const [city, setCity] = useState('Орал');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    var fieldsListRef = firebase.database().ref('fields');
    fieldsListRef.on('value', (dataSnapshot) => {
      if (dataSnapshot.val()) {
        const fieldsList = Object.values(dataSnapshot.val());
        setFields(fieldsList);
      }
    });
  }, []);

  const renderItem = ({item}) => {
    return <FieldItem item={item} city={city} />;
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.headerView}>
          <Header text="ФУТБОЛЬНЫЕ ПОЛЯ" />
          <CityPicker
            city={city}
            onPress={() => setShowModal(true)}
            showModal={showModal}
            onBackdropPress={() => setShowModal(false)}
            onValueChange={(value) => setCity(value)}
            onPressButton={() => setShowModal(false)}
          />
        </View>
        <FlatList
          data={fields}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.addFieldView}>
          <Text style={styles.addFieldText}>
            Чтобы добавить другое поле напишите на Whatsapp по номеру
            +77089193992
          </Text>
        </View>
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
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addFieldView: {
    alignItems: 'center',
    marginHorizontal: scale(20),
  },
  addFieldText: {
    textAlign: 'center',
    fontSize: scale(15),
    color: colors.marzipan,
  },
});

export default FiledsScreen;
