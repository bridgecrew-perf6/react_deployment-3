// Core Imports
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

// Function Imports
import { signup, signin, authenticate, isAuthenticated } from '../auth/functions';

// TODO: Explanation
const Signup = (active = '') => {

    // Initial State
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false, 
        loading: false,
        redirectToReferrer: false
    });

    const { name, email, password, success, error, loading, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    // Methods -------------------------------------------------------------------------------------

    const handleChange = name => event => {

        setValues(
        {
            ...values,
            error: false,
            [name]: event.target.value
        });
    };

    const redirectUser = () => {

        if (redirectToReferrer)
        {
            if (user && user.role === "admin")
            {
                return <Redirect to="/admin/dashboard/user-information" />
            }
            else
            {
                return <Redirect to="/user/dashboard" />
            }
        }
        
        if (isAuthenticated())
        {
            console.log(user && user.role === "admin");
            
            if (user && user.role === "admin")
            {
                return <Redirect to="/admin/dashboard/user-information" />
            }
            else
            {
                return <Redirect to="/user/dashboard" />
            }
        }
    }

    // END Methods ---------------------------------------------------------------------------------

    // Events --------------------------------------------------------------------------------------

    const clickSubmit = event => {

        event.preventDefault();

        setValues({ ...values, error: false, loading: true });

        signup({ name, email, password }).then(data => {

            if (data.error)
            {
                setValues(
                {
                    ...values,
                    error: data.error,
                    success: false
                });
            }
            else
            {
                signin({ email, password }).then(data => {

                    if (data.error)
                    {
                        setValues(
                        {
                            ...values,
                            name: '',
                            email: '',
                            password: '',
                            error: data.error.description,
                            success: true,
                            loading: false
                        });

                    }
                    else
                    {
                        authenticate(data, () => {

                            setValues(
                            {
                                ...values,
                                redirectToReferrer: true
                            });
                        });
                    }
                });
            }
        });
    };

    // END Events ----------------------------------------------------------------------------------

    // Render Methods ------------------------------------------------------------------------------

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account was created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    const showLoading = () => loading && (
        <div className="alert alert-info">
            Loading...
        </div>
    );

    const signupForm = () => (
        <div>
            <form className="login" method="post">
                <input type="text" placeholder="Name*" onChange={handleChange('name')} value={name}></input>
                <input type="email" placeholder="Email*" onChange={handleChange('email')} value={email}></input>
                <input type="password" placeholder="Password*" onChange={handleChange('password')} value={password}></input>
            </form>
            <div className="tabs__checkbox">
                {showLoading()}
                {showSuccess()}
                {showError()}
            </div>
            <div className="htc__login__btn">
                <button onClick={clickSubmit} >Signup</button>
            </div>
        </div>
    );

    // END Render Methods --------------------------------------------------------------------------
    
    // Main Render
    return (
        <div>
            {signupForm()}
            {redirectUser()}
        </div>
    );

};

export default Signup;