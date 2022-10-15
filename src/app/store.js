import { configureStore } from '@reduxjs/toolkit';
import language from '../components/language/languageSlice';
import sing from "../components/sing/singSlice";
import {informationApi} from "../api/apiSlice";
import exercise from "../components/exerciseTable/exerciseTableSlice";


export const store = configureStore({
  reducer: {language, sing, exercise, [informationApi.reducerPath]:informationApi.reducer},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(informationApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
