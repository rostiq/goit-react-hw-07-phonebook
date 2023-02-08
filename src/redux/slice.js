import { createSlice, combineReducers } from '@reduxjs/toolkit';
import { initState } from './constants';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: initState.contacts,
  reducers: {
    ADD: (state, { payload }) => {
      return [payload, ...state];
    },
    REMOVE: (state, { payload }) => {
      return state.filter(contact => contact.id !== payload);
    },
  },
});

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initState.filter,
  reducers: {
    FILTER: (_, { payload }) => payload,
  },
});

export const { ADD, REMOVE } = contactSlice.actions;
export const phonebookReducer = contactSlice.reducer;

export const { FILTER } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

const rootReducer = combineReducers({
  contacts: phonebookReducer,
  filter: filterReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter']
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
