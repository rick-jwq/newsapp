import { combineReducers } from "@reduxjs/toolkit";
import newsTypeSlice from "./newsType";

const RootReducer = combineReducers({
  newsType: newsTypeSlice.reducer
});

export type RootState = ReturnType<typeof RootReducer>;

export * from "./newsType";
export default RootReducer;
