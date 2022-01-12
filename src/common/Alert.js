// Core Imports
import React, { Fragment } from 'react';

// TODO: Explanation
const Alert = ({ success, onSuccess, error, onError }) => {

    // Render Methods ------------------------------------------------------------------------------

    const alertError = () => (
        <div className="alert alert-danger col-xs-12 col-sm-offset-3 col-sm-6 col-lg-offset-3 col-lg-6" style={{ display: error ? '' : 'none' }}>
            {error}
            <button type="button" className="close" aria-label="Close" onClick={closeAlert}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );

    const alertSuccess = () => (
        <div className="alert alert-info col-xs-12 col-sm-offset-3 col-sm-6 col-lg-offset-3 col-lg-6" style={{ display: success ? '' : 'none' }}>
            <button type="button" className="close" aria-label="Close" onClick={closeAlert}>
                <span aria-hidden="true">&times;</span>
            </button>
            {success}
        </div>
    );    

    const closeAlert = e => {
        e.preventDefault();
        onError(false);
        onSuccess && onSuccess(false);        
    }

    // END Render Methods --------------------------------------------------------------------------

    // Main Render
    return (
        <Fragment>
            {alertSuccess()}
            {alertError()} 
        </Fragment>
    );
}

export default Alert;