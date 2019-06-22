import React, { Component, Fragment } from 'react'
import  { Link }  from 'react-router-dom';
// import logo from '../../img/WittwerStatus-logo.png';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import { logout } from '../actions/auth';


class Navbars extends Component {
  onLogoutClick() {
    this.props.logout();
    window.location.href = '/login';
    // this.props.history.push('/login');

  }

  render() {
    const { isAuthenticated, loading } = this.props;

    const authLinks = (
      <ul className="right hide-on-med-and-down">
      
        <li className="nav-item">
          <Link className="nav-link" to="/profiles">
            Profiles
          </Link>
        </li> 

       <li className="nav-item">
          <Link className="nav-link" to="/recipies">
            Recipies
          </Link>
        </li>

        <li className="nav-item">
          <a  href="#!" onClick={this.onLogoutClick.bind(this)}   className="nav-link">
            {/* <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '} */}
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
            Profiles
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
            
              <div className="navbar-fixed">
                  <nav className="grey darken-3">
                      <div className="nav-wrapper">
                        {/* <a style={{paddingLeft: '10px', paddingTop: '5px'}} href="/dashboard" className="brand-logo"><img style={{width:'140px'}} atl="logo"  src={logo} /></a> */}
                        <a style={{paddingLeft: '10px', paddingTop: '5px'}} href="/dashboard" className="brand-logo">KnowFood</a>

                        {!loading && (<Fragment> { isAuthenticated ? authLinks : guestLinks } </Fragment>)} 
                      </div>
                  </nav>
              </div>

            </div>
          
        )
    }
}



Navbars.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading

})


export default connect(mapStateToProps, { logout })(Navbars);
