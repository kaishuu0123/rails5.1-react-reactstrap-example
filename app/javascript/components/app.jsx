import React from 'react';
import {
  HashRouter,
  Route
} from 'react-router-dom';

import TaskPageComponent from './task-page-component';
import StrictTaskPageComponent from './strict-task-page-component';
import LoginComponent from './login-component';
import LogoutComponent from './logout-component';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path='/' component={TaskPageComponent} />
          <Route exact path='/strict_task' component={StrictTaskPageComponent} />
          <Route exact path='/login' component={LoginComponent} />
          <Route exact path='/logout' component={LogoutComponent} />
        </div>
      </HashRouter>
    )
  }
}

export default App;