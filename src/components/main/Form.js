import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';

const Form = observer(() => {
    let { value, onInput, searchText, result, nextResult, prevResult, isSearch } = store.search;
    let resultText = store.search.getResultText();

    return (
        <div className="main-header__search">
            { isSearch && (
                <div className="results">
                    <div className="results__text">find {result.length} results</div>
                    <span>{resultText}</span>
                    { result.length > 0 && (
                        <div>
                            <button className="results__button" onClick={prevResult}>⋀</button>
                            <button className="results__button" onClick={nextResult}>⋁</button>
                        </div>
                    )}
                </div>
            )}
            <input 
                type="text" 
                placeholder="search..." 
                className="main-header__input"
                value={value}
                onInput={onInput}
            />
            <button className="search" onClick={searchText}></button>
        </div>
    );
})

export default Form;