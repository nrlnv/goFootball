import React, {useState, useEffect} from 'react';

import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

import * as firebase from 'firebase';

import * as ImagePicker from 'react-native-image-picker';

import Button from '../components/Button';

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

  var user = firebase.auth().currentUser;

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
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/gofootball-84467.appspot.com/o/football_player-512.png?alt=media&token=a2777978-fca9-4d88-b46b-682fac670961',
                }}
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
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/gofootball-84467.appspot.com/o/football_player-512.png?alt=media&token=a2777978-fca9-4d88-b46b-682fac670961',
                }}
                style={{width: 100, height: 100}}
              />
            )}
          </View>
          {/* <Text style={styles.choosePhotoText}>Choose photo</Text> */}
        </TouchableOpacity>
        <View style={styles.userDetails}>
          <Text>Hey {name}</Text>
          <Text>You are signed in as {email}</Text>
        </View>
        {/* <Button text="Save" onPress={() => saveSettings()} /> */}
        <Button text="Sign out" onPress={() => signOutUser()} />
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
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 100,
  },
  userDetails: {
    alignItems: 'center',
  },

  button: {
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
  avatar: {
    backgroundColor: '#3e206d',
    borderRadius: 150 / 2,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoView: {
    marginTop: 100,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  choosePhotoText: {
    fontSize: 20,
    marginTop: 10,
  },
});

export default ProfileScreen;
