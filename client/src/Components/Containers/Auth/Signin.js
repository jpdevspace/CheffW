import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';

// Components
import Spooner from '../../Search/Spooner';
import Error from '../../Search/Error';

class Signin extends Component {

    state = {
        email: '',
        password: ''
    }

    // Function to update both email or password when the input is changed
    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Submit the user typed email and password for authentication 
    submitHandler = e => {
        e.preventDefault();
        this.props.onAuth(this.state.email, this.state.password);
    }

    render() {
        // Check if user is already authenticated
        let authRedirect = null;
        if (this.props.isAuthed) {
            authRedirect = <Redirect to="/dashboard" />
        }

        return (
            <div id="login-section">
                {!this.props.isLoading ? 
                    <div className="container">
                        {authRedirect}
                        <h1 className="text-center">Login</h1>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group">
                                <input 
                                    onChange={this.onInputChange} 
                                    name="email" 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <input 
                                    onChange={this.onInputChange} 
                                    name="password" 
                                    type="password" 
                                    className="form-control"  
                                    placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                    : <Spooner />
                     
                }
                {this.props.errMsg ? <Error status={this.props.errSts} msg={this.props.errMsg} /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.authReducer.loading,
        errMsg: state.authReducer.errorMsg,
        errSts: state.authReducer.errorStatus,
        isAuthed: state.authReducer.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.authSignIn(email, password))
    }
}
                
export default connect(mapStateToProps, mapDispatchToProps)(Signin);