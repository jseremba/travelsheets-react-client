import React from 'react';
import {Button, ControlLabel, FormControl, FormGroup, Glyphicon, HelpBlock} from "react-bootstrap";

export default class RegisterFormComponent extends React.PureComponent {
    render() {
        const {onSubmit, onChange, form, isLoading} = this.props;

        return (
            <form onSubmit={onSubmit}>
                <FormGroup controlId="registerFirstname" validationState={form.firstname.validation}>
                    <ControlLabel>Prénom*</ControlLabel>
                    <FormControl type="text"
                                 placeholder="Jack"
                                 disabled={isLoading}
                                 value={form.firstname.value ? form.firstname.value : ''}
                                 name="firstname"
                                 onChange={onChange}
                    />
                    {form.firstname.error && <HelpBlock>{form.firstname.error}</HelpBlock>}
                </FormGroup>
                <FormGroup controlId="registerLastname" validationState={form.lastname.validation}>
                    <ControlLabel>Nom*</ControlLabel>
                    <FormControl type="text"
                                 placeholder="Sparrow"
                                 disabled={isLoading}
                                 value={form.lastname.value ? form.lastname.value : ''}
                                 name="lastname"
                                 onChange={onChange}
                    />
                    {form.lastname.error && <HelpBlock>{form.lastname.error}</HelpBlock>}
                </FormGroup>
                <FormGroup controlId="registerEmail" validationState={form.email.validation}>
                    <ControlLabel>Email*</ControlLabel>
                    <FormControl type="email"
                                 placeholder="jack.sparrow@blackpearl.com"
                                 disabled={isLoading}
                                 value={form.email.value ? form.email.value : ''}
                                 name="email"
                                 onChange={onChange}
                    />
                    {form.email.error && <HelpBlock>{form.email.error}</HelpBlock>}
                </FormGroup>
                <FormGroup controlId="registerPassword" validationState={form.password.validation}>
                    <ControlLabel>Mot de passe*</ControlLabel>
                    <FormControl type="password"
                                 placeholder="••••••••"
                                 disabled={isLoading}
                                 value={form.password.value ? form.password.value : ''}
                                 name="password"
                                 onChange={onChange}
                    />
                    {form.password.error && <HelpBlock>{form.password.error}</HelpBlock>}
                </FormGroup>
                <FormGroup controlId="registerPasswordConfirm" validationState={form.passwordConfirm.validation}>
                    <ControlLabel>Confirmation du mot de passe*</ControlLabel>
                    <FormControl type="password"
                                 placeholder="••••••••"
                                 disabled={isLoading}
                                 value={form.passwordConfirm.value ? form.passwordConfirm.value : ''}
                                 name="passwordConfirm"
                                 onChange={onChange}
                    />
                    {form.passwordConfirm.error && <HelpBlock>{form.passwordConfirm.error}</HelpBlock>}
                </FormGroup>

                <Button type="submit" disabled={isLoading} bsStyle="success">{isLoading ? (<Glyphicon glyph="repeat"/>) : 'Inscription'}</Button>
            </form>
        );
    }
}