import React from 'react';
import { connect } from 'react-redux';
import { Image, List } from 'semantic-ui-react';
import { IContact } from '../../ducks/contacts';
import { IState } from '../../reducer';
import './index.css';

interface IAppDataProps {
  contacts: IContact[];
}

const ContactListItem = (c: IContact) => {
  const avatarImage = c.image || '/images/default-contact.jpg';

  return (
    <List.Item key={c.id}>
      <Image avatar={true} src={avatarImage} />
      <List.Content>
        <List.Header>
          {c.firstName} {c.lastName}
        </List.Header>
        <List.Description>
          +{c.phone.countryCode} {c.phone.number}
          {c.email && ` | ${c.email}`}
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

const App: React.FC<IAppDataProps> = ({ contacts }) => {
  return (
    <List selection={true} relaxed={true} divided={true} verticalAlign='middle'>
      {contacts.map(ContactListItem)}
    </List>
  );
};

const mapStateToProps = (state: IState): IAppDataProps => ({
  contacts: state.contacts,
});

export default connect(mapStateToProps)(App);
