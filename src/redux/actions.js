import {CREATE_GAME} from './types';

export function createGame(game) {
  return {
    type: CREATE_GAME,
    payload: game,
  };
}
