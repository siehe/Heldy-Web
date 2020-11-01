import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Aside from './components/Aside/Aside.js'

import 'semantic-ui-css/semantic.min.css';
import './index.scss';
import styles from './App.module.scss';

import HomePage from './pages/Home.js';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';

function App() {
  return (
    <div className={styles.mainWrapper}>
      <Aside />
      <Switch>
        <Route path="/board" component={HomePage}/>
        <Route path="/profile"/>
        <Route path="/board"/>
        <Route path="/forum"/>
        <Route path="/settings"/>
        <Route path="/registration" component={RegistrationPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
