import React, {useState} from 'react';
import * as firebase from 'firebase';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text
} from 'react-native';
import {Form, Item, Input, Label} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

import Button from '../components/Button';
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
  }

  const hideTimePicker = () => {
    setShowTime(false);
  }

  const isPhoneValid = (_phone) => {
    return (new RegExp(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/)).test(_phone.substring(2));
  }

  var user = firebase.auth().currentUser;

  const addGame = (
    _field,
    _day,
    _time,
    _duration,
    _players,
    _price,
    _phone,
  ) => {

    if (_field.length === 0 || !_field.trim() ||
        !_day || !_time ||
        _duration.length === 0 || !_duration.trim() ||
        _players.length === 0 || !_players.trim() ||
        _price.length === 0 || !_price.trim() ||
        _phone.length === 0 || !_phone.trim()
        ) {
      alert('Заполните все поля');
    } else {
      if (isPhoneValid(_phone)) {
        var messageListRef = firebase.database().ref('games');
        var newMessageRef = messageListRef.push();
        newMessageRef
          .set({
            field: _field,
            day: _day,
            time: _time,
            duration: _duration,
            players: _players,
            price: _price,
            addedBy: user.email,
            phone: _phone,
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
      } else {
        alert('Введите корректный номер');
      }
        
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-ios" size={30} color={colors.marzipan} />
            </TouchableOpacity>
            <Form style={styles.form}>
              <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
                <Label style={{color: colors.cherry}}>Место</Label>
                <Input
                  value={field}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={(x) => setField(x)}
                  style={{color: colors.cherry}}
                />
              </Item>
              <Item style={{borderBottomColor: colors.cherry}}>
                <TouchableOpacity onPress={() => setShowDay(true)} style={{marginTop: scale(35)}}>
                  {day ? (<Text style={{fontSize: scale(17), color: colors.cherry}}>{moment(day).format('DD-MM-YY')}</Text>) : (
                  <Text style={{fontSize: scale(17), color: colors.cherry}}>День</Text>
                  )}
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={showDay}
                  mode='date'
                  minimumDate={new Date()}
                  onConfirm={handleDateConfirm}
                  onCancel={hideDayPicker}
                />
              </Item>
              <Item style={{borderBottomColor: colors.cherry}}>
                {/* <Label style={{color: colors.cherry}}>Время</Label>
                <Input
                  value={time}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType='numbers-and-punctuation'
                  onChangeText={(x) => setTime(x)}
                  style={{color: colors.cherry}}
                /> */}
                <TouchableOpacity onPress={() => setShowTime(true)} style={{marginTop: scale(35)}}>
                  {time ? (<Text style={{fontSize: scale(17), color: colors.cherry}}>{moment(time).format('HH:mm')}</Text>) : (
                  <Text style={{fontSize: scale(17), color: colors.cherry}}>Время</Text>
                  )}
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={showTime}
                  mode='time'
                  locale='en_GB'
                  onConfirm={handleTimeConfirm}
                  onCancel={hideTimePicker}
                />
              </Item>
              <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
                <Label style={{color: colors.cherry}}>Длительность</Label>
                <Input
                  value={duration}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType='numbers-and-punctuation'
                  onChangeText={(x) => setDuration(x)}
                  style={{color: colors.cherry}}
                />
              </Item>
              <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
                <Label style={{color: colors.cherry}}>Количество игроков</Label>
                <Input
                  value={players}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType='number-pad'
                  onChangeText={(x) => setPlayers(x)}
                  style={{color: colors.cherry}}
                />
              </Item>
              <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
                <Label style={{color: colors.cherry}}>
                  Цена площадки за час
                </Label>
                <Input
                  value={price}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType='number-pad'
                  onChangeText={(x) => setPrice(x)}
                  style={{color: colors.cherry}}
                />
              </Item>
              <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
                <Label style={{color: colors.cherry}}>Контактный номер</Label>
                <Input
                  value={phone}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType='phone-pad'
                  onChangeText={(x) => setPhone(x)}
                  style={{color: colors.cherry}}
                />
              </Item>
              <Button
                text="Создать матч"
                onPress={() =>
                  addGame(field, day, time, duration, players, price, phone)
                }
              />
            </Form>
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
});

export default AddGameScreen;
