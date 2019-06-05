import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { registerUser } from '../../actions/authActions';
import { register  } from '../../actions/auth';
import { setAlert  } from '../../actions/alert';
import  {  Redirect}  from 'react-router-dom';

import Alert from '../../components/common/alert';

import TextFieldGroup from '../../components/common/TextFieldGroup';


class Register extends Component {

constructor() {
    super();
    this.state = {
        username: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    } 
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)

}

    componentDidMount() {
      if(this.props.isAuthenticated){
          this.props.history.push('/');
      }
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.isAuthenticated) {
          this.props.history.push('/');
      }
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

    }

    onSubmit(e) {
        e.preventDefault();
        const {username, email, password, password2 } = this.state;
        const {setAlert, register } = this.props;

        if(password !== password2) {
          setAlert('Passwords do not patch', 'danger')
        }else{
          register({ username, email, password });
        }

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        // this.props.registerUser(newUser, this.props.history);

       

    }

    render() {
      const { register } = this.props;
      const { errors } = this.state;

        return(
  <div className="register">
    
    <div className="container landing-inner">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create Your Account</p>
          
          <Alert />

          
          <div className="centered-horizontal">
          <form noValidate className="centered-form" onSubmit={this.onSubmit}>


             <TextFieldGroup
                  placeholder="Name"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  // error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  // error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  // error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  // error={errors.password2}
                />


                <input type="submit" className="btn Button" />
          </form>
          </div>

        </div>
      </div>
    </div>
  </div>
        )
    }
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(withRouter(Register)); 
