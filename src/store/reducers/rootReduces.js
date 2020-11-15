import { RESOLVE_USER_COLUMNS } from "../actions/userCategories";
import { RESOLVE_USER_LIST } from "../actions/userList";
import { LOG_OUT } from '../actions/logOut';
import { SHOW_WARNING } from "../actions/warning.js";
import { SET_BOARD_COLUMNS } from "../actions/boardColumns";
import { LOAD_TASKS_TYPES } from "../actions/loadTasksTypes";
import { PUSH_COURSE_TASK } from '../actions/courseTasksCreation';

const initialState = {
  userTasksList: [],
  userColumns: [],
  isLoggedIn: !!localStorage.getItem("token"),
  isWarningShown: false,
  boardColumns: [],
  courseTasks: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUSH_COURSE_TASK: 
      return {
        ...state,
        courseTasks: [...state.courseTasks, action.payload],
      }
    case LOAD_TASKS_TYPES: 
      return {
        ...state,
        types: action.types,
      }
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