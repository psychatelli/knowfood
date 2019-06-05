import React, { Component } from 'react'
// import logo from '../../img/WittwerStatus-logo.png';
import  { Link }  from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

 class Landing extends Component {

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push('/dashboard');
  //   }
  // }


    render() {
        return(
            <div>

          
                <div className="container">
                 <div className="row">
                  <div className="Landing_wrapper z-depth-2">
                      <div className="">
                      {/* <center> <img style={{width:'300px'}} alt='logo'  src={logo} /></center> */}
                      <center><h2> Title</h2> </center>
                      </div>
                      <center><p className="lead">
                      {' '}
                       This is an intro sentence </p> </center>
                      <hr />
                      <Link to="/register" className="btn Button">Sign Up</Link>
                      <Link to="/login" className="btn Button">Login</Link>
                </div>
                </div>
            </div>

            </div>
        )
    }
}


Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
