import {combineReducers} from 'redux';
import {gamesReducer} from './gamesReducer';
import {authReducer} from './authReducer';

export const rootReducer = combineReducers({
  games: gamesReducer,
  auth: authReducer,
});
