import { call, put, takeEvery } from 'redux-saga/effects';
import { mapTasksComments } from '../../utils/mapTasksComments';
import { LOAD_USER_LIST, RESOLVE_USER_LIST } from '../actions/userList';

const apiCallComments = (id) => {
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

  const tasksIds = data.map(({ id }) => id);

  const newData = data.sort((a, b) => {
    const aDate = new Date(a.deadline);
    const bDate = new Date(b.deadline);
    return bDate - aDate;
  });

  const comments = [];
  for(let id of tasksIds) {
    const response = yield call(apiCallComments(id));
    const data = yield response.json();
    comments.push(...data);
  }
  const res = mapTasksComments(newData, comments);
  yield put({ type: RESOLVE_USER_LIST, userList: res });
}

export function* loadToDoList() {
  yield takeEvery(LOAD_USER_LIST, fetchToDoList);
}
