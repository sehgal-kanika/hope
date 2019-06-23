import Chance from 'chance';
import { createSlice } from 'redux-starter-kit';
import appSlice from '../views/App/duck';

const chance = Chance();

export interface IPhoneNumber {
  countryCode: string;
  number: string;
}

export interface IContact {
  id: string;
  image?: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  phone: IPhoneNumber;
  email: string;
}

const dummyContacts: IContact[] = [1, 2, 3, 4, 5].map(
  (): IContact => ({
    birthday: chance.birthday(),
    email: chance.email(),
    firstName: chance.first(),
    id: chance.string(),
    lastName: chance.last(),
    phone: {
      countryCode: String(chance.integer({ min: 1, max: 999 })),
      number: chance.phone({ formatted: false }),
    },
  }),
);

export default createSlice({
  extraReducers: {
    [appSlice.actions.searchContacts.toString()]: (contacts, { payload: searchFor = '' }) => {
      return dummyContacts.filter((contact) => {
        const searchTerm = searchFor.toLowerCase();
        return (
          contact.firstName.toLowerCase().indexOf(searchTerm) > -1 ||
          contact.lastName.toLowerCase().indexOf(searchTerm) > -1 ||
          contact.phone.countryCode.indexOf(searchTerm) > -1 ||
          contact.phone.number.indexOf(searchTerm) > -1 ||
          contact.email.toLowerCase().indexOf(searchTerm) > -1 ||
          contact.birthday
            .toString()
            .toLowerCase()
            .indexOf(searchTerm) > -1
        );
      });
    },
  },
  initialState: dummyContacts,
  reducers: {},
});
