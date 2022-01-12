// Core Imports
import React from 'react';

// TODO: Explanation
const  Breadcrumb = ({currentPage}) => (
    <div className="ht__bradcaump__area">
        <div className="ht__bradcaump__wrap">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="bradcaump__inner text-center">
                            <h2 className="bradcaump-title">{currentPage}</h2>
                            <nav className="bradcaump-inner">
                                <a className="breadcrumb-item" href="/">Home</a>
                                <span className="brd-separetor">/</span>
                                <span className="breadcrumb-item active">{currentPage}</span>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Breadcrumb;