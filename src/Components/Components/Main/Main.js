import React from 'react';
import TodoApp from './TodoApp'
import Footer from './Footer';

import './Main.css'
const Main = () => {
    return (
        <>
            <div className="main-app">
                <TodoApp />
                <Footer/>
            </div>
        </>
    );
}

export default Main;
