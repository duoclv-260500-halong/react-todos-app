import React from 'react';

import './Menu.css'
const Menu = () => {
    return (
        <>
        <aside className="learn">
            <header>
                <h3>TypeScript</h3>
                <span className="source-links">
                    <h5>TypeScript &amp; AngularJS</h5>
                    <a className="demo-link" data-type="local" href="https://todomvc.com/examples/typescript-angular">Demo</a>
                    <a href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/typescript-angular">Source</a>
                    <h5>TypeScript &amp; Backbone.js</h5>
                    <a className="demo-link" data-type="local" href="https://todomvc.com/examples/typescript-backbone">Demo</a>
                    <a href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/typescript-backbone">Source</a>
                    <h5>TypeScript &amp; React</h5>
                    <a href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/typescript-react">Source</a>
                </span>
            </header>
            <hr />
            <blockquote className="quote speech-bubble">
                <p>TypeScript is a language for application-scale JavaScript development. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open Source.</p>
                <footer>
                    <a href="http://typescriptlang.org">TypeScript</a>
                </footer> </blockquote>
            <hr />
            <h4>Official Resources</h4>
            <ul>
                <li> <a href="http://www.typescriptlang.org/Tutorial">Tutorial</a> </li>
                <li> <a href="http://www.typescriptlang.org/Playground">Code Playground</a> </li>
                <li> <a href="https://github.com/Microsoft/TypeScript/wiki">Documentation</a> </li>
                <li> <a href="http://www.typescriptlang.org/Samples">Applications built with TypeScript</a> </li>
                <li> <a href="http://blogs.msdn.com/b/typescript">Blog</a> </li>  <li> <a href="https://github.com/Microsoft/TypeScript">Source Code</a> </li>
            </ul>
            <h4>Articles and Guides</h4>
            <ul>
                <li> <a href="http://www.nczonline.net/blog/2012/10/04/thoughts-on-typescript">Thoughts on TypeScript</a> </li>
                <li> <a href="http://www.leebrimelow.com/why-i-like-typescripts">ScreenCast - Why I Like TypeScript</a> </li>
            </ul>
            <h4>Community</h4>
            <ul>
                <li> <a href="http://stackoverflow.com/questions/tagged/typescript">TypeScript on Stack Overflow</a> </li>
                <li> <a href="https://github.com/Microsoft/TypeScript/issues">Forums</a> </li>  <li> <a href="http://twitter.com/typescriptlang">TypeScript on Twitter</a> </li>
            </ul>
            <footer>
                <hr />
                <em>If you have other helpful links to share, or find any of the links above no longer work, please
                    <a href="https://github.com/tastejs/todomvc/issues">let us know</a>.
                </em>
            </footer>
            </aside>
        </>
    );
}

export default Menu;
