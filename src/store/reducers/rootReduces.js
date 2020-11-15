import { RESOLVE_USER_COLUMNS } from "../actions/userCategories";
import { RESOLVE_USER_LIST } from "../actions/userList";
import { LOG_OUT } from '../actions/logOut';
import { SHOW_WARNING } from "../actions/warning.js";

const initialState = {
  userTasksList: [],
  userColumns: [],
  isLoggedIn: !!localStorage.getItem("token"),
  isWarningShown: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_WARNING:
      return {
        ...state,
        isWarningShown: action.payload
      }
    case LOG_OUT:
      return {
      ...state,
      isLoggedIn: action.payload,
    }
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