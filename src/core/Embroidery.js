// Core Imports
import React from 'react';

// Custom Component Imports
import ShoppingSection from './ShoppingSection';
import Layout from './Layout';

// TODO: Explanation
const Embroidery = () => {

    // TODO: Is it printingTypeId hard-coded?
    return (
        <Layout 
            title="Screen Printing Page"
            description="Ecommerce"
            showBreadcrumb={false}
        >
            <ShoppingSection printingTypeId='5ee5a3002055cc54dc5ecf4d' />
        </Layout>
    );
};

export default Embroidery;