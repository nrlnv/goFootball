/* eslint-disable no-alert */
import React, {useState} from 'react';
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

import Button from '../components/Button';
import BackButton from '../components/BackButton';
import {colors, scale} from '../constants/globalStyles';

const ChangePhotoScreen = ({navigation}) => {
  const [photo, setPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
      maxWidth: 350,
      maxHeight: 350,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setPhoto(response);
        console.log('image: ', response);
      }
    });
  };

  var user = auth().currentUser;

  const saveSettings = () => {
    if (!photo) {
      alert('Выберите фото');
    } else {
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
              })
              .then(function () {
                console.log('photo updated');
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
      <View>
        <TouchableOpacity
          style={styles.photoView}
          onPress={() => handleChoosePhoto()}>
          <View style={styles.avatar}>
            {photo ? (
              <Image
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 150 / 2,
                }}
                source={{
                  uri: photo.uri,
                }}
              />
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
              color={colors.marzipan}
            />
          ) : null}
        </TouchableOpacity>
        <Button text="СОХРАНИТЬ" onPress={() => saveSettings()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mulled,
  },
  avatar: {
    backgroundColor: colors.marzipan,
    borderRadius: scale(150 / 2),
    width: scale(120),
    height: scale(120),
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoView: {
    marginTop: scale(80),
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  choosePhotoText: {
    fontSize: scale(15),
    color: colors.marzipan,
  },
  activityIndicatorView: {
    alignSelf: 'center',
    marginTop: scale(10),
  },
});

export default ChangePhotoScreen;
