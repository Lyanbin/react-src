import React from './packages/react/react';
import ReactDom from './packages/react-dom/index';

ReactDom.render(
    React.createElement('div', {id: 123}, 'gogoo'),
    document.querySelector('#app')
)
console.log(React);
console.log(ReactDom);