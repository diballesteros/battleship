import { combineReducers } from '@reduxjs/toolkit';
import gameReducer from 'reducers/Game.slice';
import displayReducer from 'reducers/Display.slice';

declare global {
  type RootState = ReturnType<typeof rootReducer>;
}

const rootReducer = combineReducers({
  display: displayReducer,
  game: gameReducer,
});

export default rootReducer;
