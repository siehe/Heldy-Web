import { RESOLVE_USER_COLUMNS } from "../actions/userCategories";
import { RESOLVE_USER_LIST } from "../actions/userList";
import { LOG_OUT } from '../actions/logOut';
import { SHOW_WARNING } from "../actions/warning.js";
import { SET_BOARD_COLUMNS } from "../actions/boardColumns";

const initialState = {
  userTasksList: [],
  userColumns: [],
  isLoggedIn: !!localStorage.getItem("token"),
  isWarningShown: false,
  boardColumns: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD_COLUMNS: 
      return {
        ...state,
        boardColumns: action.payload,
      }
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