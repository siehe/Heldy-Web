import { all } from 'redux-saga/effects';
import { loadTasksTypes } from './tasksTypes';
import { loadToDoList } from './todoList'
import { loadUserCategories } from './userCategories';

export function* rootSaga() {
  yield all([loadToDoList(), loadUserCategories(), loadTasksTypes()]);
}