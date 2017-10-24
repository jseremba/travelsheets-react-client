import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import TravelsListComponent from "../../components/travels/TravelsListComponent";
import * as travelsActions from '../../actions/travels';

class TravelsContainer extends Component {
    componentDidMount() {
        this.listTravels();
    }

    listTravels() {
        this.props.travelsActions.listTravels();
    }

    render () {
        const {travels, isLoading} = this.props;

        return (
            <TravelsListComponent travels={travels} isLoading={isLoading} />
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