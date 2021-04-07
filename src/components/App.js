import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import { observer } from 'mobx-react';

import Navigation from './navigation/Navigation';
import Main from './main/Main';
import Profile from './profile/Profile';
import store from '../mobx-multi/store';
import Authorization from './authorization/Authorization';
import EditProfile from "./profile/EditProfile";

const App = observer(() => {
  let path = store.channelData.getPath(); 

  return (
    <Router>
      <Redirect to={path} />
      <Switch>
        <Route path="/authorization">
          <Authorization />
        </Route>
        <Route path="/edit-profile">
          <EditProfile />
        </Route>
        <Route path={path}>
          <div className='Chat'>
            <Navigation />
            <Main />
            <Profile />
          </div>
        </Route>
      </Switch>
    </Router>
  );
});

export default App;
