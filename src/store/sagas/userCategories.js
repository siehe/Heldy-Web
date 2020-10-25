import { call, put, takeEvery } from 'redux-saga/effects';
import { LOAD_USER_COLUMNS, RESOLVE_USER_COLUMNS } from '../actions/userColumns';

export function* fetchUserCategories({payload}) {
  const endpoint = 'https://localhost:44369/tasks/' + payload;
  const response = yield call(fetch, endpoint);
  const data = yield response.json();
  yield put({ type: RESOLVE_USER_COLUMNS, userList: data });
}

export function* loadUserCategories() {
  yield takeEvery(LOAD_USER_COLUMNS, fetchUserCategories);
}
