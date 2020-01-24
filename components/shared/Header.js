import React from 'react';
//import Link from 'next/link';
import ActiveLink from '../ActiveLink';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu} from 'reactstrap';

import auth0 from '../../services/auth0';

// On crée un composant BsNavLink qui permet de créer les liens du menu
// en lui passant des props pour l'intitulé et l'url cible
const BsNavLink = (props) => {
  const { route, title } = props;
  const className = props.className || "";

  return (
    <ActiveLink activeClassName="active" route={route}>
      <a className={`nav-link port-navbar-link ${className}`}> {title} </a>
    </ActiveLink>
    /*
      <Link href={route}>
        <a className="nav-link port-navbar-link"> {title} </a>
      </Link>
    */
  )
}

// On crée un composant Login qui est un span clickable
// qui appelle la méthode auth0.login de la class auth0 qui
// gère l'authentification auth0 
const Login = () => {
  return (
    <span onClick={auth0.login} className="nav-link port-navbar-link clickable"> Login </span>
  )
}

// On crée un composant Login qui est un span clickable
// qui appelle la méthode auth0.logout de la class Auth0 qui
// gère l'authentification auth0 
const Logout = () => {
  return (
    <span onClick={auth0.logout} className="nav-link port-navbar-link clickable"> Logout </span>
  )
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dropdownOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }


  renderGoodiesMenu() {
    //const { isSiteOwner } = this.props;

    //if (isSiteOwner) {
      return (
        <Dropdown className="port-navbar-link port-dropdown-menu" nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
          <DropdownToggle className="port-dropdown-toggle" nav caret>
            Goodies
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <BsNavLink className="port-dropdown-item"
                         route="/memory"
                         title="Memory" />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink className="port-dropdown-item"
                         route="/photos"
                         title="Photos" />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )
    //}

    // return (
    //   <NavItem className="port-navbar-item">
    //     <BsNavLink route="/blogs" title="Blog" />
    //   </NavItem>
    // )
  }

  render() {
    // On récupère la variable isAuthenticated depuis les props
    // que l'on a passé au composant
    const { isAuthenticated, user, className } = this.props;
    const { isOpen } = this.state;

    const menuOpenClass = isOpen ? 'menu-open' : 'menu-close';    

    return (
      <div> 
        <Navbar className= {`port-navbar port-base absolute ${className} ${menuOpenClass}`} color="transparent" dark expand="lg">
          <NavbarBrand className="port-navbar-brand" href="/">Johan IBTATEN</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/" title="Home" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/about" title="About" />
              </NavItem>
              { isAuthenticated &&
                this.renderGoodiesMenu()
              }      
              <NavItem className="port-navbar-item">
                <BsNavLink route="/portfolios" title="Portfolio" />
              </NavItem>
              { /*
                <NavItem className="port-navbar-item">
                  <BsNavLink route="/blogs" title="Blog" />
                </NavItem>
                <NavItem className="port-navbar-item">
                  <BsNavLink route="/cv" title="Cv" />
                </NavItem>
                <NavItem className="port-navbar-item">
                  <BsNavLink route="/secret" title="Secret" />
                </NavItem>
                <NavItem className="port-navbar-item">
                  <BsNavLink route="/owner" title="Owner" />
                </NavItem>
                <NavItem className="port-navbar-item">
                  <BsNavLink route="/portfolioNew" title="portfolioNew" />
                </NavItem>
              */ } 
              { 
                // Si l'utilisateur n'est pas authentifié
                // on affiche Login
                !isAuthenticated &&
              <NavItem className="port-navbar-item">
                <Login />
              </NavItem>
              }
              { 
                // Si l'utilisateur est authentifié
                // on affiche Logout
                isAuthenticated &&
              <NavItem className="port-navbar-item">
                <Logout />
              </NavItem>
              }            
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
