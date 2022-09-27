import React from 'react';
import Menu from '../Components/Menu/Menu';
import Main from '../Components/Main/Main'

import './Todopage.css'

const Todopage = () => {
    return (
        <div className="todo-page">
            <Menu/>
            <Main/>
        </div>
    );
}

export default Todopage;
