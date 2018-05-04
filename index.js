import React from './packages/react/react';
import ReactDom from './packages/react-dom/index';
import { App } from './components/app';
ReactDom.render(
    React.createElement(App, {id: '我传了个id'}, 'gogoo'),
    document.querySelector('#app')
);