import { initState } from './constants';
import { configureStore } from '@reduxjs/toolkit';
import { phonebookReducer, filterReducer } from '../redux/slice';

export const store = configureStore({
  preloadedState: initState,
  reducer: { 
    contacts: phonebookReducer, 
    filter: filterReducer },
  devTools: true, 
});

