import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const token = localStorage.getItem('access_token');

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">{this.props.title}</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/strict_task">StrictTask</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            <NavItem>
              { token ?
                (<NavLink tag={Link} to="/logout">Logout</NavLink>)
                :
                (<NavLink tag={Link} to="/login">Login</NavLink>)
              }
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default withRouter(Header);