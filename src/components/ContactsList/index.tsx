import React from 'react';
import { Image, Input, List } from 'semantic-ui-react';
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

interface IContactsListDataProps {
  contacts: IContact[];
  searchFor: string;
}

interface IContactsListCbProps {
  onSearch: (searchFor: string) => void;
}

const ContactsList: React.FC<IContactsListDataProps & IContactsListCbProps> = ({
  contacts,
  searchFor,
  onSearch,
}) => {
  return (
    <div>
      <Input
        className='contacts-list__search'
        icon='search'
        placeholder='Search...'
        value={searchFor}
        onChange={(e) => onSearch(e.currentTarget.value)}
      />
      <List selection={true} relaxed={true} divided={true} verticalAlign='middle'>
        {contacts.map(ContactListItem)}
      </List>
    </div>
  );
};

export default ContactsList;
