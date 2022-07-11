import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom';
import CommentsList from './CommentsList';
import FilterSearch from './FilterSearch';

function Main() {
    // set initial displayMode = alphabetical
    // kept in parent component as shared by FilterSearch and CommentsList
    const [displayMode, setDisplayMode] = useState('az');

    return <>
            <FilterSearch displayMode={displayMode} onDisplayModeChange={setDisplayMode}/>
            <CommentsList displayMode={displayMode} onDisplayModeChange={setDisplayMode}/>
    </>;
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
