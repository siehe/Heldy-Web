import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Aside from './components/Aside/Aside.js'

import 'semantic-ui-css/semantic.min.css';
import './index.scss';
import styles from './App.module.scss';

import HomePage from './pages/Home.js';

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
      </Switch>
    </div>
  );
}

export default App;
