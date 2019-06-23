import React from 'react';
import { connect } from 'react-redux';
import { IContact } from '../../ducks/contacts';
import { IState } from '../../reducer';
import './index.css';

interface IAppDataProps {
  contacts: IContact[];
}

const App: React.FC<IAppDataProps> = ({ contacts }) => {
  return <div>We have {contacts.length} contacts!</div>;
};

const mapStateToProps = (state: IState): IAppDataProps => ({
  contacts: state.contacts,
});

export default connect(mapStateToProps)(App);
