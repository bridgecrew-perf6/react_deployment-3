// Core Imports
import React, { Fragment } from "react";

// Custom Component Imports
import ProductDataTable from './ProductDataTable';
import Layout from "../../core/Layout";
import Sidebar2 from "../Sidebar2";

// TODO: Explanation
const Products = (props) => {

    // Render Methods ------------------------------------------------------------------------------

    const productManagenmentSection = () => {
        return (
            <Fragment>  
                <div className="container ptb--40">
                    <div className="row">
                        <Sidebar2/>
                    </div>
                    <div className="row">
                        <ProductDataTable />
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
            {productManagenmentSection()}
        </Layout>
    );
};

export default Products;