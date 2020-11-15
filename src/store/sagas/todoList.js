import { call, put, takeEvery } from 'redux-saga/effects';
import { LOAD_USER_LIST, RESOLVE_USER_LIST } from '../actions/userList';

export function* fetchToDoList({payload}) {
  const endpoint = 'https://heldy-api-pupi.azurewebsites.net/tasks/' + payload;
  
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
  yield put({ type: RESOLVE_USER_LIST, userList: data });
}

export function* loadToDoList() {
  yield takeEvery(LOAD_USER_LIST, fetchToDoList);
}
