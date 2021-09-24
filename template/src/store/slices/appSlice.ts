import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Error } from 'constants/type';
import { AppState } from '../type/app';


const initialState: AppState = { 
  isLoading: [],
  languageCode: 'en',
  error: null,
  isUpdateProfile: false,
};


const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addProcessLoading: (state, action: PayloadAction<string>) => {
      console.log('ADD LOADING');
      state.isLoading = [...state.isLoading, action.payload];
    },
    removeProcessLoading: (state, action: PayloadAction<string>) => {
      // const index = state.isLoading.indexOf(action.payload);
      console.log('REMOVE LOADING: ', state.isLoading);
      const newArray = state.isLoading.slice()
      newArray.pop()
      state.isLoading =[...newArray]
    },
    setError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload
    },
  }
});

export const { setError, addProcessLoading, removeProcessLoading } = appSlice.actions;

export default appSlice;
