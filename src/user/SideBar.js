// Core Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history,path) => {
    if(history.location.pathname === path){
        return "active";
    }else{
        return "";  
    }
}

// TODO: Explanation
const SideBar = ({history}) => {

    // Main Render
    return (
        <div className="col-xs-12 col-sm-3 col-lg-3 sidebar">
            <h4 className="section-title-4">MENU</h4>
            <ul className="nav nav-sidebar">
                <li><Link className={isActive(history,"/admin/dashboard")} to="/admin/dashboard">USER INFORMATION</Link></li>
                <li><a>CATEGORIES</a></li>
                <li><a>PRODUCTS</a></li>
                <li><a>ORDERS</a></li>
                <li><a>IMAGES</a></li>
            </ul>
        </div>
    );
};

export default withRouter(SideBar);