import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Glyphicon, Grid, PageHeader} from "react-bootstrap";
import LoaderComponent from "../components/LoaderComponent";
import {Link} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import queryString from 'query-string';

import * as UserActions from '../actions/UserActions';

class RegisterConfirmContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Fetch data from query
        const query = queryString.parse(this.props.location.search);
        const {email, token} = query;

        this.props.userActions.registerConfirm(email, token);
    }

    componentWillUnmount() {
    }

    render() {
        const {isLoading, user} = this.props;

        return (
            <Grid>
                <PageHeader>
                    Créer un compte
                </PageHeader>
                {
                    isLoading ? (
                        <LoaderComponent/>
                    ) : (
                        user ? (
                                <div>
                                    <h3>Félicitations,</h3>
                                    <p>Ton email est confirmé, tu peux maintenant <Link to="/login">te connecter</Link> et commencer à voyager !</p >

                                    <LinkContainer to="/login">
                                        <Button bsStyle="primary">Let's Go!</Button>
                                    </LinkContainer>
                                </div>
                        ) : ''
                    )
                }
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    const {isLoading, user, error} = state.RegisterConfirmReducer;

    return {
        isLoading,
        user,
        error
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        userActions: bindActionCreators(UserActions, dispatch, props),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterConfirmContainer);