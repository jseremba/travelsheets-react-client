import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import queryString from 'query-string';

import TravelsListComponent from "../components/TravelsListComponent";
import PaginationComponent from "../components/PaginationComponent";
import LoaderComponent from '../components/LoaderComponent';

import * as travelsActions from '../actions/TravelsActions';

class TravelsContainer extends Component {
    componentDidMount() {
        this.fetchTravels();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.location.search !== this.props.location.search) {
            let oldQuery = queryString.parse(this.props.location.search);
            let newQuery = queryString.parse(nextProps.location.search);

            let oldPage = oldQuery.page ? parseInt(oldQuery.page, 0) : 1;
            let newPage = newQuery.page ? parseInt(newQuery.page, 0) : 1;

            if(oldPage !== newPage) {
                this.fetchTravels(newPage);
            }
        }
    }

    fetchTravels(page) {
        // Fetch page from query
        if(!page) {
            let query = queryString.parse(this.props.location.search);

            if(query.page) {
                page = query.page;
            }
        }

        this.props.travelsActions.fetchTravels(page);
    }

    render () {
        const {travels, isLoading} = this.props;

        let currentPage = 1;
        let query = queryString.parse(this.props.location.search);

        if(query.page) {
            currentPage = parseInt(query.page, 0);
        }

        let itemsPerPage = travels['hydra:member'] && travels['hydra:member'].length;
        let totalItems = travels['hydra:totalItems'];

        return (
            <div>
                {
                    isLoading ? (
                        <LoaderComponent />
                    ) : (
                        <div>
                            <TravelsListComponent travels={travels['hydra:member']} />
                            <PaginationComponent
                                totalItems={totalItems}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onPageChange={(page) => {
                                    this.props.travelsActions.changePage(page);
                                }}
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
        isLoading: state.travels.isLoading
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        travelsActions: bindActionCreators(travelsActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelsContainer);