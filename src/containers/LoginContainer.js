import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Grid, PageHeader} from "react-bootstrap";
import {Link} from "react-router-dom";
import LoginFormComponent from "../components/LoginFormComponent";
import * as UserActions from "../actions/UserActions";

class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.props.userActions.logout();

        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._validate = this._validate.bind(this);

        this.state = {
            email: {
                value: '',
                validation: null,
                error: '',
            },
            password: {
                value: '',
                validation: null,
                error: '',
            },
            submitted: false
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    _validate = () => {
        let isValid = true;

        const { email, password } = this.state;

        if(!email || !email.value) {
            this.setState({
                email: {
                    ...this.state.email,
                    validation: 'error',
                    error: 'Ce champs ne doit pas être vide.',
                }
            });

            isValid = false;
        }

        if(!password || !password.value) {
            this.setState({
                password: {
                    ...this.state.password,
                    validation: 'error',
                    error: 'Ce champs ne doit pas être vide.',
                }
            });

            isValid = false;
        }

        return isValid;
    };

    _handleChange = (e, field = null) => {
        let name, value;

        if(field) {
            name = field;
            value = e;
        } else {
            name = e.target.getAttribute('name');
            value = e.target.value;
        }

        this.setState({
            [name]: {
                value: value,
                validation: null,
                error: '',
            }
        });
    };

    _handleSubmit(e) {
        e.preventDefault();


        if(this._validate()) {
            const {email, password} = this.state;

            this.setState({
                submitted: true
            });

            this.props.userActions.login(email.value, password.value);
        }
    }

    render() {
        return (
            <Grid>
                <PageHeader>
                    Connexion <small>ou <Link to="/register">Créer un compte</Link></small>
                </PageHeader>

                <LoginFormComponent state={this.state}
                                    onChange={this._handleChange}
                                    onSubmit={this._handleSubmit}
                />
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    const { loggingIn } = state.AuthenticationReducer;

    return {
        loggingIn
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        userActions: bindActionCreators(UserActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);