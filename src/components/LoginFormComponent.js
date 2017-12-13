import React from 'react';
import {Button, ControlLabel, FormControl, FormGroup, Glyphicon, HelpBlock} from "react-bootstrap";

export default class LoginFormComponent extends React.PureComponent {
    render() {
        const {values, isLoading} = this.props;

        return (
            <form>
                <FormGroup controlId="loginEmail" validationState={values.email.validation}>
                    <ControlLabel>Email*</ControlLabel>
                    <FormControl type="email"
                                 placeholder="example@domain.com"
                                 disabled={isLoading}
                                 value={values.email.value ? values.email.value : ''}
                                 name="email"
                    />
                    {values.email.error && <HelpBlock>{values.email.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="loginPassword" validationState={values.password.validation}>
                    <ControlLabel>Mot de passe*</ControlLabel>
                    <FormControl type="password"
                                 placeholder="•••••••••"
                                 disabled={isLoading}
                                 value={values.password.value ? values.password.value : ''}
                                 name="password"
                    />
                    {values.password.error && <HelpBlock>{values.password.error}</HelpBlock>}
                </FormGroup>

                <Button type="submit" disabled={isLoading} bsStyle="success">{isLoading ? (<Glyphicon glyph="repeat"/>) : 'Connexion'}</Button>
            </form>
        );
    }
}