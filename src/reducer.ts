import { combineReducers } from 'redux';
import { IContact } from './ducks/contacts';
import contacts from './ducks/contacts';
import app, { IAppState } from './views/App/duck';

export interface IState {
  contacts: [IContact];
  app: IAppState;
}

export default combineReducers({
  app: app.reducer,
  contacts: contacts.reducer,
});
