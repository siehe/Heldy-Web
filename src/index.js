import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootSaga } from './store/sagas/rootSaga';
import App from './App';

import {rootReducer} from './store/reducers/rootReduces';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,  applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);
