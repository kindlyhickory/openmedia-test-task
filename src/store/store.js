import { combineReducers, configureStore } from '@reduxjs/toolkit';

import mediaReducer from './reducers/mediaSlice';
import inputReducer from './reducers/inputSlice';
import errorModalReducer from './reducers/modalSlice';
import historyReducer from './reducers/historySlice';

const rootReducer = combineReducers({
  media: mediaReducer,
  input: inputReducer,
  errorModal: errorModalReducer,
  history: historyReducer,
});
export const setupStore = () => configureStore({
  reducer: rootReducer,
});
