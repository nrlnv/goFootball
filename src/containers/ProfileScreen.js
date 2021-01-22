/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
// import * as ImagePicker from 'react-native-image-picker';

import Button from '../components/Button';
import {colors, scale} from '../constants/globalStyles';

const ProfileScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  // const handleChoosePhoto = () => {
  //   const options = {
  //     noData: true,
  //   };
  //   ImagePicker.launchImageLibrary(options, (response) => {
  //     if (response.uri) {
  //       setPhoto(response);
  //       console.log('image: ', response);
  //     }
  //   });
  // };

  // var user = firebase.auth().currentUser;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authenticate) => {
      if (authenticate) {
        setEmail(authenticate.email);
        setName(authenticate.displayName);
        setPhotoUrl(authenticate.photoURL);
        // console.log(
        //   'user photo: ',
        //   authenticate.photoURL.slice(0, photoUrl.lastIndexOf('?')),
        // );
      } else {
        navigation.replace('SignInScreen');
      }
    });
  });

  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('sign out');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // const saveSettings = () => {
  //   // Create the file metadata
  //   var metadata = {
  //     contentType: 'image/jpeg',
  //   };

  //   // Upload file and metadata to the object 'images/mountains.jpg'
  //   var uploadTask = storageRef
  //     .child('images/' + photo.fileName)
  //     .put(photo, metadata);

  //   // Listen for state changes, errors, and completion of the upload.
  //   uploadTask.on(
  //     firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  //     function (snapshot) {
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log('Upload is ' + progress + '% done');
  //       switch (snapshot.state) {
  //         case firebase.storage.TaskState.PAUSED: // or 'paused'
  //           console.log('Upload is paused');
  //           break;
  //         case firebase.storage.TaskState.RUNNING: // or 'running'
  //           console.log('Upload is running');
  //           break;
  //       }
  //     },
  //     function (error) {
  //       switch (error.code) {
  //         case 'storage/unauthorized':
  //           // User doesn't have permission to access the object
  //           break;
  //         case 'storage/canceled':
  //           // User canceled the upload
  //           break;
  //         case 'storage/unknown':
  //           // Unknown error occurred, inspect error.serverResponse
  //           break;
  //       }
  //     },
  //     function () {
  //       // Upload completed successfully, now we can get the download URL
  //       uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
  //         console.log('File available at', downloadURL);
  //         user
  //           .updateProfile({
  //             photoURL: downloadURL,
  //           })
  //           .then(function () {
  //             console.log('photo updated');
  //           })
  //           .catch(function (error) {
  //             console.log(error.message);
  //           });
  //       });
  //     },
  //   );
  // };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.photoView}>
          <View style={styles.avatar}>
            {photoUrl ? (
              <Image
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 150 / 2,
                }}
                source={require('../assets/avatar.png')}
              />
            ) : photo ? (
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
          {/* <Text style={styles.choosePhotoText}>Choose photo</Text> */}
        </TouchableOpacity>
        <View style={styles.userDetails}>
          <Text style={styles.detailText}>Привет, {name}</Text>
          <Text style={styles.detailText}>Вы вошли как {email}</Text>
          <Button
            text="Сменить пароль"
            onPress={() => navigation.navigate('ChangePasswordScreen')}
          />
          <Button text="Выйти" onPress={() => signOutUser()} />
        </View>
        {/* <Button text="Save" onPress={() => saveSettings()} /> */}
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
  },
  userDetails: {
    backgroundColor: colors.marzipan,
    marginHorizontal: scale(20),
    padding: scale(20),
    borderRadius: scale(20),
  },
  detailText: {
    alignSelf: 'center',
    fontSize: scale(15),
    color: colors.cherry,
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
    marginTop: scale(40),
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: scale(80),
  },
  choosePhotoText: {
    fontSize: scale(20),
    marginTop: scale(10),
  },
});

export default ProfileScreen;
