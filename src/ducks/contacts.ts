import Chance from 'chance';
import { createSlice } from 'redux-starter-kit';

const chance = Chance();

export interface IPhoneNumber {
  countryCode: string;
  number: string;
}

export interface IContact {
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
    lastName: chance.last(),
    phone: {
      countryCode: String(chance.integer({ min: 1, max: 999 })),
      number: chance.phone({ formatted: false }),
    },
  }),
);

export default createSlice({
  initialState: dummyContacts,
  reducers: {},
});
