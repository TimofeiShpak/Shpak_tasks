import Header from '../header/Header'
import Main from '../main/Main'
import { observer } from "mobx-react";
import store from "../../store/Store";
import ActionList from "../action/ActionList";

const Home = observer(() => {
  let isLoading = store.isLoading;

  return (
    <>
      { !isLoading ? (
          <div className="app-wrapper">
            <div className="app">
              <Header />
              <div className="main-wrapper">
                <Main />
                <ActionList />
              </div>
            </div>
          </div>
        ) : (
          <div className="spin-wrapper">
            <div className="spinner">
            </div>
            <div className="spinner__text">Loading...</div>
          </div>
        )
      }
    </>
  )
});

export default Home;