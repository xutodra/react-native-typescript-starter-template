import { combineReducers } from 'redux';
import app from './appSlice';

export default combineReducers({
  app: app.reducer,
});