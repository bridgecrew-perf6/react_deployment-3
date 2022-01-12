// Core Imports
import React, { Fragment } from "react";

// Custom Component Imports
import OrderDataTable from './OrderDataTable';
import Layout from "../../core/Layout";
import Sidebar from "../Sidebar";

// TODO: Explanation
const Orders = (props) => {

    // Render Methods ------------------------------------------------------------------------------

    const orderManagementSection = () => {
        return (
            <Fragment>  
                <div className="container ptb--40">
                    <div className="row">
                        <Sidebar/>
                    </div>
                    <div className="row">
                        <OrderDataTable />
                    </div>
                </div>   
            </Fragment>
        );
    };

    // END Render Methods --------------------------------------------------------------------------

    // Main render
    return (
        <Layout 
            title = "Home Page"
            description = "Ecommerce"
            showBreadcrumb = {true}
            currentPage = "Admin Dashboard"
        >
            {orderManagementSection()}
        </Layout>
    );
};

export default Orders;