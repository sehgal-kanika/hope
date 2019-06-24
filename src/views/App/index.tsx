import { push } from 'connected-react-router';
import { FormikActions } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Dispatch } from 'redux';
import ContactsList from '../../components/ContactsList';
import NewContact, { INewContactFormValues } from '../../components/NewContact';
import contactsSlice, { IContact } from '../../ducks/contacts';
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
  onSaveContact: (
    data: INewContactFormValues,
    formActions: FormikActions<INewContactFormValues>,
  ) => void;
}

const App: React.FC<IAppDataProps & IAppCbProps> = ({
  contacts,
  contactsSearchFor,
  onSearchContacts,
  onGotoAddContact,
  onSaveContact,
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
        <Route exact={true} path='/add' render={() => <NewContact onSave={onSaveContact} />} />
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
  onSaveContact: (data, formActions) => {
    formActions.resetForm();
    return dispatch(contactsSlice.actions.saveContact(data));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(App);
