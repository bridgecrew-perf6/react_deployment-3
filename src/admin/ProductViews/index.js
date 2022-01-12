// Core Imports
import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

// Custom Component Imports
import ProducViewtDataTable from '../ProductViews/ProductViewDataTable';
import Layout from '../../core/Layout';

// TODO: Explanation
const ProductViews = () => {

    let { id } = useParams();

    // Render Methods ------------------------------------------------------------------------------

    const productViewManagenmentSection = () => {

        return (
            <Fragment>  
                <div className="container ptb--40">   
                    <div className="row">
                        <ProducViewtDataTable productId={id} />
                    </div>
                </div>
            </Fragment>
        );
    };

    // END Render Methods --------------------------------------------------------------------------

    // Main Render
    return (
        <Layout 
            title = "Home Page"
            description = "Ecommerce"
            showBreadcrumb = {true}
            currentPage = "Admin Dashboard"       
        >      
            {productViewManagenmentSection()}
        </Layout>
    );
};

export default ProductViews;