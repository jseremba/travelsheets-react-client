import React, {Component} from 'react';
import {connect} from "react-redux";
import Immutable from "immutable";
import {bindActionCreators} from "redux";

import TravelsListComponent from "../../components/travels/TravelsListComponent";
import * as travelsActionsCreators from '../../actions/travels';

class TravelsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.listTravels();
    }

    listTravels() {
        this.props.travelsActions.listTravels();
    }

    render () {
        const {travels} = this.props;

        return (
            <TravelsListComponent travels={travels} />
        );
    }
}

function mapStateToProps(state) {
    return {
        travels: state.travels.getIn(['list'], Immutable.List()).toJS()
    };
}

function mapDispatchToProps(dispatch) {
    return {
        travelsActions: bindActionCreators(travelsActionsCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelsContainer);