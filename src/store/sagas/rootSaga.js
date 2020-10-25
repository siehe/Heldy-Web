import { all } from 'redux-saga/effects';
import { loadToDoList } from './todoList'
import { loadUserCategories } from './userCategories';

export function* rootSaga() {
  yield all([loadToDoList(), loadUserCategories()]);
}