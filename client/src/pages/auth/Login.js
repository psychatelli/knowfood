import React, { Component } from 'react'
import classnames from 'classnames';
import  { Link, Redirect}  from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import Alert from '../../components/common/alert';

import TextFieldGroup from '../../components/common/TextFieldGroup';


class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {},
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
 
        componentDidMount() {
            if(this.props.isAuthenticated){
                // this.props.history.push('/recipies');
                window.location.href = '/recipies';
            }
        }

        componentWillReceiveProps(nextProps) {
            if(nextProps.isAuthenticated) {
                // this.props.history.push('/recipies');
                window.location.href = '/recipies';
            }
        }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.login(userData);
    }


    render() {
        const { errors } = this.state;

       

        return(
            <div className="login">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="MainTitle">Log In</h1>
                    <Alert />

                    <p className="lead text-center">Sign in to your account</p>
                    <center>
                    <form onSubmit={this.onSubmit}>

                        <TextFieldGroup
                            placeholder="Email Address"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                            />

                          <div className="CustomFormInput" style={{marginTop: '20px'}}>
                        <input type="password" 
                        className={classnames('form-control form-control-lg', { 'is-invalid' : errors.password } )}  
                        placeholder="Password" 
                        name="password" 
                         value={this.state.password}
                         onChange={this.onChange}
                        />
                        {errors.password && (<div className="invalid-feedback"> {errors.password} </div> )}

                        </div>
                        <input type="submit" className="btn Button" />
                    </form>

                    </center>
                    <span>If you don't have an account <Link to={'/register'}>Sign Up </Link>  </span>

                    </div>
                </div>
                </div>
            </div>
        )
    }
}
 
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,

}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login); 

