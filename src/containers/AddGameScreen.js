/* eslint-disable no-alert */
import React, {useState} from 'react';
// import * as firebase from 'firebase';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Platform,
} from 'react-native';
// import {Form, Item, Input, Label} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import Button from '../components/Button';
import Input from '../components/Input';
import CityPicker from '../components/CityPicker';
import {colors, scale} from '../constants/globalStyles';

const AddGameScreen = ({navigation}) => {
  const [field, setField] = useState('');
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);
  const [duration, setDuration] = useState('');
  const [players, setPlayers] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('+7');
  const [showDay, setShowDay] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [city, setCity] = useState('Орал');
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');

  const handleDateConfirm = (date) => {
    setDay(date.getTime());
    setShowDay(false);
  };

  const handleTimeConfirm = (date) => {
    setTime(date.getTime());
    setShowTime(false);
  };

  const hideDayPicker = () => {
    setShowDay(false);
  };

  const hideTimePicker = () => {
    setShowTime(false);
  };

  const isPhoneValid = (_phone) => {
    return new RegExp(
      // eslint-disable-next-line no-useless-escape
      /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
    ).test(_phone.substring(2));
  };

  var user = auth().currentUser;

  const addGame = (
    _city,
    _field,
    _day,
    _time,
    _duration,
    _players,
    _price,
    _phone,
    _comment,
  ) => {
    if (
      _city === '' ||
      _field.length === 0 ||
      !_field.trim() ||
      !_day ||
      !_time ||
      _duration.length === 0 ||
      !_duration.trim() ||
      _players.length === 0 ||
      !_players.trim() ||
      _price.length === 0 ||
      !_price.trim() ||
      _phone.length === 0 ||
      !_phone.trim()
    ) {
      alert('Заполните все поля');
    } else {
      if (isPhoneValid(_phone)) {
        var messageListRef = database().ref('games');
        var newMessageRef = messageListRef.push();
        newMessageRef
          .set({
            city: _city,
            field: _field,
            day: _day,
            time: _time,
            duration: _duration,
            players: _players,
            price: _price,
            addedBy: user.email,
            name: user.displayName,
            phone: _phone,
            comment: _comment,
            addedTime: Date.now(),
          })
          .then(() => {
            alert('Матч создан!');
            navigation.goBack();
          })
          .catch((error) => {
            alert(error.message);
          });
        setField('');
        setDay('');
        setTime('');
        setDuration('');
        setPlayers('');
        setPrice('');
        setPhone('');
        setComment('');
      } else {
        alert('Введите корректный номер');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        enabled>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-ios" size={30} color={colors.marzipan} />
            </TouchableOpacity>
            <View style={styles.form}>
              <View style={styles.datepickerView}>
                <CityPicker
                  city={city}
                  onPress={() => setShowModal(true)}
                  showModal={showModal}
                  onBackdropPress={() => setShowModal(false)}
                  onValueChange={(value) => setCity(value)}
                  onPressButton={() => setShowModal(false)}
                  addGame={true}
                />
              </View>
              <Input
                label="Место"
                value={field}
                onChangeText={(value) => setField(value)}
              />
              <TouchableOpacity
                onPress={() => setShowDay(true)}
                style={[styles.datepickerView, {marginBottom: scale(5)}]}>
                {day ? (
                  <Text style={styles.datepickerText}>
                    {moment(day).format('DD-MM-YY')}
                  </Text>
                ) : (
                  <Text style={styles.datepickerText}>День</Text>
                )}
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={showDay}
                mode="date"
                minimumDate={new Date()}
                onConfirm={handleDateConfirm}
                onCancel={hideDayPicker}
                confirmTextIOS="Подтвердить"
                cancelTextIOS="Отменить"
                headerTextIOS="Выберите день"
              />
              <TouchableOpacity
                onPress={() => setShowTime(true)}
                style={styles.datepickerView}>
                {time ? (
                  <Text style={styles.datepickerText}>
                    {moment(time).format('HH:mm')}
                  </Text>
                ) : (
                  <Text style={styles.datepickerText}>Время</Text>
                )}
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={showTime}
                mode="time"
                locale="en_GB"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
                confirmTextIOS="Подтвердить"
                cancelTextIOS="Отменить"
                headerTextIOS="Выберите время"
              />
              <Input
                label="Длительность"
                value={duration}
                onChangeText={(value) => setDuration(value)}
                keyboardType="numeric"
              />
              <Input
                label="Количество игроков"
                value={players}
                onChangeText={(value) => setPlayers(value)}
                keyboardType="numeric"
              />
              <Input
                label="Цена площадки за час"
                value={price}
                onChangeText={(value) => setPrice(value)}
                keyboardType="numeric"
              />
              <Input
                label="Контактный номер"
                value={phone}
                onChangeText={(value) => setPhone(value)}
                keyboardType="numeric"
              />
              <Input
                label="Комментарии к матчу"
                value={comment}
                onChangeText={(value) => setComment(value)}
                multiline={true}
              />
              <Button
                text="Создать матч"
                onPress={() =>
                  addGame(
                    city,
                    field,
                    day,
                    time,
                    duration,
                    players,
                    price,
                    phone,
                    comment,
                  )
                }
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  form: {
    marginTop: scale(100),
    padding: scale(20),
    width: '90%',
    marginBottom: scale(30),
    backgroundColor: colors.marzipan,
    marginHorizontal: scale(20),
    borderRadius: scale(20),
    flex: 1,
  },
  backButton: {
    width: scale(50),
    height: scale(50),
    backgroundColor: colors.cherry,
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(20),
    marginTop: scale(20),
    marginBottom: -scale(50),
  },
  datepickerView: {
    borderColor: colors.cherry,
    borderWidth: scale(2),
    padding: scale(10),
    paddingLeft: scale(20),
    borderRadius: scale(10),
  },
  datepickerText: {
    fontSize: scale(17),
    color: colors.cherry,
    marginLeft: scale(5),
  },
});

export default AddGameScreen;
