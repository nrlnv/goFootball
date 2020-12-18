import React from 'react';

import MainNavigator from './src/routers/MainNavigator';

import * as firebase from 'firebase';

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

const App = () => {
  return <MainNavigator />;
};

export default App;
