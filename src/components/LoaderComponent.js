import React from 'react';

export default class LoaderComponent extends React.PureComponent {
    render() {
        return (
            <p className='loading'><span className="loader"/></p>
        );
    }
}