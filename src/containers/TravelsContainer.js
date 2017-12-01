import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import queryString from "query-string";
import {Button, Grid, Modal, PageHeader, Pagination} from "react-bootstrap";

import TravelsListComponent from "../components/TravelsListComponent";
import LoaderComponent from "../components/LoaderComponent";
import TravelAddContainer from "./TravelAddContainer";

import * as travelsActions from "../actions/TravelsActions";
import * as travelFormActions from "../actions/TravelFormActions";

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
        if (nextProps.location.search !== this.props.location.search) {
            let oldQuery = queryString.parse(this.props.location.search);
            let newQuery = queryString.parse(nextProps.location.search);

            let oldPage = oldQuery.page ? parseInt(oldQuery.page, 0) : 1;
            let newPage = newQuery.page ? parseInt(newQuery.page, 0) : 1;

            let oldSearch = oldQuery.search;
            let newSearch = newQuery.search;

            if (oldPage !== newPage || oldSearch !== newSearch) {
                this.fetchTravels(newPage, newSearch);
            }

            if (oldSearch !== newSearch) {
                this.props.travelsActions.setSearchBar(newSearch);
            }
        }
    }

    fetchTravels(page, keyword) {
        this.props.travelsActions.fetchTravels(page, keyword);
    }

    setSearchBar(event) {
        if (this.searchTimeout) clearTimeout(this.searchTimeout);

        let keyword = event.target.value.toLowerCase();

        this.searchTimeout = setTimeout(() => {
            this.props.travelsActions.searchTravels(keyword);
        }, 200);

        this.props.travelsActions.setSearchBar(keyword);
    }

    changePage(page) {
        this.props.travelsActions.changePage(page);
    }

    render() {
        const {travels, isLoading} = this.props;

        // Search
        let displayTravels = travels['items'];

        return (
            <Grid>
                <PageHeader>
                    Mes voyages
                    &nbsp;<Button bsStyle="primary" bsSize="xsmall" onClick={this.props.travelFormActions.openModal}><i
                    className="glyphicon glyphicon-plus"/></Button>
                </PageHeader>
                <input type="search" value={this.props.searchBar} placeholder="Rechercher"
                       className="form-control search-bar" onChange={this.setSearchBar}/>

                {
                    isLoading ? (
                        <LoaderComponent/>
                    ) : (
                        <div className="list-travels">
                            <TravelsListComponent travels={displayTravels}/>
                            <Pagination activePage={travels.pagination.current} items={travels.pagination.last}
                                        onSelect={this.changePage}/>
                        </div>
                    )
                }

                <TravelAddContainer />
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        travels: state.travels.travels,
        isLoading: state.travels.isLoading,
        searchBar: state.travels.searchBar,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        travelsActions: bindActionCreators(travelsActions, dispatch, props),
        travelFormActions: bindActionCreators(travelFormActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelsContainer);