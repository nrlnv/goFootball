/* eslint-disable no-alert */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

import Button from '../components/Button';
import Input from '../components/Input';
import CityPicker from '../components/CityPicker';
import BackButton from '../components/BackButton';
import {colors, scale} from '../constants/globalStyles';

const ChangePhotoScreen = ({navigation}) => {
  var user = auth().currentUser;
  const [photo, setPhoto] = useState(null);
  const [city, setCity] = useState('Орал');
  const [name, setName] = useState(user.displayName);
  const photoUrl = user.photoURL;
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const email = user.email;
  const uid = user.uid;

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
      maxWidth: 350,
      maxHeight: 350,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setPhoto(response);
        // console.log('image: ', response);
      }
    });
  };

  // console.log('uid: ', uid);

  const saveSettings = (_name, _city) => {
    if (!photo) {
      setIsUploading(true);
      user
        .updateProfile({
          displayName: _name,
        })
        .then(function () {
          database()
            .ref('/users/' + uid)
            .set({
              name: _name,
              city: _city,
              email: email,
            })
            .then(() => {
              // console.log('COMPLETED');
              setIsUploading(false);
              navigation.goBack();
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } else {
      // console.log(uid);
      const {uri} = photo;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      var uploadTask = storage().ref(filename).putFile(uploadUri);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          setIsUploading(true);
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
        function (error) {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          setIsUploading(false);
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
            user
              .updateProfile({
                photoURL: downloadURL,
                displayName: _name,
              })
              .then(function () {
                console.log('photo updated');
                database()
                  .ref('/users/' + uid)
                  .set({
                    name: _name,
                    city: _city,
                    email: email,
                  })
                  .then(() => console.log('COMPLETED'))
                  .catch((error) => {
                    alert(error.message);
                  });
              })
              .catch(function (error) {
                console.log(error.message);
              });
          });
          navigation.goBack();
        },
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.form}>
        <TouchableOpacity
          style={styles.photoView}
          onPress={() => handleChoosePhoto()}>
          <View style={styles.avatar}>
            {photo ? (
              <Image
                style={styles.imageView}
                source={{
                  uri: photo.uri,
                }}
              />
            ) : photoUrl ? (
              <Image style={styles.imageView} source={{uri: photoUrl}} />
            ) : (
              <Image
                source={require('../assets/avatar.png')}
                style={{width: 100, height: 100}}
              />
            )}
          </View>
          <Text style={styles.choosePhotoText}>Сменить фото</Text>
          {isUploading ? (
            <ActivityIndicator
              style={styles.activityIndicatorView}
              size="large"
              color={colors.cherry}
            />
          ) : null}
        </TouchableOpacity>
        <Input
          label="Имя"
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <View style={styles.cityPickerView}>
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
        <Button text="СОХРАНИТЬ" onPress={() => saveSettings(name, city)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mulled,
  },
  form: {
    marginTop: scale(10),
    padding: scale(20),
    width: '90%',
    backgroundColor: colors.marzipan,
    marginHorizontal: scale(20),
    borderRadius: scale(20),
  },
  avatar: {
    backgroundColor: colors.cherry,
    borderRadius: scale(150 / 2),
    width: scale(100),
    height: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoView: {
    marginTop: scale(10),
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  choosePhotoText: {
    fontSize: scale(15),
    color: colors.cherry,
  },
  activityIndicatorView: {
    alignSelf: 'center',
    marginTop: scale(10),
  },
  cityPickerView: {
    borderColor: colors.cherry,
    borderWidth: scale(2),
    padding: scale(10),
    paddingLeft: scale(20),
    borderRadius: scale(10),
  },
  imageView: {
    width: scale(100),
    height: scale(100),
    borderRadius: 150 / 2,
  },
});

export default ChangePhotoScreen;
