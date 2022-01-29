// Core Imports
import React from 'react';

// Custom Component Imports
import Layout from '../core/Layout';
import Signup from '../user/Signup';
import Signin from '../user/Signin';

// TODO: Explanation
const Auth = () => {

    // Render Methods ------------------------------------------------------------------------------

    const section = () => (

        <div className="htc__login__register bg__white ptb--90" >
            <div className="container boxlogin">
                <div className="row">
                    <div>
                    <br></br>
                    </div>
                
                    <div className="col-md-6 col-md-offset-3">
                        <ul className="login__register__menu" role="tablist">
                            <li role="presentation" className="login active"><a href="#login" role="tab" data-toggle="tab">Login</a></li>
                           
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="htc__login__register__wrap">
                            <div id="login" role="tabpanel" className={`single__tabs__panel tab-pane active`}>
                                <Signin/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // END Render Methods --------------------------------------------------------------------------

    // Main render
    return (
        <Layout
            title="Signin Page"
            description="Ecommerce"
            currentPage="Login & Register"
            showBreadcrumb = {false}
        >
            {section()}
        </Layout>
    );

};

export default Auth;