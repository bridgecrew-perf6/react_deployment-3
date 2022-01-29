// Core Imports
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// Custom Component Imports
import Layout from "../../core/Layout";
import Sidebar2 from "../Sidebar2";

// Function Imports
import { authenticate, isAuthenticated, signout } from "../../auth/functions";

// API Imports
import { updateUser } from "../../APICalls";

// TODO: Delete?
//import { useHistory } from "react-router-dom";
//import { getPurchaseHistory } from "./apiUser";
//import moment from "moment";

// TODO: Explanation
const AdminInformation = ({ history }) => {

    // Init state
    const { user, token } = isAuthenticated();
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // React Effects -------------------------------------------------------------------------------

    useEffect(() => {

        setError(false);
        setSuccess(false);

    }, [name]);

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
        signout(() => {
            history.push('/');
        });
    };

    const clickUpdate = e => {

        e.preventDefault();
        setError(false);

        if (!name) {
            setError("User Name can't be empty");
            return;
        }

        // make request to api to update user
        updateUser(user._id, token, { name }).then(data => {

            if (data.error) {
                setError(data.error.description);
            }
            else {
                authenticate({ user: { ...data } }, () => {
                    setSuccess("User Updated");
                });
            }
        });
    };

    // END Events ----------------------------------------------------------------------------------

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

    const adminMenu = () => {
        return (
            <section className="htc__product__area shop__page bg__white">
                <div className="container">
                    <div className="htc__product__container">
                        <div className="row">
                            <div className="product__menu gutter-btn text-center">
                                menu centrado
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const adminInfo = () => {
        return (
            <div className="container ptb--40">

                <div className="row">
                    <Sidebar2 />
                    <div className="col-xs-12 col-sm-9 col-lg-9 dashboard-container">
                        <h4 className="section-title-4">USER INFORMATION</h4>
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
                                        /*onChange={e => {
                                            setEmail(e.target.value);
                                        }}*/
                                        value={email}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-lg-6">
                                <button type="button" className="btn btn-danger dashboard-container-button" onClick={clickSignout}>Signout</button>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 text-right">
                                <button type="button" className="btn btn-dark dashboard-container-button" onClick={clickUpdate}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {alertSuccess()}
                    {alertError()}
                </div>
            </div>
        );
    };

    // END Render Methods --------------------------------------------------------------------------

    // TODO: Delete?
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
                    {adminInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
        </Layout>*/

    // Main render
    return (
        <Layout
            title="Home Page"
            description="Ecommerce"
            showBreadcrumb={true}
            currentPage="Admin Dashboard"
        >
            
            {adminInfo()}

        </Layout>
    );
};

export default AdminInformation;