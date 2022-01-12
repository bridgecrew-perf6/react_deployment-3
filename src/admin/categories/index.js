// Core Imports
import React, { Fragment } from 'react';

// Custom Component Imports
import CategoryDataTable from './CategoryDataTable';
import Layout from '../../core/Layout';
import Sidebar from '../Sidebar';

// TODO: Explanation
const Categories = ({history}) => {

    // Render Methods ------------------------------------------------------------------------------

    const categoryInfo = () => {
        return (
            <Fragment>
                <div className="container ptb--40">
                    <div className="row">
                        <Sidebar/>
                    </div>
                    <div className="row">
                        <CategoryDataTable />
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
            {categoryInfo()}
        </Layout>
    );
};

export default Categories;