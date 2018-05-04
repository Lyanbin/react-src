import React from '../packages/react';

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            a: 'hello'
        }
    }

    render() {
        return React.createElement(
            'div',
            { className: 'apppp' },
            '123123123123'
        );
    }

}