// Core Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Config from '../config'

// TODO: Explanation
const Footer = ({history}) => {

    // Main render
    return (
        <footer className="htc__foooter__area gray-bg mt--40">
            <div className="container">
                <div className="row">
                    <div className="footer__container clearfix">
                         
                        <div className="col-md-3 col-lg-4 col-sm-6">
                            <div className="ft__widget">
                                <h2 className="ft__title">
                                    <Link className="" to="/">TipTipTop</Link>
                                </h2>
                                <div className="footer-address">
                                    <ul>
                                        <li>
                                            <div className="address-icon">
                                                <i className="zmdi zmdi-pin"></i>
                                            </div>
                                            <div className="address-text">
                                                <p>{Config.PASADENA_INFO.address}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="address-icon">
                                                <i className="zmdi zmdi-email"></i>
                                            </div>
                                            <div className="address-text">
                                                <a href={`mailto:${Config.PASADENA_INFO.contact_email}`}>{Config.PASADENA_INFO.contact_email}</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="address-icon">
                                                <i className="zmdi zmdi-phone-in-talk"></i>
                                            </div>
                                            <div className="address-text">
                                                <p>{Config.PASADENA_INFO.contact_phone}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <ul className="social__icon">
                                    <li><a href={Config.PASADENA_INFO.social_network.twitter}><i className="zmdi zmdi-twitter"></i></a></li>
                                    <li><a href={Config.PASADENA_INFO.social_network.instagram}><i className="zmdi zmdi-instagram"></i></a></li>
                                    <li><a href={Config.PASADENA_INFO.social_network.facebook}><i className="zmdi zmdi-facebook"></i></a></li>
                                    <li><a href={Config.PASADENA_INFO.social_network.facebook}><i className="zmdi zmdi-google-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    
                        <div className="col-md-3 col-lg-4 col-sm-6 smt-30 xmt-30">
                            <div className="ft__widget">
                                <h2 className="ft__title">Categories</h2>
                                <ul className="footer-categories">
                                    <li><Link to="/screen-printing/traditional">Restaurants</Link></li>
                                    <li><Link to="/screen-printing/htv">NightClubs</Link></li>
                                    <li><Link to="/sublimation">Parking</Link></li>
                                    <li><Link to="/embroidery">Hotels</Link></li>
                                    <li><Link to="/engraving">Airports</Link></li>
                                    <li><Link to="/merchandise">Malls</Link></li>
                                </ul>
                            </div>
                        </div>
                      
                        <div className="col-md-3 col-lg-4 col-sm-6 smt-30 xmt-30">
                            <div className="ft__widget">
                                <h2 className="ft__title">Information</h2>
                                <ul className="footer-categories">
                                    <li><a href={`mailto:${Config.PASADENA_INFO.contact_email}`}>Contact Us</a></li>
                                    <li><a>Terms & Conditions</a></li>
                                    <li><a>Returns & Exchanges</a></li>
                                    <li><a>Shipping & Delivery</a></li>
                                    <li><a>Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        
                <div className="htc__copyright__area">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <div className="copyright__inner">
                                <div className="copyright">
                                    <p>© 2021 <Link className="" to="/">TipTipTop</Link> ...</p>
                                </div>
                                <ul className="footer__menu">
                                    <li><Link className="" to="/">Home</Link></li>
                                    <li><a href={`mailto:${Config.PASADENA_INFO.contact_email}`}>Contact Us</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </footer>
    );

};

export default withRouter(Footer);