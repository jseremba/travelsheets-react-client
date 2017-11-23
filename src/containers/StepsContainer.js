import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as StepActions from '../actions/StepActions';

import LoaderComponent from '../components/LoaderComponent';
import StepsListComponent from "../components/StepsListComponent";

class StepsContainer extends Component {
    componentDidMount() {
        let travel = this.props.travel['@id'];
        if(travel) {
            this.props.stepActions.fetchSteps(travel);
        }
    }

    render() {
        const {collection, isLoading} = this.props;

        let steps = collection.items;

        return (
            <div className="steps-container">
                {
                    isLoading ? (
                        <LoaderComponent/>
                    ) : (
                        <StepsListComponent steps={steps}/>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        collection: state.StepReducer.collection,
        isLoading: state.StepReducer.isLoading
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        stepActions: bindActionCreators(StepActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepsContainer);