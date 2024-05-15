import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {authReducer} from "./authSlice"; 


const rootReducer = combineReducers({
    auth: authReducer, 
  });

export type RootState = ReturnType<typeof rootReducer>;


export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware();
    },
    preloadedState,
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();


export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
