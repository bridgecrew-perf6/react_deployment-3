// Core Imports
import React from "react";
import { Route, Redirect } from "react-router-dom";

// Function Imports
import { isAuthenticated } from "./functions";

//Validate restriction to admin and customer private sections
const PrivateRoute = ({ component: Component, adminRole, ...rest}) => (
    <Route
        {...rest}
        render={ props => 
            isAuthenticated() && ((adminRole && isAuthenticated().user.role === "admin") || !adminRole) ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to = {{
                        pathname: "/auth",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;