import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import queryString from "query-string";
import {Button, Grid, Nav, NavItem, PageHeader, Pagination} from "react-bootstrap";

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
        this.setPast = this.setPast.bind(this);
    }

    componentDidMount() {
        // Fetch page from query
        let query = queryString.parse(this.props.location.search);

        this.fetchTravels(query.page, query.past);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.search !== this.props.location.search) {
            let oldQuery = queryString.parse(this.props.location.search);
            let newQuery = queryString.parse(nextProps.location.search);

            let oldPage = oldQuery.page ? parseInt(oldQuery.page, 0) : 1;
            let newPage = newQuery.page ? parseInt(newQuery.page, 0) : 1;

            let oldPast = oldQuery.past ? oldQuery.past === 'true' : false;
            let newPast = newQuery.past ? newQuery.past === 'true' : false;

            if (oldPage !== newPage || oldPast !== newPast) {
                this.fetchTravels(newPage, newPast);
            }
        }
    }

    fetchTravels(page = 1, past = false) {
        this.props.travelsActions.fetchTravels(page, past);
    }

    changePage(page) {
        this.props.travelsActions.changePage(page);
    }

    setPast(past) {
        this.props.travelsActions.setPast(past === 'past');
    }

    render() {
        const {travels, isLoading} = this.props;

        let query = queryString.parse(this.props.location.search);

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

                <Nav bsStyle="pills" activeKey={query.past === 'true' ? 'past' : 'future'} onSelect={this.setPast} style={{marginBottom: 20}}>
                    <NavItem eventKey="future">Prochains voyages</NavItem>
                    <NavItem eventKey="past">Anciens voyages</NavItem>
                </Nav>

                {
                    isLoading ? (
                        <LoaderComponent/>
                    ) : (
                        displayTravels && displayTravels.length > 0 && pagination ? (
                            <div className="list-travels">
                                <TravelsListComponent travels={displayTravels}/>
                                <Pagination activePage={pagination.current}
                                            items={pagination.last}
                                            onSelect={this.changePage}
                                />
                            </div>
                        ) : (
                            <p>Il n'y a pas encore de voyage, <a href="#" onClick={this.props.travelFormActions.openModal}>créé le premier</a>&nbsp;!</p>
                        )
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