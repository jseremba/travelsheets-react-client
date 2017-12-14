import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Grid, PageHeader} from "react-bootstrap";
import {Link} from "react-router-dom";

import RegisterFormComponent from "../components/RegisterFormComponent";

import * as UserActions from '../actions/UserActions';

const REGEX_EMAIL = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/;

class RegisterContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                firstname: {
                    value: '',
                    validation: null,
                    error: '',
                },
                lastname: {
                    value: '',
                    validation: null,
                    error: '',
                },
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
                passwordConfirm: {
                    value: '',
                    validation: null,
                    error: '',
                }
            },
            isLoading: false,
        };

        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    validate(field = null) {
        let isValid = true;

        let {form} = this.state;

        // Check firstname
        if(!field || field === 'firstname') {
            if(!form.firstname.value || form.firstname.value.length === 0) {
                form = {
                    ...form,
                    firstname: {
                        ...form.firstname,
                        validation: 'error',
                        error: 'Ce champs ne doit pas être vide.',
                    }
                };

                isValid = false;
            } else {
                form = {
                    ...form,
                    firstname: {
                        ...form.firstname,
                        validation: 'success',
                        error: '',
                    }
                }
            }
        }

        // Check lastname
        if(!field || field === 'lastname') {
            if(!form.lastname.value || form.lastname.value.length === 0) {
                form = {
                    ...form,
                    lastname: {
                        ...form.lastname,
                        validation: 'error',
                        error: 'Ce champs ne doit pas être vide.',
                    }
                };

                isValid = false;
            } else {
                form = {
                    ...form,
                    lastname: {
                        ...form.lastname,
                        validation: 'success',
                        error: '',
                    }
                }
            }
        }

        // Check email
        if(!field || field === 'email') {
            if(!form.email.value || form.email.value.length === 0) {
                form = {
                    ...form,
                    email: {
                        ...form.email,
                        validation: 'error',
                        error: 'Ce champs ne doit pas être vide.',
                    }
                };

                isValid = false;
            } else if(!REGEX_EMAIL.test(form.email.value)) {
                form = {
                    ...form,
                    email: {
                        ...form.email,
                        validation: 'error',
                        error: 'Cet email n\'est pas valide.',
                    }
                };

                isValid = false;
            } else {
                form = {
                    ...form,
                    email: {
                        ...form.email,
                        validation: 'success',
                        error: '',
                    }
                }
            }
        }

        // Check password
        if(!field || field === 'password') {
            if(!form.password.value || form.password.value.length === 0) {
                form = {
                    ...form,
                    password: {
                        ...form.password,
                        validation: 'error',
                        error: 'Ce champs ne doit pas être vide.',
                    }
                };

                isValid = false;
            } else if(!REGEX_PASSWORD.test(form.password.value)) {
                form = {
                    ...form,
                    password: {
                        ...form.password,
                        validation: 'error',
                        error: 'Le mot de passe doit être compris entre 8 et 30 caractères et doit contenir au moins une majuscule, une minuscule et un chiffre.',
                    }
                };

                isValid = false;
            } else {
                form = {
                    ...form,
                    password: {
                        ...form.password,
                        validation: 'success',
                        error: '',
                    }
                }
            }
        }

        // Check passwordConfirm
        if(!field || field === 'passwordConfirm') {
            if(!form.passwordConfirm.value || form.passwordConfirm.value.length === 0) {
                form = {
                    ...form,
                    passwordConfirm: {
                        ...form.passwordConfirm,
                        validation: 'error',
                        error: 'Ce champs ne doit pas être vide.',
                    }
                };

                isValid = false;
            } else if(form.password.value !== form.passwordConfirm.value) {
                form = {
                    ...form,
                    passwordConfirm: {
                        ...form.passwordConfirm,
                        validation: 'error',
                        error: 'Les deux mots de passes sont différents',
                    }
                };

                isValid = false;
            } else {
                form = {
                    ...form,
                    passwordConfirm: {
                        ...form.passwordConfirm,
                        validation: 'success',
                        error: '',
                    }
                }
            }
        }

        this.setState({
            form: form,
        });

        return isValid;
    }

    _handleChange = (e, field = null) => {
        let value;

        if(field) {
            value = e;
        } else {
            field = e.target.getAttribute('name');
            value = e.target.value;
        }

        this.setState({
            form: {
                ...this.state.form,
                [field]: {
                    value: value,
                    validation: null,
                    error: '',
                }
            }
        }, () => {
            this.validate(field);
        });
    };

    _handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if(this.validate()) {
            const {form} = this.state;
            const {firstname, lastname, email, password} = form;

            let data = {
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
                password: password.value,
            };

            this.props.userActions.register(data);
        }
    };

    render() {
        const {form} = this.state;
        const {isLoading, user} = this.props;

        return (
            <Grid>
                <PageHeader>
                    Créer un compte <small>ou <Link to="/login">Connexion</Link></small>
                </PageHeader>

                {
                    user ? (
                        <div>
                            <h3>Bonjour {user.firstname},</h3>
                            <p>Un email t'a été envoyé pour confirmer ton inscription.</p>
                            <p>Merci !</p>
                        </div>
                    ) : (
                        <RegisterFormComponent onChange={this._handleChange}
                                               onSubmit={this._handleSubmit}
                                               form={form}
                                               isLoading={isLoading}/>
                    )
                }
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    const { isLoading, user } = state.RegisterReducer;
    return {
        isLoading,
        user
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        userActions: bindActionCreators(UserActions, dispatch, props),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);