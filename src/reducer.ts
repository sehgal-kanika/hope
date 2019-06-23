import { RouterRootState } from 'connected-react-router';
import { IContact } from './ducks/contacts';
import contacts from './ducks/contacts';
import app, { IAppState } from './views/App/duck';

export interface IState {
  contacts: [IContact];
  app: IAppState;
  router: RouterRootState;
}

const reducers = {
  app: app.reducer,
  contacts: contacts.reducer,
};

export default reducers;
