import { AppThunk } from "../../configure/store";

import newsTypeSlice, { NewsTypeState } from "./slice";

export const init = (type: NewsTypeState): AppThunk => dispatch => {
  dispatch(newsTypeSlice.actions.init(type));
};

export const switchType = (): AppThunk => (dispatch, getState) => {
  const { newsType } = getState();
  dispatch(newsTypeSlice.actions.switchType(newsType));
};
