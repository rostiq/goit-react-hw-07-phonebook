import { createSlice } from '@reduxjs/toolkit';
import { initState } from './constants';
import { fetchContacts, addContact, deleteContact } from './operations';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: initState.contacts,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        return { ...state, isLoading: false, error: null, items: payload };
      })
      .addCase(fetchContacts.rejected, state => {
        state.error = 'error';
      })
      .addCase(addContact.pending, (state, action) => {
        return { ...state, isLoading: true };
      })
      .addCase(addContact.fulfilled, (state, action) => {
        return {
          isLoading: false,
          error: null,
          items: [...state.items, action.payload],
        };
      })
      .addCase(addContact.rejected, (state, action) => {
        return { ...state, isLoading: false, error: action.payload };
      })
      .addCase(deleteContact.pending, (state, action) => {
        return { ...state, isLoading: true };
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        return {
          isLoading: false,
          error: null,
          items: state.items.filter(
            contact => contact.id !== action.payload.id
          ),
        };
      })
      .addCase(deleteContact.rejected, (state, action) => {
        return { ...state, isLoading: false, error: action.payload };
      });
  },
});

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initState.filter,
  reducers: {
    FILTER: (_, { payload }) => payload,
  },
});


export const phonebookReducer = contactSlice.reducer;

export const { FILTER } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
