import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ContactsList from '../../components/ContactsList';
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
}

const App: React.FC<IAppDataProps & IAppCbProps> = ({
  contacts,
  contactsSearchFor,
  onSearchContacts,
}) => {
  return (
    <ContactsList contacts={contacts} onSearch={onSearchContacts} searchFor={contactsSearchFor} />
  );
};

const mapState = (state: IState): IAppDataProps => ({
  contacts: state.contacts,
  contactsSearchFor: state.app.contactsSearchFor,
});

const mapDispatch = (dispatch: Dispatch): IAppCbProps => ({
  onSearchContacts: (searchFor) => dispatch(slice.actions.searchContacts(searchFor)),
});

export default connect(
  mapState,
  mapDispatch,
)(App);
