import { call, put, takeEvery } from 'redux-saga/effects';
import { LOAD_TASKS_TYPES } from '../actions/loadTasksTypes';

export function* fetchTasksTypes() {
    const endpoint = 'https://heldy-api-pupi.azurewebsites.net/types/';
    const apiCall = () => {
      return fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token'),
        },
      },
     )
    }
  
    const response = yield call(apiCall);
    const data = yield response.json();
    yield put({ type: LOAD_TASKS_TYPES, types: data });
  }
  
  export function* loadTasksTypes() {
    yield takeEvery(LOAD_TASKS_TYPES, fetchTasksTypes);
  }