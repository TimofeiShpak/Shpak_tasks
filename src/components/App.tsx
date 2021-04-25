import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Authorization from './authorization/Authorization'
import { observer } from "mobx-react";
import store from "../store/Store";
import Home from "./home/Home";


const App = observer(() => {
  let path = store.user.path;
  store.initApp();

  return (
    <Router>
      <Redirect to={path} />
      <Switch>
        <Route path="/authorization">
          <Authorization />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
})

export default App;
