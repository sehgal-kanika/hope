import { combineReducers } from 'redux';
import { IContact } from './ducks/contacts';
import contacts from './ducks/contacts';

export interface IState {
  contacts: [IContact];
}

export default combineReducers({
  contacts: contacts.reducer,
});
