// Core Imports
import React, { useState, useEffect, Fragment, useCallback } from "react";
import Iframe from 'react-iframe';
import * as R from 'ramda';
import BeautyStars from 'beauty-stars';

// Custom Component Imports
import OrderItemDataTable from './OrderItemDataTable'
import Alert from '../../common/Alert';

// Misc Imports
import Config from '../../config';

// API Imports
import { createRating } from "../../APICalls";

// Selector Imports
import { isAuthenticated } from '../../auth/functions';

// TODO: Explanation
const OrderForm = ({ 
        selectedOrder,
    }) => {

    // Initial State
    const [selectedOrderItem, setSelectedOrderItem] = useState({});
    const [selectedOrderItemReview, setSelectedOrderItemReview] = useState({});
    const [descrReview, setDescrReview] = useState('');
    const [valueStar, setValueStar] = useState(0);
    const [modalTitle, setModalTitle] = useState('Order #' + selectedOrder._id);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false); 

    const closeModalButton = React.useRef(null);

    const { user, token } = isAuthenticated();

    // Events -------------------------------------------------------------------------------------- 

    const clickSubmitReview = e => {
        
        e.preventDefault();
        setError(false);
        if (valueStar > 0 && descrReview != '') 
        {
            createRating(token, { 
                rating: valueStar, 
                review: descrReview,
                product: selectedOrderItemReview.product_id._id,
                user: user._id
            }).then(data => { 
                if(data.message == 'The rating already exist') {
                    setError(data.message);
                    return
                }
                if (data.error)
                    {
                        setError(data.error.description);
                        console.log('error', error)
                    }
                else
                    {
                        selectedOrderItemCBReview(null);
                        setValueStar(0);
                        setDescrReview('');
                        setSuccess("Review Created");
                    }
            })
        }
        else 
        {
            setError("Must indicate a value for the rating / description");
            return
        }        
    };

    const closeAlert = e => {
        e.preventDefault();
        setError(false);
        setSuccess(false);
    }


    // END Events ----------------------------------------------------------------------------------

    // Methods -------------------------------------------------------------------------------------

    const selectedOrderItemCB = (orderItem) => setSelectedOrderItem(orderItem);

    const selectedOrderItemCBReview = (orderItem) => setSelectedOrderItemReview(orderItem);

    // This receives the product from the iframe
    const onMessageReceived = useCallback(event => {

        if (event.origin !== Config.BASE_FPD_URL) return;

        if (event && event.data)
        {
            // If a product is going to be edited, the object must be sent to FPD iframe to be able 
            // to load it and show all the layers.
            if (event.data === "viewProduct")
            {
                event.source.postMessage(JSON.stringify(selectedOrderItem.product_obj), event.origin);
            }
        }

    }, [selectedOrderItem]);

    // END Methods ---------------------------------------------------------------------------------

    // React Effects -------------------------------------------------------------------------------

    useEffect(() => {

        if (!R.isNil(selectedOrder) && !R.isNil(selectedOrder._id))
        {
            setModalTitle('Order #' + selectedOrder._id)
        }

    }, [selectedOrder]);

    useEffect(() => {

        window.addEventListener("message", onMessageReceived);
        return () => window.removeEventListener("message", onMessageReceived);

    }, [onMessageReceived]);

    // END React Effects ---------------------------------------------------------------------------
    
    // Render Methods ------------------------------------------------------------------------------

    const renderFPDIframe = () => {
        if (!R.isNil(selectedOrderItem) && !R.isNil(selectedOrderItem._id))
        {
            let isMerchandise = selectedOrderItem.product_id.printingType == '606dd5141d92c0793269d682' ? true : false
            return (
                <div className="row">
                    <Iframe 
                        url={Config.FPD_URL+`${isMerchandise ? 'm/' : '/'}`+`5fab3963a0d1f711fbe68c87/${selectedOrderItem.product_id ? selectedOrderItem.product_id._id : []}/${selectedOrderItem.color}`}
                        styles={{border:"none", height:"600px"}}
                        width="100%"
                        height="550px"
                        frameBorder="0"
                        id="myId"
                        className="myClassname"
                        allowFullScreen={true}
                        display="initial"
                        position="relative"
                    />
                </div>
            )
        }
        else return null;
    }

    const renderReview = () => {

        if (!R.isNil(selectedOrderItemReview) && !R.isNil(selectedOrderItemReview._id))
        {
            return (
                <div className="row">
                    
                            <div className="col-md-12">
                                <div className="well well-sm">
                                    <div className="row" id="post-review-box" >
                                        <div className="col-md-12">
                                            <form accept-charset="UTF-8" action="" method="post">
                                                
                                                <div className="text-right">
                                                    
                                                    <div className="well-sm">
                                                    <BeautyStars
                                                        value={valueStar}
                                                        size={'16px'}
                                                        inactiveColor={'#cccccc'}
                                                        onChange={valueStar => setValueStar(valueStar)}
                                                    />
                                                    </div>
                                                    
                                                    <input id="ratings-hidden" name="rating" type="hidden" />
                                                    <textarea value ={descrReview} onChange={e => setDescrReview(e.target.value)} className="form-control animated" cols="50" id="new-review" name="comment" placeholder="Enter your review here..." rows="3"></textarea>
                                                    <div className="well-sm">
                                                        <button 
                                                            className="btn btn-success btn-lg" 
                                                            type="button"
                                                            onClick={clickSubmitReview}
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    
                </div>
            )
        }
        else return null;
    }

    const alertSuccess = () => (
        <div className="alert alert-info col-xs-12 col-sm-offset-3 col-sm-6 col-lg-offset-3 col-lg-6" style={{ display: success ? '' : 'none'}}>
                {success}
                <button type="button" className="close" aria-label="Close" onClick={closeAlert}>
                    <span aria-hidden="true">&times;</span>
                </button>
        </div>
    );  

    // END Render Methods --------------------------------------------------------------------------
    
    // Main Render
    return (
        <Fragment> 
            <div className='modal fade' id="orderSelectedModal" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button 
                                ref={closeModalButton}
                                type="button" 
                                className="close"
                                data-dismiss="modal"
                                onClick={() => {
                                    setSelectedOrderItem(null);
                                    setDescrReview('')
                                    setValueStar(0);
                                }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">{modalTitle}</h4>
                        </div>
                        <div className="modal-body" style={{padding:'30px'}}>
                            <div className="row">
                                <Alert 
                                    error = {error}
                                    onError = {(value) => {setError(value)}}
                                />
                                {alertSuccess()}
                            </div>
                            <div style={{
                                paddingBottom: 9,
                                marginBottom: 10,
                                borderBottom: '1px solid #eee' }}>
                                <h6>Customer Info</h6>
                            </div>
                            <div className="form-row row">
                                <div className="col-xs-12 col-sm-6 col-lg-6">
                                    <span htmlFor="name" className="normal-label" style={{ fontWeight: 500 }}>{`Name: `}</span>
                                    <span htmlFor="name" className="normal-label">{selectedOrder.customer_name}</span>
                                </div>

                                <div className="col-xs-12 col-sm-6 col-lg-6">
                                    <span htmlFor="name" className="normal-label" style={{ fontWeight: 500 }}>{`Address Line 1: `}</span>
                                    <span htmlFor="name" className="normal-label">{selectedOrder.customer_addressLine1}</span>
                                </div>
                            </div>
                        
                            <div className="form-row row">
                                <div className="col-xs-12 col-sm-6 col-lg-6">
                                    <span htmlFor="name" className="normal-label" style={{ fontWeight: 500 }}>{`E-mail: `}</span>
                                    <span htmlFor="name" className="normal-label">{selectedOrder.customer_email}</span>
                                </div>

                                <div className="col-xs-12 col-sm-6 col-lg-6">
                                    <span htmlFor="name" className="normal-label" style={{ fontWeight: 500 }}>{`Address Line 2: `}</span>
                                    <span htmlFor="name" className="normal-label">{selectedOrder.customer_addressLine2}</span>
                                </div>
                            </div>

                            <div className="form-row row">
                                <div className="col-xs-12 col-sm-6 col-lg-6">
                                    <span htmlFor="name" className="normal-label" style={{ fontWeight: 500 }}>{`Phone: `}</span>
                                    <span htmlFor="name" className="normal-label">{selectedOrder.customer_phone}</span>
                                </div>

                                <div className="col-xs-12 col-sm-6 col-lg-6">
                                    <span htmlFor="name" className="normal-label" style={{ fontWeight: 500 }}>{`City: `}</span>
                                    <span htmlFor="name" className="normal-label">{selectedOrder.customer_city}</span>
                                </div>
                            </div>

                            <div className="form-row row">
                                <div className="col-xs-12 col-sm-6 col-lg-6">
                                    <span htmlFor="name" className="normal-label" style={{ fontWeight: 500 }}>{`Zip Code: `}</span>
                                    <span htmlFor="name" className="normal-label">{selectedOrder.customer_zipCode}</span>
                                </div>

                                <div className="col-xs-12 col-sm-6 col-lg-6">
                                    <span htmlFor="name" className="normal-label" style={{ fontWeight: 500 }}>{`State: `}</span>
                                    <span htmlFor="name" className="normal-label">{selectedOrder.customer_state}</span>
                                </div>
                            </div>
                            <div style={{
                                marginTop: 20,
                                paddingBottom: 9,
                                marginBottom: 10,
                                borderBottom: '1px solid #eee' }}>
                                <h6>Products</h6>
                            </div>
                            <OrderItemDataTable orderID={selectedOrder._id} selectedOrderItemCB={selectedOrderItemCB} selectedOrderItemCBReview={selectedOrderItemCBReview} />
                            {renderFPDIframe()}
                            {renderReview()}
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-default" 
                                onClick={() => {
                                    closeModalButton.current.click();
                                    setDescrReview('')
                                    setValueStar(0);
                                    setSelectedOrderItem(null);
                                }}  
                            >Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default OrderForm;