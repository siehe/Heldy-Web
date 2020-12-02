import { call, put, takeEvery } from 'redux-saga/effects';
import { LOAD_COMMENTS, RESOLVE_COMMENTS } from '../actions/comments';

const apiCall = (id) => {
    const endpoint = 'https://heldy-api-pupi.azurewebsites.net/comments/' + id;
    return () => {
      return fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token'),
        },
      },
     )
    };
}

export function* fetchComments({ payload }) {
    const comments = [];
    for(let id of payload) {
      const response = yield call(apiCall(id));
      const data = yield response.json();
      comments.push(...data);
    }
    yield put({ type: RESOLVE_COMMENTS, payload: comments });
  }
  
  export function* loadComments() {
    yield takeEvery(LOAD_COMMENTS, fetchComments);
  }