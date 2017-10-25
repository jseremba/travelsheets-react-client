import React from 'react';

export default class LoaderComponent extends React.PureComponent {
    render() {
        const {
            currentPage,
            itemsPerPage,
            totalItems,
            onPageChange
        } = this.props;

        let nbPages;
        let pages = [];

        if(itemsPerPage && totalItems) {
            nbPages = Math.ceil(totalItems / itemsPerPage);
            for(let i=0; i<nbPages; i++) {
                pages.push(i+1);
            }
        }

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {
                        pages && pages.map(function (page) {
                            return (
                                <li key={page} className={(currentPage === page ? 'active' : '')}><a href="javascript:void(0);" onClick={() => onPageChange(page)}>{page}</a></li>
                            );
                        })
                    }
                </ul>
            </nav>
        );
    }
}