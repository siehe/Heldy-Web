import { call, put, takeEvery } from 'redux-saga/effects';
import { LOAD_USER_COLUMNS, RESOLVE_USER_COLUMNS } from '../actions/userCategories';

export function* fetchUserCategories() {
  const endpoint = 'https://heldy-api-pupi.azurewebsites.net/columns/';

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
  yield put({ type: RESOLVE_USER_COLUMNS, userColumns: data });
}

export function* loadUserCategories() {
  yield takeEvery(LOAD_USER_COLUMNS, fetchUserCategories);
}
