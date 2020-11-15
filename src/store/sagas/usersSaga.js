import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_USER_INFO, putUserInfo, PUT_USER_INFO } from '../actions/getUserInfo';

export function* fetchUserInfo() {
    const endpoint = 'https://heldy-api-pupi.azurewebsites.net/persons/' + localStorage.getItem('userId');
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

    yield put(putUserInfo({userInfo: data}));
  }
  
  export function* loadUserInfo() {
    yield takeEvery(GET_USER_INFO, fetchUserInfo);
}
