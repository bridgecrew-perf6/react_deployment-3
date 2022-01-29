// Core Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return "active";
    } else {
        return "";
    }
}

// TODO: Explanation
const SideBar2 = ({ history }) => {

    // Main Render
    return (

        <section className="htc__product__area shop__page bg__white">
            <div className="container">
                <div className="htc__product__container">
                    <div className="row">
                        <div className="product__menu gutter-btn text-center">
                            <span
                                className="is-checked"

                            >
                                <Link className={isActive(history, "/admin/dashboard")} to="/admin/dashboard">USER INFORMATION</Link>
                            </span>
                            <span
                                className="is-checked"

                            >
                                <a>CATEGORIES</a>
                            </span>
                            <span
                                className="is-checked"

                            >
                                <a>PRODUCTS</a>
                            </span>
                            <span
                                className="is-checked"

                            >
                                <a>ORDERS</a>
                            </span>


                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default withRouter(SideBar2);