import {
  configureStore,
  ThunkAction,
  DeepPartial,
  Action
} from "@reduxjs/toolkit";

import RootReducer, { RootState } from "../redux";

const configStore = (preloadedState?: DeepPartial<RootState>) => {
  const store = configureStore({
    reducer: RootReducer,
    preloadedState
  });
  return store;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default configStore;
