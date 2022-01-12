// Core Imports
import React from 'react';

// Custom Component Imports
import Breadcrumb from './Breadcrumb';
import Footer from './Footer';
import Menu from './Menu';
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
            <Menu />
            {console.log('children',children)}
            {showBreadcrumb && <Breadcrumb currentPage={currentPage} />}
            <div className={className}>
                <div className="body__overlay"></div>
                <div className="offset__wrapper">
                    <SideCart />
                </div>
                {children}
            </div>
            <Footer/>
        </>  
    );
};

export default Layout;