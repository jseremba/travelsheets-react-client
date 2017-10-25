import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import queryString from 'query-string';
import {API_PAGINATION_ITEMS_PER_PAGE} from '../settings/configuration';

import TravelsListComponent from "../components/TravelsListComponent";
import PaginationComponent from "../components/PaginationComponent";
import LoaderComponent from '../components/LoaderComponent';

import * as travelsActions from '../actions/TravelsActions';

class TravelsContainer extends Component {
    constructor(props) {
        super(props);

        this.setSearchBar = this.setSearchBar.bind(this);
        this.fetchTravels = this.fetchTravels.bind(this);
        this.changePage = this.changePage.bind(this);

        this.searchTimeout = null;
    }

    componentDidMount() {
        // Fetch page from query
        let query = queryString.parse(this.props.location.search);

        this.props.travelsActions.setSearchBar(query.search);
        this.fetchTravels(query.page, query.search);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.location.search !== this.props.location.search) {
            let oldQuery = queryString.parse(this.props.location.search);
            let newQuery = queryString.parse(nextProps.location.search);

            let oldPage = oldQuery.page ? parseInt(oldQuery.page, 0) : 1;
            let newPage = newQuery.page ? parseInt(newQuery.page, 0) : 1;

            let oldSearch = oldQuery.search;
            let newSearch = newQuery.search;

            if(oldPage !== newPage || oldSearch !== newSearch) {
                this.fetchTravels(newPage, newSearch);
            }

            if(oldSearch !== newSearch) {
                this.props.travelsActions.setSearchBar(newSearch);
            }
        }
    }

    fetchTravels(page, keyword) {
        this.props.travelsActions.fetchTravels(page, keyword);
    }

    setSearchBar (event) {
        if(this.searchTimeout) clearTimeout(this.searchTimeout);

        let keyword = event.target.value.toLowerCase();

        this.searchTimeout = setTimeout(() => {
            this.props.travelsActions.searchTravels(keyword);
        }, 200);

        this.props.travelsActions.setSearchBar(keyword);
    }

    changePage (page) {
        this.props.travelsActions.changePage(page);
    }

    render () {
        const {travels, isLoading, searchBar} = this.props;

        // Pagination
        let currentPage = 1;
        let query = queryString.parse(this.props.location.search);

        if(query.page) {
            currentPage = parseInt(query.page, 0);
        }

        let itemsPerPage = API_PAGINATION_ITEMS_PER_PAGE;
        let totalItems = travels['hydra:totalItems'];

        // Search
        let displayTravels = travels['hydra:member'];

        if(searchBar && searchBar.length > 0) {
            displayTravels = displayTravels && displayTravels.filter(travel => travel.name.toLowerCase().includes(searchBar));
        }

        return (
            <div>
                <input type="search" value={this.props.searchBar} placeholder="Search by Name" className="form-control search-bar" onChange={this.setSearchBar} />

                {
                    isLoading ? (
                        <LoaderComponent/>
                    ) : (
                        <div>
                            <TravelsListComponent travels={displayTravels}/>
                            <PaginationComponent
                                totalItems={!isLoading ? totalItems : 1}
                                itemsPerPage={!isLoading ? itemsPerPage : 1}
                                currentPage={currentPage}
                                onPageChange={this.changePage}
                            />
                        </div>
                    )
                }

                <div className="btn-group" role="group">
                    {/*<button onClick={() => } className="btn btn-default btn-sm"><i className="glyphicon glyphicon-plus"/></button>*/}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        travels: state.travels.travels,
        isLoading: state.travels.isLoading,
        searchBar: state.travels.searchBar
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        travelsActions: bindActionCreators(travelsActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelsContainer);