import { combineReducers } from '@reduxjs/toolkit';
import gameReducer from 'reducers/Game.slice';

declare global {
  type RootState = ReturnType<typeof rootReducer>;
}

const rootReducer = combineReducers({
  game: gameReducer,
});

export default rootReducer;
