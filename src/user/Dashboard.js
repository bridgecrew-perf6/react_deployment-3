// Core Imports
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Component Imports
import Layout from '../core/Layout';
//import OrderDataTable from './orders/OrderDataTable';

// Function Imports
import { authenticate, isAuthenticated, signout } from '../auth/functions';

// API Impports
import { updateUser, getUser } from '../APICalls';

import Sidebaruser2 from "../../src/admin/Sidebaruser2";

// TODO: Delete?
//import { useHistory } from "react-router-dom";
//import { getPurchaseHistory } from "./apiUser";
//import moment from "moment";

// TODO: Explanation
const Dashboard = ({history}) => {

    // Initial state
    const {user, token} = isAuthenticated();
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorShiping, setErrorShipping] = useState(false);
    const [successShipping, setSuccessShipping] = useState(false);
    const [street, setStreet] = useState('');
    const [suite, setSuite] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState(0);
    const [state, setState] = useState(0);

    // React Effects -------------------------------------------------------------------------------

    useEffect(() => {
        getUser(user._id, token).then(data => {

            if (data.error)
            {
                setError(data.error);
            }
            else
            {
                data.street && setStreet(data.street);
                data.suite && setSuite(data.suite);
                data.city && setCity(data.city);
                data.postalCode && setPostalCode(data.postalCode);
                data.country && setCountry(data.country);
                data.state&& setState(data.state);
                localStorage.setItem('currentUser', JSON.stringify(data));
                setPhoneNumber(data.phoneNumber !== '' ? data.phoneNumber : user.phoneNumber)
            }
        });

    }, [user, token]);

    useEffect(() => {

        setError(false);
        setSuccess(false);

    },[name, phoneNumber]);

    useEffect(() => {

        setErrorShipping(false);
        setSuccessShipping(false);

    },[street, suite, city, postalCode, country, state]);
    
    // END React Effects ---------------------------------------------------------------------------

    // Events --------------------------------------------------------------------------------------

    const closeAlert = e => {

        e.preventDefault();
        setError(false);
        setSuccess(false);
    }

    const clickSignout = event => {

        event.preventDefault();
        localStorage.removeItem('currentUser');
        signout(() => history.push("/"));
    };

    const clickUpdate = e => {

        e.preventDefault();

        if (!name)
        {
            setError("User Name can't be empty");
            return;
        }

        // make request to api to update user
        updateUser(user._id, token, { name, phoneNumber }).then(data => {

            if (data.error)
            {
                setError(data.error.description);
            }
            else
            {
                authenticate({user: {...data}}, () => {
                    setSuccess("User Updated");
                });
            }
        });
    };

    const clickUpdateShippingAddress = e => {

        e.preventDefault();

        // make request to api to update user
        updateUser(user._id, token, { name, street, suite, city, postalCode, country, state }).then(data => {

            if (data.error)
            {
                setErrorShipping(data.error.description);
            }
            else
            {
                setSuccessShipping("Shipping Address Updated");
            }
        });
    };

    const isActive = (history, path) => {

        if (history.location.pathname === path)
        {
            return "active";
        }
        else
        {
            return "";  
        }
    }

    // END Events ----------------------------------------------------------------------------------

    // Render Methods ------------------------------------------------------------------------------

    const alertError = (error) => (
        <div className="alert alert-danger col-xs-12 col-sm-offset-3 col-sm-6 col-lg-offset-3 col-lg-6" style={{ display: error ? '' : 'none' }}>
            {error}
            <button type="button" className="close" aria-label="Close" onClick={closeAlert}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );

    const alertSuccess = (success) => (
        <div className="alert alert-info col-xs-12 col-sm-offset-3 col-sm-6 col-lg-offset-3 col-lg-6" style={{ display: success ? '' : 'none' }}>
            <button type="button" className="close" aria-label="Close" onClick={closeAlert}>
                <span aria-hidden="true">&times;</span>
            </button>
            {success}
        </div>
    );

    // TODO: Move states to a constant
    const userInfo = () => {
        return (
            <div className="container ptb--40">
                <div className="row">
                    {alertSuccess(success)}
                    {alertError(error)}
                </div>
                <div className="row">
                <Sidebaruser2/>
                <div><br></br></div>
                    <div className="col-md-8 col-lg-8">
                        <div className="ckeckout-left-sidebar">
                            <div className="row">
                                <div className="checkout-form">
                                    <div className="col-xs-12 pb--20">
                                        <h2 className="pasadena-section-title-3">User Information</h2>
                                    </div>
                                    <div className="pasadena-checkout-form-inner">
                                        <div className="pasadena-single-box">
                                            <div className="form-row">
                                                <div className="form-group col-xs-12 col-sm-6 col-lg-6">
                                                    <label htmlFor="name" className="normal-label">Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control " 
                                                        id="name" 
                                                        placeholder="Enter your name" 
                                                        onChange={e => {
                                                            setName(e.target.value);
                                                        }}
                                                        value={name}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="form-group col-xs-12 col-sm-6 col-lg-6">
                                                    <label htmlFor="email" className="normal-label">Email</label>
                                                    <input 
                                                        disabled="disabled"
                                                        type="email" 
                                                        className="form-control " 
                                                        id="email" 
                                                        placeholder="Enter your email" 
                                                        //onChange={handleChange('email')}
                                                        value={email}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-xs-12 col-sm-6 col-lg-6">
                                                    <label htmlFor="phone_number" className="normal-label">Phone Number</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control " 
                                                        id="phone_number" 
                                                        placeholder="Enter your phone number" 
                                                        onChange={e => {
                                                            setPhoneNumber(e.target.value);
                                                        }}
                                                        value={phoneNumber}
                                                    />
                                                </div>
                                                
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-lg-6">
                                    <button type="button" className="btn btn-danger" onClick={clickSignout}>Signout</button>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-lg-6 text-right">
                                    <button type="button" className="btn btn-dark" onClick={clickUpdate}>Save</button>
                                </div>
                            </div> 
                            
                           
                            
                            
                        </div>
                    </div>
                </div>  
                
                
                {alertSuccess(successShipping)}
                {alertError(errorShiping)}
            </div>
        );
    };

    // END Render Methods --------------------------------------------------------------------------

    // Main Render
    return (
        <Layout 
            title = "Home Page"
            description = "Ecommerce"
            showBreadcrumb = {true}
            currentPage = "Worker Dashboard"       
        >                      
            {userInfo()}
        </Layout>
    );

    // TODO: Delete?
    /*const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };*/

    /*useEffect(() => {
        init(_id, token);
    }, []);*/

    /*const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">
                            My Cart
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };*/

    /*const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ${p.price}
                                                </h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    /*<Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
        </Layout>*/
};

export default Dashboard;