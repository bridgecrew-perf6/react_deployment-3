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
            <ShoppingSection printingTypeId='5ee5a2ee2055cc54dc5ecf4b' />
        </Layout>
    );
};

export default Embroidery;