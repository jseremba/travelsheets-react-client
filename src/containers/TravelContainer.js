import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as TravelActions from '../actions/TravelActions';

import LoaderComponent from '../components/LoaderComponent';
import TravelInfosComponent from "../components/TravelInfosComponent";
import StepsContainer from "./StepsContainer";

class TravelContainer extends Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        if(id) {
            this.props.travelActions.fetchTravel(id);
        }
    }

    render() {
        const {travel, isLoading} = this.props;

        return (
            <div className="travel-container">
                {
                    isLoading ? (
                        <LoaderComponent/>
                    ) : (
                        <div className="row">
                            <div className="col-md-4">
                                <TravelInfosComponent travel={travel}/>
                            </div>
                            <div className="col-md-8">
                                <StepsContainer travel={travel}/>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        travel: state.TravelReducer.travel,
        isLoading: state.TravelReducer.isLoading
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        travelActions: bindActionCreators(TravelActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelContainer);