import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";
import React from 'react';

import Player from './Player';
import Modal from './Modal';
import History from './History';

function App() : JSX.Element {
  return (
    <Router>
      <div className="App">
        <div className="title">MiniGame</div>
        <Switch>
          <Route path="/history">
            <Link className="link" to="/">Игра</Link>
            <History />
          </Route>
          <Route path="/">
            <Link className="link" to="/history">История</Link>
              <Player />
              <Modal />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
