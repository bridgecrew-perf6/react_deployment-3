// Core Imports
import React, { Fragment } from 'react';

// Custom Component Imports
import Layout from './Layout';

// TODO: Explanation
const Home = () => {

    // Render Methods ------------------------------------------------------------------------------

    const main = () => (

        <Fragment>
            <div className="slider__container">
                <div className="slider__activation__wrap owl-carousel owl-theme">
                    <div >
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                    <div className="slider__inner">
                                        <h1><div style={{ color: 'black'}}>Tip Tip</div><span className="text--theme"> Top</span></h1>
                                        <div className="slider__btn">
                                            <a className="htc__btn" href="javascript:void(0)"><div style={{ color: 'black'}}>The easiest way to tip and save cash in your pocket</div></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                       
                               
                </div>
            </div>
        </Fragment>
    );

    // END Render Methods --------------------------------------------------------------------------

    // Main Render
    return (
        <Layout 
            title="Home Page"
            description="Ecommerce"
            showBreadcrumb={false}
        >
            {main()}
        </Layout>
    );
};

export default Home;