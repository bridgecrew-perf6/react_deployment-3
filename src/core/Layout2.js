// Core Imports
import React from 'react';

// Custom Component Imports
import Breadcrumb from './Breadcrumb';
import Footer from './Footer';

import SideCart from '../cart/sideCart'

// Function Imports
import useScript from '../utils/customHooks';

// TODO: Explanation
// TODO: title and description params are not being used
const Layout = ({
    title = "Title", 
    description = "Descrition", 
    currentPage = "Current", 
    className,
    children,
    showBreadcrumb = true,
}) => {

    useScript(window.location.origin+'/js/main.js');

    // Main Render
    return (
        <>            
            {showBreadcrumb && <Breadcrumb currentPage={currentPage} />}
            <div className={className}>
                <div className="body__overlay"></div>
                <div className="offset__wrapper">
                    
                </div>
                {children}
            </div>
            
        </>  
    );
};

export default Layout;