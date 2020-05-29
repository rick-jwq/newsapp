import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

type newsType = "Guardian" | "NYTimes";

export type NewsTypeState = newsType;
export type NewsTypeActions = {
  init: CaseReducer<NewsTypeState, PayloadAction<newsType>>;
  switchType: CaseReducer<NewsTypeState, PayloadAction<newsType>>;
};
const newsTypeSlice = createSlice<NewsTypeState, NewsTypeActions>({
  name: "newsType",
  initialState: "Guardian",
  reducers: {
    init: (_state, action) => action.payload,
    switchType: (state, _action) => (state === "Guardian" ? "NYTimes" : state)
  }
});

export default newsTypeSlice;
