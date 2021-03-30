import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";
import { useState } from 'react';

import Player from './Player';
import Modal from './Modal';
import History from './History';

function App() {
  let [isShowModal, setShowModal] = useState(false);
  let [allActivities, setAllActivities] = useState([]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/history">
            <Link to="/">Игра</Link>
            <History allActivities={allActivities} />
          </Route>
          <Route path="/">
            <Link to="/history">История</Link>
              <Player 
                setAllActivities={setAllActivities} 
                setShowModal={setShowModal} 
                allActivities={allActivities} 
              />
              <Modal isShowModal={isShowModal} setShowModal={setShowModal} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
