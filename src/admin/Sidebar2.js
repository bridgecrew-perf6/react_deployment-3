// Core Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {

    if (history.location.pathname === path) {
        return "active";
    }
    else {
        return "";
    }
}

// TODO: Explanation
const Sidebar2 = ({ history }) => {

    // Main render
    return (
        <section className="htc__product__area shop__page bg__white">
            <div className="container">
                <div className="htc__product__container">
                    <div className="row">
                        <div className="product__menu gutter-btn text-center">
                            <span
                                className="is-checked"

                            >
                                <Link className={isActive(history, "/admin/dashboard/user-information")} to="/admin/dashboard/user-information">USER INFORMATION</Link>
                            </span>
                            <span
                                className="is-checked"

                            >
                                <Link className={isActive(history, "/admin/dashboard/categories")} to="/admin/dashboard/categories">CATEGORIES</Link>
                            </span>
                            <span
                                className="is-checked"

                            >
                                <Link className={isActive(history, "/admin/dashboard/products")} to="/admin/dashboard/products">WORKERS</Link>
                            </span>
                            <span
                                className="is-checked"

                            >
                                <Link className={isActive(history, "/admin/dashboard/orders")} to="/admin/dashboard/orders">TIPS</Link>
                            </span>






                        </div>
                    </div>
                </div>
            </div>
        </section >


    );
};

export default withRouter(Sidebar2);









