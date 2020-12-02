import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Aside from './components/Aside/Aside.js'

import 'semantic-ui-css/semantic.min.css';
import './index.scss';
import styles from './App.module.scss';

import HomePage from './pages/Home.js';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import { useSelector } from 'react-redux';
import Warning from './components/Warning/Warning';
import CreateCoursePage from './pages/CreateCourse/CreateCoursePage.js';
import ProfilePage from './pages/ProfilePage/ProfilePage.js';
import EditTaskForm from './components/EditTaskForm/EditTaskForm.js';
import StudentRegistration from './components/StudentRegistration/StudentRegistration.js';
import EntryPage from './pages/EntryPage/EntryPage.js';
import QAPage from './pages/Q&APage/Q&APage.js';

function App() {
  const isLoggedIn = useSelector((store) => store.isLoggedIn);
  const isWarningShown = useSelector((store) => store.isWarningShown);
  const isEditTaskShown = useSelector(store => store.isEditTaskShown);

  return (
    <div className={isLoggedIn ? styles.mainWrapper : ''}>
      {isLoggedIn ? <Aside /> : null}
      {isWarningShown ? <Warning /> : null }
      {isEditTaskShown ? <EditTaskForm /> : null }
      <Switch>
        <Route path="/entry" component={EntryPage}/>
        <Route path="/board" component={HomePage}/>
        <Route path="/profile" component={ProfilePage}/>
        <Route path="/create-course" component={CreateCoursePage}/>
        <Route path="/forum" component={QAPage}/>
        <Route path="/settings"/>
        <Route path="/registration" component={RegistrationPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/student-registration" component={StudentRegistration}></Route>
      </Switch>
    </div>
  );
}

export default App;
