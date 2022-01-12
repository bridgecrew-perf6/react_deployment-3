// Core Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {

    if (history.location.pathname === path)
    {
        return "active";
    }
    else
    {
        return "";  
    }
}

// TODO: Explanation
const Sidebaruser = ({history}) => {

    // Main render
    return (
        <div className="col-xs-12 col-sm-3 col-lg-3 sidebar">
            <h4 className="section-title-4">MENU</h4>
            <ul className="nav nav-sidebar">
                <li><Link className={isActive(history,"/admin/dashboard/user-information")} to="/admin/dashboard/user-information">USER INFORMATION</Link></li>      
                
            </ul>
        </div>
    );
};

export default withRouter(Sidebaruser);









