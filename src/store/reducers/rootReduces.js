import { RESOLVE_USER_COLUMNS } from "../actions/userCategories";
import { RESOLVE_USER_LIST } from "../actions/userList";
import { LOG_OUT } from '../actions/logOut';
import { SHOW_WARNING } from "../actions/warning.js";
import { SET_BOARD_COLUMNS } from "../actions/boardColumns";
import { LOAD_TASKS_TYPES } from "../actions/loadTasksTypes";
import { PUSH_COURSE_TASK } from '../actions/courseTasksCreation';
import { EDIT_TASK } from "../actions/editTask";
import { PUT_USER_INFO } from "../actions/getUserInfo";
import { RESOLVE_COMMENTS } from "../actions/comments";
import { mapTasksComments } from "../../utils/mapTasksComments";
import { modifyBoardLists } from "../../utils/boardUtil";

const initialState = {
  userTasksList: [],
  userColumns: [],
  isLoggedIn: !!localStorage.getItem("token"),
  isWarningShown: false,
  boardColumns: [],
  courseTasks: [],
  editTask: {},
  isEditTaskShown: false,
  text: '',
  alertHeader: '',
  searchedTasks: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_USER_INFO: {
      return {
        ...state,
        userInfo: action.userInfo,
      }
    }
    case EDIT_TASK:
      return {
        ...state,
        editTask: action.payload.task,
        isEditTaskShown: action.payload.isEditTaskShown,
      }
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
        isWarningShown: action.payload.show,
        text: action.payload.text,
        alertHeader: action.payload.header,
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
    case RESOLVE_COMMENTS: {
      const mappedTasks = mapTasksComments(state.userTasksList, action.payload);
      return {
        ...state,
        userTasksList: mappedTasks,
      }
    }
    case 'SET_SEARCHED_TASKS': {
      console.log(action.searchedTasks);
      return {
        ...state,
        searchedTasks: modifyBoardLists(action.searchedTasks, state.userColumns)
      }
    }
    default:
      return state;
  }
}