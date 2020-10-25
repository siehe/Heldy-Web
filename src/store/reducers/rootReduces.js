import { RESOLVE_USER_COLUMNS } from "../actions/userColumns";
import { RESOLVE_USER_LIST } from "../actions/userList";

const initialState = {
  userTasksList: [],
  userColumns: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESOLVE_USER_LIST:
        return {
            ...state,
            userTasksList: action.userList,
        }
    case RESOLVE_USER_COLUMNS: {
        return {
            ...state,
            userColumns: action.userColumns,
        }
    }
    default:
      return state;
  }
}