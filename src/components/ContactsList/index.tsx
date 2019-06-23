import React from 'react';
import { Image, List } from 'semantic-ui-react';
import { IContact } from '../../ducks/contacts';
import './index.css';

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

export interface IContactsListDataProps {
  contacts: IContact[];
}

const ContactsList: React.FC<IContactsListDataProps> = ({ contacts }) => {
  return (
    <List selection={true} relaxed={true} divided={true} verticalAlign='middle'>
      {contacts.map(ContactListItem)}
    </List>
  );
};

export default ContactsList;
