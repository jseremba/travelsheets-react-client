import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import queryString from "query-string";
import {Button, Grid, PageHeader, Pagination} from "react-bootstrap";

import TravelsListComponent from "../components/TravelsListComponent";
import LoaderComponent from "../components/LoaderComponent";

import * as travelsActions from "../actions/TravelsActions";
import * as travelFormActions from "../actions/TravelFormActions";
import TravelFormContainer from "./TravelFormContainer";

class TravelsContainer extends Component {
    constructor(props) {
        super(props);

        this.fetchTravels = this.fetchTravels.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        // Fetch page from query
        let query = queryString.parse(this.props.location.search);

        this.fetchTravels(query.page);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.search !== this.props.location.search) {
            let oldQuery = queryString.parse(this.props.location.search);
            let newQuery = queryString.parse(nextProps.location.search);

            let oldPage = oldQuery.page ? parseInt(oldQuery.page, 0) : 1;
            let newPage = newQuery.page ? parseInt(newQuery.page, 0) : 1;

            if (oldPage !== newPage) {
                this.fetchTravels(newPage);
            }
        }
    }

    fetchTravels(page, past = false) {
        this.props.travelsActions.fetchTravels(page, past);
    }

    changePage(page) {
        this.props.travelsActions.changePage(page);
    }

    render() {
        const {travels, isLoading} = this.props;

        // Search
        let displayTravels = travels['items'];
        let pagination = travels['pagination'];

        return (
            <Grid>
                <PageHeader>
                    Mes voyages
                    &nbsp;<Button bsStyle="primary" bsSize="xsmall" onClick={this.props.travelFormActions.openModal}><i
                    className="glyphicon glyphicon-plus"/></Button>
                </PageHeader>

                {
                    isLoading ? (
                        <LoaderComponent/>
                    ) : (
                        displayTravels && pagination && <div className="list-travels">
                            <TravelsListComponent travels={displayTravels}/>
                            <Pagination activePage={pagination.current}
                                        items={pagination.last}
                                        onSelect={this.changePage}
                            />
                        </div>
                    )
                }

                <TravelFormContainer />
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