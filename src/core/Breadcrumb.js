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
                           
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
);

export default Breadcrumb;