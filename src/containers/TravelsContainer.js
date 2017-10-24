import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import TravelsListComponent from "../components/TravelsListComponent";
import PaginationComponent from "../components/PaginationComponent";
import LoaderComponent from '../components/LoaderComponent';

import * as travelsActions from '../actions/TravelsActions';

class TravelsContainer extends Component {
    componentDidMount() {
        this.fetchTravels();
    }

    fetchTravels(page) {
        this.props.travelsActions.fetchTravels(page);
    }

    addTravel() {
        console.log('addTravel');
    }

    render () {
        const {travels, isLoading} = this.props;

        let currentPage = travels['@id'] ? parseInt(travels['@id'].replace('/app_dev.php/travels?page=', ''), 0) : null;

        return (
            <div>
                {
                    isLoading ? (
                        <LoaderComponent />
                    ) : (
                        <div>
                            <TravelsListComponent travels={travels['hydra:member']} />
                            <PaginationComponent
                                totalItems={travels['hydra:totalItems']}
                                itemsPerPage={travels['hydra:itemsPerPage']}
                                currentPage={currentPage}
                                onPageChange={(page) => {
                                    this.fetchTravels(page);
                                }}
                            />
                        </div>
                    )
                }

                <div className="btn-group" role="group">
                    <button onClick={this.addTravel} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-plus"/></button>
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

const mapDispatchToProps = dispatch => {
    return {
        travelsActions: bindActionCreators(travelsActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelsContainer);