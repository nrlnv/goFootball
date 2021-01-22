import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from './Button';

import {colors, scale} from '../constants/globalStyles';

const CityPicker = ({
  onPress,
  city,
  showModal,
  onBackdropPress,
  onValueChange,
  onPressButton,
  addGame,
}) => (
  <View style={styles.pickerContainer}>
    <TouchableOpacity onPress={onPress} style={{flexDirection: 'row'}}>
      <Text
        style={[
          styles.cityText,
          {color: addGame ? colors.cherry : colors.marzipan},
        ]}>
        {city}
      </Text>
      <Icon
        name="keyboard-arrow-down"
        color={addGame ? colors.cherry : colors.marzipan}
        size={24}
      />
    </TouchableOpacity>
    <Modal isVisible={showModal} onBackdropPress={onBackdropPress}>
      <View style={styles.modalView}>
        <Text style={styles.selectCityText}>Ваш город</Text>
        <Picker
          mode="dropdown"
          selectedValue={city}
          onValueChange={onValueChange}>
          <Picker.Item label="Орал" value="Орал" />
          <Picker.Item label="Аксай" value="Аксай" />
          <Picker.Item label="Атырау" value="Атырау" />
          <Picker.Item label="Актобе" value="Актобе" />
          <Picker.Item label="Актау" value="Актау" />
          <Picker.Item label="Алматы" value="Алматы" />
          <Picker.Item label="Астана" value="Астана" />
          <Picker.Item label="Шымкент" value="Шымкент" />
          <Picker.Item label="Караганда" value="Караганда" />
          <Picker.Item label="Тараз" value="Тараз" />
          <Picker.Item label="Павлодар" value="Павлодар" />
          <Picker.Item label="Оскемен" value="Оскемен" />
          <Picker.Item label="Семей" value="Семей" />
          <Picker.Item label="Костанай" value="Костанай" />
          <Picker.Item label="Кызылорда" value="Кызылорда" />
          <Picker.Item label="Петропавловск" value="Петропавловск" />
          <Picker.Item label="Туркестан" value="Туркестан" />
          <Picker.Item label="Кокшетау" value="Кокшетау" />
          <Picker.Item label="Талдыкорган" value="Талдыкорган" />
        </Picker>
        <Button text="Подтвердить" onPress={onPressButton} />
      </View>
    </Modal>
  </View>
);

const styles = StyleSheet.create({
  modalView: {
    // height: scale(300),
    backgroundColor: 'white',
    borderRadius: scale(20),
  },
  pickerContainer: {
    marginRight: scale(20),
  },
  cityText: {
    color: colors.marzipan,
    fontSize: scale(18),
  },
  selectCityText: {
    alignSelf: 'center',
    fontSize: scale(20),
    color: colors.cherry,
  },
});

export default CityPicker;
