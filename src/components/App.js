import {
  BrowserRouter as Router,
  Redirect,
  Route
} from "react-router-dom";

import { observer } from 'mobx-react';

import Navigation from './navigation/Navigation';
import Main from './main/Main';
import Profile from './profile/Profile';
import activeChannel from '../store/activeChannel';
import channelList from '../store/channelsList';

const App = observer(() => {
  let channel = channelList.list[activeChannel.index]
  let channelPath = `/${channel.text}`;

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
