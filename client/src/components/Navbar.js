import React, { Component } from 'react'
import  { Link }  from 'react-router-dom';
import logo from '../../img/WittwerStatus-logo.png';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';


class Navbars extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    //window.location.href = '/login';

  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="right hide-on-med-and-down">
      
      <li className="nav-item">
          <Link className="nav-link" to="/profiles">
            Agents
          </Link>
        </li> 

       <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Conversations
          </Link>
        </li>

        

        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a  href="" onClick={this.onLogoutClick.bind(this)}   className="nav-link" >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <div> 
      <ul  className="right hide-on-med-and-down">
      <li className="nav-item">
          <Link className="nav-link" to="/profiles">
            Agents
          </Link>
        </li> 
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>

      

      </div>
    );


        return(
          <div>
            <ul className="sidenav" id="mobile-demo">
            <li><a href="sass.html">Sample Sidebar</a></li>
            {/* <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">Javascript</a></li>
            <li><a href="mobile.html">Mobile</a></li> */}
          </ul>

          <div className="navbar-fixed">



          <nav className="grey darken-3">
               <div className="nav-wrapper">
                {/* <a style={{paddingLeft: '10px', paddingTop: '5px'}} href="/dashboard" className="brand-logo"><img style={{width:'140px'}} atl="logo"  src={logo} /></a> */}
                <a style={{paddingLeft: '10px', paddingTop: '5px'}} href="/dashboard" className="brand-logo">Skynet</a>

                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                {isAuthenticated ? authLinks : guestLinks}
               </div>
          </nav>

             


            </div>


           

            </div>
          
        )
    }
}



Navbars.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})


export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbars);
