import { all } from 'redux-saga/effects';
import { loadToDoList } from './todoList'

export function* rootSaga() {
  yield all([loadToDoList()]);
}