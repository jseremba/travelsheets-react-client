import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import TravelsListComponent from "../components/TravelsListComponent";
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

        return (
            <div>
                {
                    isLoading ? (
                        <LoaderComponent />
                    ) : (
                        <TravelsListComponent travels={travels['hydra:member']} />
                    )
                }

                <div className="btn-group" role="group" aria-label="...">
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