// Core Imports
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Function Imports
import { signin, authenticate, isAuthenticated } from '../auth/functions';

// TODO: Explanation
const Signin = (active = '') => {

    // Initial state
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, error, loading, redirectToReferrer } = values;
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
            
            if (user && user.isConfirmed == false)
            {
                return <Redirect to="/user/confirm" />
            }
            if (user && user.role === "admin" && user.isConfirmed)
            {
                return <Redirect to="/admin/dashboard/user-information" />
            }
            if (user && user.role === "worker" && user.isConfirmed)
            {
                return <Redirect to="/user/dashboard" />
            }

            else
            {
                return <Redirect to="/user/dashboard" />
            }
        }
        
        if (isAuthenticated())
        {
            if (user && user.isConfirmed == false)
            {
                return <Redirect to="/user/confirm" />
            }
            if (user && user.role === "admin" && user.isConfirmed)
            {
                return <Redirect to="/admin/dashboard/user-information" />
            }
            if (user && user.role === "worker" && user.isConfirmed)
            {
                return <Redirect to="/user/dashboard" />
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

        signin({ email, password }).then(data => {
            console.log('data resultante signin',data)
            if (data.error)
            {
                setValues({
                    ...values,
                    error: data.error.description,
                    loading: false
                });
            }
            else
            {
                authenticate(data, () => {

                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    // END Events ----------------------------------------------------------------------------------

    // Render Methods ------------------------------------------------------------------------------

    const showLoading = () => loading && (
        <div className="alert alert-info">
            Loading...
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const signinForm = () => (
        <div>       
            <form className="login" method="post">
                <input type="email" placeholder="Email*" onChange={handleChange('email')} value={email}></input>
                <input type="password" placeholder="Password*" onChange={handleChange('password')} value={password}></input>
            </form>
            <div className="tabs__checkbox">
                {showLoading()}
                {showError()}
            </div>
            <div className="tabs__checkbox">
                <span className="forget"><a href="javascript:void(0)">Forget Pasword?</a></span>
            </div>

            <div className="htc__login__btn mt--30">
                <button onClick={clickSubmit} >Login</button>
            </div>
        </div>        
    );

    // END Render Methods --------------------------------------------------------------------------

    // Main Render
    return (
        <div>
            {signinForm()}
            {redirectUser()}
        </div>
    );
};

export default Signin;