import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function FilterSearch( props ) {
    // prepare for sorting values
    const [sortValue, setSortValue] = useState('');
    // prepare for search values
    const [searchValue, setSearchValue] = useState('');

    // perform sort by updating displayMode with values from dropdown
    const runSort = (event) => {
        setSortValue(event.target.value)
        props.onDisplayModeChange(event.target.value);
    };

    // perform search with values from state
    const runSearch = () => {
        props.onDisplayModeChange('author/' + searchValue);
    };

    // set search term into state
    const setSearchValueState = (event) => {
        setSearchValue(event.target.value)
    }

    return (
        <div className="filterSearch">
            <label>
                <span>Sort: </span>
                <select value={sortValue} onChange={runSort}>
                    <option value='az'>Author (A - Z)</option>
                    <option value='za'>Author (Z - A)</option>
                    <option value='new'>New</option>
                    <option value='old'>Old</option>
                </select>
            </label>

            <label>
                <span>Search by Name: </span>
                <input type={'text'} value={searchValue} placeholder={'name'} onChange={setSearchValueState}></input>
                <button onClick={runSearch}>Search</button>
            </label>
        </div>
    );
}

export default FilterSearch;

if (document.getElementById('filterSearch')) {
    ReactDOM.render(<FilterSearch />, document.getElementById('filterSearch'));
}
