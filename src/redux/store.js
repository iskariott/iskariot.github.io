import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import input from './inputSlice';
import table from './tableSlice';
import load from './loadSlice';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['input', 'table'],
};

const rootReducer = combineReducers({ input, table, load });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: { red: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
