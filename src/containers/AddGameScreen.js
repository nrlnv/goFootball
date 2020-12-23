import React, {useState} from 'react';
import * as firebase from 'firebase';
import {View, StyleSheet} from 'react-native';
import {Form, Item, Input, Label} from 'native-base';

import Button from '../components/Button';
import {colors, scale} from '../constants/globalStyles';

const AddGameScreen = ({navigation}) => {
  const [field, setField] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [format, setFormat] = useState('');
  const [count, setCount] = useState('');
  const [price, setPrice] = useState('');

  var user = firebase.auth().currentUser;

  const addGame = (_field, _day, _time, _duration, _format, _count, _price) => {
    var messageListRef = firebase.database().ref('games');
    var newMessageRef = messageListRef.push();
    newMessageRef
      .set({
        field: _field,
        day: _day,
        time: _time,
        duration: _duration,
        format: _format,
        count: _count,
        price: _price,
        addedBy: user.email,
      })
      .then(() => {
        alert('Матч создан!');
        navigation.jumpTo('GamesScreen');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Form style={styles.form}>
          <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
            <Label style={{color: colors.cherry}}>Место</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(x) => setField(x)}
              style={{color: colors.cherry}}
            />
          </Item>
          <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
            <Label style={{color: colors.cherry}}>День</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(x) => setDay(x)}
              style={{color: colors.cherry}}
            />
          </Item>
          <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
            <Label style={{color: colors.cherry}}>Время</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={(x) => setTime(x)}
              style={{color: colors.cherry}}
            />
          </Item>
          <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
            <Label style={{color: colors.cherry}}>Длительность</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={(x) => setDuration(x)}
              style={{color: colors.cherry}}
            />
          </Item>
          <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
            <Label style={{color: colors.cherry}}>Формат</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={(x) => setFormat(x)}
              style={{color: colors.cherry}}
            />
          </Item>
          <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
            <Label style={{color: colors.cherry}}>Количество команд</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={(x) => setCount(x)}
              style={{color: colors.cherry}}
            />
          </Item>
          <Item floatingLabel style={{borderBottomColor: colors.cherry}}>
            <Label style={{color: colors.cherry}}>Цена площадки за час</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={(x) => setPrice(x)}
              style={{color: colors.cherry}}
            />
          </Item>
          <Button
            text="Создать матч"
            onPress={() =>
              addGame(field, day, time, duration, format, count, price)
            }
          />
        </Form>
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
  },
  form: {
    marginTop: scale(100),
    padding: scale(20),
    width: '90%',
    marginBottom: scale(30),
    backgroundColor: colors.marzipan,
    marginHorizontal: scale(20),
    borderRadius: scale(20),
  },
});

export default AddGameScreen;
