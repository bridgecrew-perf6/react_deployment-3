// Core Imports
import React, {useEffect, useState, useCallback} from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history,path) => {

    if (history.location.pathname === path)
    {
        return {color : "#ff4136"};
    }
}

// TODO: Explanation
const Menu = ({history}) => {

    const [cartHasItems, setCartHasItems] = useState(localStorage.getItem('cartHasItems'));

    useEffect(() => {

        setInterval(() => {

            let _cartHasItems = localStorage.getItem('cartHasItems');

            if (_cartHasItems && _cartHasItems != cartHasItems)
            {
                setCartHasItems(_cartHasItems);
            }

        }, 1500);

    }, []);

    const onLocalStorageChange = useCallback(event => {
        
        if (event.key && event.key === 'cartHasItems' && event.oldValue !== event.newValue)
        {
            setCartHasItems(event.newValue);
        }

    }, []);

    useEffect(() => {

        window.addEventListener("storage", onLocalStorageChange);
        return () => window.removeEventListener("storage", onLocalStorageChange);

    }, [onLocalStorageChange]);

    // Main Render
    return (
        <header id="header" className="htc-header header--3 bg__white">
            <div id="sticky-header-with-topbar" className="mainmenu__area sticky__header">
                <div className="container">
                    <div className="row">

                        <div className="col-md-2 col-lg-2 col-sm-3 col-xs-3">
                            <div className="logo">
                                <Link className="" to="/">
                                    <img src={window.location.origin +"/images/logo/tiptiptop_logo.png"} alt="logo" style= {{ height:"80px", maxHeight: "100%"}}/>
                                </Link>
                            </div>
                        </div>
                        
                        <div className="col-md-8 col-lg-8 col-sm-6 col-xs-6">
                            <nav className="mainmenu__nav hidden-xs hidden-sm">
                                <ul className="main__menu">
                                    
                                    <li className="drop">
                                        <Link 
                                            className="" 
                                            style={isActive(history,"/screen-printing/traditional")  || isActive(history,"/screen-printing/traditional")} 
                                            to="/main">
                                            Main 
                                        </Link>
                                       
                                    </li>

                                   
                                </ul>
                            </nav>
                            
                        </div>
                
                        <div className="col-md-2 col-sm-4 col-xs-3">  
                            <ul className="menu-extra">
                                <li><Link style={isActive(history,"/auth")} to="/auth"><span className="ti-user"></span></Link></li>
                               
                            </ul>
                        </div>
                    </div>
                    <div className="mobile-menu-area"></div>
                </div>
            </div>
    
        </header>
    );

};

export default withRouter(Menu);