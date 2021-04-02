import {
  BrowserRouter as Router,
  Redirect,
  Route
} from "react-router-dom";

import { observer } from 'mobx-react';

import Navigation from './navigation/Navigation';
import Main from './main/Main';
import Profile from './profile/Profile';
import store from '../store/store';

const App = observer(() => {
  let channelPath = '/' + store.channelData.name;

  return (
    <Router>
      <Redirect to={channelPath} />

      <Route path={channelPath}>
        <div className='App'>
          <Navigation />
          <Main />
          <Profile />
        </div>
      </Route>
    </Router>
  );
})

export default App;
