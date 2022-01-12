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
                    <div className="slide slider__full--screen slider__bg--1">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12">
                                    <div className="slider__inner">
                                        <h1><div style={{ color: 'white'}}>Easy to</div><span className="text--theme"> Pay</span></h1>
                                        <div className="slider__btn">
                                            <a className="htc__btn" href="javascript:void(0)"><div style={{ color: 'white'}}>suscribe now</div></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slide slider__full--screen slider__bg--2">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-10 col-lg-8 col-md-offset-2 col-lg-offset-4 col-sm-12 col-xs-12">
                                    {/*<div className="slider__inner">
                                        <h1>New Product <span className="text--theme">Collection</span></h1>
                                        <div className="slider__btn">
                                            <a className="htc__btn" href="javascript:void(0)">shop now</a>
                                        </div>
                                    </div>*/}
                                </div>
                            </div>
                        </div>
                    </div>     
                    <div className="slide slider__full--screen slider__bg--3">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-10 col-lg-8 col-md-offset-2 col-lg-offset-4 col-sm-12 col-xs-12">
                                    {/*<div className="slider__inner">
                                        <h1>New Product <span className="text--theme">Collection</span></h1>
                                        <div className="slider__btn">
                                            <a className="htc__btn" href="javascript:void(0)">shop now</a>
                                        </div>
                                    </div>*/}
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