import { observer } from 'mobx-react-lite';
import store from '../../store/Store';

const Header = observer(() => {
  let { searchText, resultSearch, changeSearchText, resultText, isSearch, searchTodo,
    nextResult, prevResult } = store.search;
  let logOut = store.user.logOut;
  let userSrc = store.user.userData.userSrc;

  return (
    <header className="header">
      <div className="search">
        <button className="search__button" onClick={searchTodo}></button>
        <input 
          type="text" 
          className="search__input" 
          placeholder="Search for any training you want"
          value={searchText}
          onInput={changeSearchText}
        />
        { isSearch && ( 
          <div className="results">
            <div className="results__text">find { resultSearch.length } results</div>
            { resultSearch.length && ( 
              <div className="results__controls">
                <span className="results__text">{ resultText() }</span>
                <div>
                  <button className="results__button" onClick={nextResult}>⋀</button>
                  <button className="results__button" onClick={prevResult}>⋁</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="user">
        <div className="icon-wrapper">
          <div 
            className="header__icon"
            style={{ background: `url(${userSrc}) 50% 30% / cover` }}
            >
          </div>
        </div>
        <button className="btn" onClick={logOut}>Log out</button>
      </div>
    </header>
  )
})
export default Header;