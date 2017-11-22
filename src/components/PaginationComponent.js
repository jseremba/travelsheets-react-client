import React from 'react';

export default class LoaderComponent extends React.PureComponent {
    render() {
        const {
            pagination,
            onPageChange
        } = this.props;

        let pages = [];

        if(pagination) {
            for(let i=1; i<=pagination.last; i++) {
                pages.push(i);
            }
        }

        return (
            <nav aria-label="Navigation">
                <ul className="pagination">
                    {
                        pages && pages.map(function(page) {
                            return (
                                <li key={page} className={(pagination.current === page ? 'active' : '')}>
                                    <a onClick={() => onPageChange(page)}>{page}</a>
                                </li>
                            );
                        })
                    }
                </ul>
            </nav>
        );
    }
}