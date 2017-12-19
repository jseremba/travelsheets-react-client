import React, {Component} from "react";
import {connect} from "react-redux";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";

class NavbarContainer extends Component {
    render() {
        const {user, location} = this.props;

        return (
            <Navbar fixedTop={true}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Travelsheets</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        {
                            user ? (
                                <LinkContainer to="/">
                                    <NavItem>Mes voyages</NavItem>
                                </LinkContainer>
                            ) : ''
                        }

                    </Nav>
                    {
                        user ? (
                            <Nav pullRight>
                                <LinkContainer to="/login">
                                    <NavItem active={false}>Déconnexion</NavItem>
                                </LinkContainer>
                            </Nav>
                        ) : (
                            <Nav pullRight>
                                <LinkContainer to="/login">
                                    <NavItem active={location.pathname === '/login'}>Connexion</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/register">
                                    <NavItem active={location.pathname === '/register'}>Inscription</NavItem>
                                </LinkContainer>
                            </Nav>
                        )
                    }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    const {user} = state.AuthenticationReducer;
    const {location} = state.routing;

    return {
        user,
        location,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);