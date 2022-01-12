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
            <ShoppingSection printingTypeId='606dd5141d92c0793269d682' />
        </Layout>
    );
};

export default Embroidery;