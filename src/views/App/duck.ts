import { createAction, createSlice } from 'redux-starter-kit';

const searchContacts = createAction('searchContacts');

export interface IAppState {
  contactsSearchFor: string
}

export default createSlice({
  initialState: {
    contactsSearchFor: '',
  },
  reducers: {
    [searchContacts.type]: (state, action) => {
      state.contactsSearchFor = action.payload;
    },
  },
  slice: 'app',
});
