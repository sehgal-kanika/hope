import { push } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Dispatch } from 'redux';
import ContactsList from '../../components/ContactsList';
import NewContact from '../../components/NewContact';
import { IContact } from '../../ducks/contacts';
import { IState } from '../../reducer';
import slice from './duck';
import './index.css';

interface IAppDataProps {
  contacts: IContact[];
  contactsSearchFor: string;
}

interface IAppCbProps {
  onSearchContacts: (searchFor: string) => void;
  onGotoAddContact: () => void;
}

const App: React.FC<IAppDataProps & IAppCbProps> = ({
  contacts,
  contactsSearchFor,
  onSearchContacts,
  onGotoAddContact,
}) => {
  return (
    <div className='container'>
      <div className='contacts-list-sidebar'>
        <ContactsList
          contacts={contacts}
          onSearch={onSearchContacts}
          searchFor={contactsSearchFor}
          onClickAdd={onGotoAddContact}
        />
      </div>
      <div className='contact-details'>
        <Route exact={true} path='/add' component={NewContact} />
      </div>
      <div className='contact-timeline' />
    </div>
  );
};

const mapState = (state: IState): IAppDataProps => ({
  contacts: state.contacts,
  contactsSearchFor: state.app.contactsSearchFor,
});

const mapDispatch = (dispatch: Dispatch): IAppCbProps => ({
  onGotoAddContact: () => dispatch(push('/add')),
  onSearchContacts: (searchFor) => dispatch(slice.actions.searchContacts(searchFor)),
});

export default connect(
  mapState,
  mapDispatch,
)(App);
