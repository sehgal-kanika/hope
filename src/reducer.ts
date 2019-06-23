import { combineReducers } from 'redux';
import counter from './App/duck';

export default combineReducers({
  counter: counter.reducer,
});
