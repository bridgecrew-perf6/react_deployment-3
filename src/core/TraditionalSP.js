// Core Imports
import React from 'react';

// Custom Component Imports
import ShoppingSection from './ShoppingSection';
import Layout from './Layout';

// TODO: Explanation
const Traditional = () => {

    // TODO: Is it printingTypeId hard-coded?
    return (
        <Layout 
            title="Workers Printing Page"
            description="Ecommerce"
            showBreadcrumb={false}
        >
            <ShoppingSection printingTypeId='5ee5a2c62055cc54dc5ecf4a' />
        </Layout>
    );
};

export default Traditional;