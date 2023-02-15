import {combineReducers, configureStore} from "@reduxjs/toolkit";

import audioReducer from './reducers/audioSlice';
import inputReducer from "./reducers/inputSlice";
import errorModalReducer from "./reducers/modalSlice"

const rootReducer = combineReducers({
  audio: audioReducer,
  input: inputReducer,
  errorModal: errorModalReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}
