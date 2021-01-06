import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import MainNavigator from './src/routers/MainNavigator';

import * as firebase from 'firebase';

//production database

var firebaseConfig = {
  apiKey: 'AIzaSyAlcCZuHxcjPHJp9-4AxTIypP3--_ysE_s',
  authDomain: 'gofootball-84467.firebaseapp.com',
  projectId: 'gofootball-84467',
  storageBucket: 'gofootball-84467.appspot.com',
  messagingSenderId: '131942562780',
  appId: '1:131942562780:web:e3d557b1a02e3e38c4ad19',
  measurementId: 'G-5ZD6V4862T',
};

firebase.initializeApp(firebaseConfig);

//development database

// var firebaseConfig = {
//   apiKey: "AIzaSyAdHtffgYUjesadCcl30K7N3vpXP0q1G9A",
//   authDomain: "gofootball1-5de6a.firebaseapp.com",
//   databaseURL: "https://gofootball1-5de6a-default-rtdb.firebaseio.com",
//   projectId: "gofootball1-5de6a",
//   storageBucket: "gofootball1-5de6a.appspot.com",
//   messagingSenderId: "825490852675",
//   appId: "1:825490852675:web:043cfc9db17bdbc3b77df6",
//   measurementId: "G-SY9SWJW5PE"
// };

// firebase.initializeApp(firebaseConfig);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <MainNavigator />;
};

export default App;
