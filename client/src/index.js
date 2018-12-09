import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import App from './components/app';
import Edit from './Pages/edit';
import PrivateRoute from './components/auth/privateRoute';
import login from './components/auth/login';
import logout from './components/auth/logout';

ReactDOM.render(
  <React.Fragment>
    <Router>
      <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={login} />
          <PrivateRoute path="/logout" component={logout} />
          <PrivateRoute exact path="/:id/edit" component={Edit} />
      </Switch>
    </Router>
  </React.Fragment>,
  document.getElementById('root'));