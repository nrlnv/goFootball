import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import MainNavigator from './src/routers/MainNavigator';
import {rootReducer} from './src/redux/rootReducer';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk)),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
