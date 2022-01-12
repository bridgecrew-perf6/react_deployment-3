// Core Imports
import React, { useState, useCallback, useEffect, useRef }   from 'react';
//import CircularProgress from '@material-ui/core/CircularProgress';
import { useIndexedDB } from 'react-indexed-db';
import { getBraintreeClientToken, processPayment, updateOrderStatus } from '../APICalls'
import { getOrder, getOrderWorker } from '../APICalls'
import DropIn from 'braintree-web-drop-in-react';
import { Redirect } from 'react-router-dom';
import * as R from 'ramda';
import './Loader.css';

import BeautyStars from 'beauty-stars';
import { createRating } from "../APICalls";
// Selector Imports
import { isAuthenticated } from '../auth/functions';

// Custom Component Imports
import Layout from '../core/Layout2';
//import Product from './Product';
import Product2 from './Product2';

// Misc Imports
import Config from '../config'

// TODO: Explanation
const Payment = (params) => {

    // Initial state
    const [cart, setCart] = useState();
    const [orderId, setOrderId] = useState(params.location.orderId);
    const [numberOfItems, setNumberOfItems] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [shippingFee, setShippingFee] = useState(0);
    const [redirectToMain, setRedirectToMain] = useState(0);
    const [cartLastUpdate, setCartLastUpdate] = useState(localStorage.getItem('cartLastUpdate'));
    const { getAll, deleteRecord, update } = useIndexedDB('cart');
    const [ currentOrder, setCurrentOrder ] = useState('');
    const [selectedOrderItemReview, setSelectedOrderItemReview] = useState({});
    const [descrReview, setDescrReview] = useState('');
    const [valueStar, setValueStar] = useState(0);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false); 
    const [noPayment, setNoPayment] = useState(true); 
    
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });    

    const showBlockSuccessUIModalRef = useRef(null);
    const hideBlockSuccessUIModalRef = useRef(null);
    const showBlockErrorUIModalRef = useRef(null);
    const hideBlockErrorUIModalRef = useRef(null);
    

    const { user, token } = isAuthenticated();

    // Events --------------------------------------------------------------------------------------

    

    //Braintree
    const getToken = () => {        
        getBraintreeClientToken().then(data => {
            if (data.error) 
            {
                setData({ ...data, error: data.error });
            } 
            else 
            {
                setData({ clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {        
        if (orderId === undefined) setOrderId(localStorage.getItem('orderId'))
        getToken();
    }, []);


    const onLocalStorageChange = useCallback(event => {

        console.log('Checkout@onLocalStorageChange');
        
        if (event.key && event.key === 'cartLastUpdate' && event.oldValue !== event.newValue)
        {
            updateCart();
        }

        if (event.key && event.key === 'orderId' && event.oldValue !== event.newValue)
        {
            //TODO: Redirect to checkout because someone change orderId.
            console.log("Redirect to checkout because someone change orderId.");
        }

    }, []);

    // This receives the product from the iframe
    const onMessageReceived = useCallback(event => {

        console.log('Checkout@onMessageReceived()');

        if (event.data === 'updateCart' && event.origin === Config.HOME_URL)
        {
            let storageCartLastUpdate = localStorage.getItem('cartLastUpdate');

            if (storageCartLastUpdate !== null && storageCartLastUpdate !== cartLastUpdate)
            {
                setTimeout(() => {

                    updateCart();
                    setCartLastUpdate(storageCartLastUpdate);
    
                }, 750);
            }
        }
        else
        {
            if (event.origin !== Config.BASE_FPD_URL) return;

            setTimeout(() => {

                updateCart();

            }, 750);
        }

    }, []);

    const onClickPay = () => {
        let nonce;
        
        //showBlockUIModalRef.current.click();
        data.instance
            .requestPaymentMethod()
            .then(data => {
                // console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
                // and also total to be charged
                console.log(
                    "send nonce and total to process: ",
                    nonce,
                    
                );
                console.log(orderId);

                const paymentData = {
                    paymentMethodNonce: nonce,
                    orderId: orderId
                };
                //hideBlockUIModalRef.current.click();
                processPayment(paymentData)
                    .then(response => {

                        console.log('response payment process:',response);
                        if (response.success === true){
                            /*cart.map(cartItems => {
                                deleteRecord(cartItems.id).then(
                
                                    // Accept
                                    event => {
                                        console.log('Deleted product form cart!');
                                        updateCart();
                                        window.postMessage('updateCart', '*');
                                        localStorage.setItem('cartLastUpdate', Date.now());
                                    },
                    
                                    // Reject
                                    error => {
                                        // TODO: Maybe, if there is a server-side persisting of the cart,
                                        // retrieve it and update the local storage? This must be confirmed.
                                        // TODO: Process error here
                                        console.log(error);
                                    }
                                );
                            })*/
                            
                            showBlockSuccessUIModalRef.current.click();
                            setNoPayment(false);
                            let body = {status: Config.ORDER_STATUS.open, is_paid: true}
                            updateOrderStatus(orderId,body).then(response => {
                                console.log('response update orfder status',response);
                            });

                            //TODO: vaciar carrito y eliminar datos de localstorage y de indexDB 
                        }
                        
                    })
                    .catch(error => {
                        showBlockErrorUIModalRef.current.click();
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
            
    }

    // END Events ----------------------------------------------------------------------------------

    // React Effects -------------------------------------------------------------------------------

    useEffect(() => {
        console.log('localStorage: ',localStorage)
        const orderId = localStorage.getItem('orderId');
        
        if(orderId !== null || orderId){            

            getOrderWorker(orderId).then(data => {
                console.log('data',data);
                if (data.error)
                {
                    localStorage.removeItem('orderId');
                    //Caso muy extremo que solo pasa si se borra de base de datos.            
                }
                else
                {

                    setCurrentOrder(data);
                    /*getAll().then( cartItems => {
                        let isAffected = false;

                        if (cartItems.length > data.orderItems.length) 
                        {
                            //TODO: Deberíamos cancelar la orden y guardarla de nuevo?
                            console.log("Hay más items en el carro que en BD");
                        }

                        cartItems.forEach(productLocal => {
                            let productAtServer = R.filter(x => x.guid === productLocal.guid, data.orderItems);
                            productAtServer = productAtServer[0];
                            
                            if (productAtServer === undefined)
                            {
                                deleteRecord(productLocal.id)
                            }
                            else
                            {
                                let affectedItems = [];                                

                                affectedItems['price'] = productLocal.price !== productAtServer.price;
                                affectedItems['qty'] = productLocal.qty !== productAtServer.qty;
                                affectedItems['size'] = productLocal.size !== productAtServer.size;
                                affectedItems['colo r'] = productLocal.color !== productAtServer.color;
                                affectedItems['product'] = !R.equals(productLocal.product_obj, productAtServer.product);

                                Object.keys(affectedItems).forEach( index => {
                                    if (affectedItems[index]) 
                                    {
                                        isAffected = true;
                                        productLocal[index] = productAtServer[index];
                                    }
                                }); 

                                if (isAffected) 
                                {                                    
                                    update(productLocal)
                                }
                            }
                        });
                        updateCart() 
                    });*/
                }    
            }); 
        }  
    }, []);

    useEffect(() => updateCart(), []);

    useEffect(() => {

        window.addEventListener("message", onMessageReceived);
        return () => window.removeEventListener("message", onMessageReceived);

    }, [onMessageReceived]);

    useEffect(() => {

        window.addEventListener("storage", onLocalStorageChange);
        return () => window.removeEventListener("storage", onLocalStorageChange);

    }, [onLocalStorageChange]);

    // END React Effects ---------------------------------------------------------------------------

    // Events --------------------------------------------------------------------------------------

    const clickClose = () => {
        setRedirectToMain(true);
    }

    // END Events ----------------------------------------------------------------------------------

    // Methods -------------------------------------------------------------------------------------

    // Update the items and information in the cart.
    const updateCart = () => {

        getAll().then(
            
            // Accept
            cart => {

                let _subtotal = 0;
                let _numberOfItems = 0;
                let _shippingFee = parseFloat(localStorage.getItem('shippingFee')).toFixed(2);

                // Calculate the current subtotal
                for(var i = 0; i < cart.length; i++)
                {
                    _subtotal += parseFloat(cart[i].price) * parseInt(cart[i].qty);
                    _numberOfItems += parseInt(cart[i].qty);
                }

                setCart(cart);
                setSubtotal(_subtotal);
                setTotal(parseFloat(_subtotal) + parseFloat(_shippingFee));
                setShippingFee(_shippingFee);
                setNumberOfItems(_numberOfItems);                
            },

            // Reject
            error => {

                // TODO: Maybe, if there is a server-side persisting of the cart,
                // retrieve it and update the local storage? This must be confirmed.
                // TODO: Process error here
                console.log(error);
            }
        );
    }


    // END Methods ---------------------------------------------------------------------------------

    // Render Methods ------------------------------------------------------------------------------

    const renderRedirect = () => {
        let sessionData = JSON.parse(localStorage.getItem('jwt'));
        let redirecTo = sessionData !== null ? sessionData.user.role : '';
        if (redirectToMain && redirecTo == '') 
        {
            return <Redirect to={{ pathname: "/"}}/>
        }
        if (redirectToMain && redirecTo == 'admin') 
        {
            return <Redirect to={{ pathname: "/admin/dashboard/user-information"}}/>
        }
        if (redirectToMain && redirecTo == 'worker') 
        {
            return <Redirect to={{ pathname: "/user/dashboard"}}/>
        }
    }

   /*const renderBlockUIModal = () => {
        return (
            <>  
                <button ref={showBlockUIModalRef} type="button" data-toggle="modal" data-target="#staticBackdrop" style={{ display: 'none' }} />
                <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="loader">
                        <CircularProgress className="spinner" color="secondary" />
                        <p>Loading...</p>
                        <button ref={hideBlockUIModalRef} type="button" className="close" data-dismiss="modal" aria-label="Close" />
                    </div>
                </div>
                
            </>
        );

    }*/


    const renderBlockSuccessUIModal = () => {
        return (
            <>
                <button ref={showBlockSuccessUIModalRef} type="button" data-toggle="modal" data-target="#staticBackdrop2" style={{ display: 'none'}} />
                <div className="modal fade" id="staticBackdrop2" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel2">Payment Successful
                                    <button 
                                        ref={hideBlockSuccessUIModalRef} 
                                        type="button" 
                                        className="close" 
                                        data-dismiss="modal" 
                                        aria-label="Close"
                                        onClick={() => clickClose()}
                                    >
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </h5>
                            </div>
                            <div className="modal-body">
                                Your payment has been received
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }


    const renderTipTo = () => {

        return (

            <div className="checkout-form">

                <div className="row">

                    <div className="col-md-2 col-lg-2 col-sm-3 col-xs-4">
                        <div className="logo">

                            <img src={window.location.origin + "/images/logo/tiptiptop_logo.png"} alt="logo" style={{ height: "100px", maxHeight: "100%" }} />

                        </div>
                    </div>

                    <div className="col-md-8 col-lg-8 col-sm-6 col-xs-3">
                        <nav className="mainmenu__nav hidden-xs hidden-sm">
                            <ul className="main__menu">

                                <li className="drop">


                                </li>


                            </ul>
                        </nav>

                    </div>

                    <div className="col-md-2 col-sm-4 col-xs-5">
                        <ul className="logo">
                            {renderProducts()}

                        </ul>
                    </div>
                </div>
               

               
            </div>
        );
    }




    const renderBlockErrorUIModal = () => {
        return (
            <>
                <button ref={showBlockErrorUIModalRef} type="button" data-toggle="modal" data-target="#staticBackdrop3" style={{ display: 'none' }} />
                <div className="modal fade" id="staticBackdrop3" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel3" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel3">Payment Failed</h5>
                            <button 
                                ref={hideBlockErrorUIModalRef} 
                                type="button" className="close" 
                                data-dismiss="modal" 
                                aria-label="Close"
                                onClick={() => clickClose()}
                            >
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Your payment could not bet processed. Try again later
                        </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }


    // Render all current items in the cart
    const renderProducts = () => {
        console.log('CUrrent Order Render', currentOrder.order)
        //setCurrentProductId(currentOrder.order.product_id)
        if (currentOrder && currentOrder != '')
        {
            let orderWorker = [];
            orderWorker.push(currentOrder.order);

            return orderWorker.map(product => {
                
                return(
                    <div key={product._id}>
                        <Product2 product={product} />
                    </div>
                )
            })
        }
        else
        {
            return (<span>...</span>);
        }
    }

    const renderPaymentDetails = () => {
        if (noPayment) {
        return (
        <div onBlur={() => setData({ ...data, error: '' })}>           
            {data.clientToken !== null ? (       
            <div className="payment-form">
                <h2 className="pasadena-section-title-3">payment details </h2>
                <div className="mt--20">
                    <DropIn
                        options={{
                            authorization: data.clientToken/*,
                            paypal: {
                                flow: 'vault'
                            }*/
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    
                    <div className="checkout-btn" style={{marginTop: 20, textAlign: 'right'}}>
                        <button onClick={onClickPay}  className="fv-btn">CONFIRM & BUY NOW</button>
                    </div>
                </div>
            </div>) : null}
            
        </div> 
        )
        }
        
    }

    

    const renderContent = () => {
        
        return (
            <section className="our-checkout-area ptb--120 bg__white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-8">
                            <div className="ckeckout-left-sidebar">
                           
                                {renderPaymentDetails()}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        )
        
    }


    // END Render Methods --------------------------------------------------------------------------

    // Main Render
    return (
        <Layout 
            title = "Screen Printing Page"
            description = "Ecommerce"
            showBreadcrumb = {false}
            className="wrapper fixed__footer"
        >
            {renderTipTo()}
            {renderContent()}
            {/*renderBlockUIModal()*/}
            {renderBlockSuccessUIModal()}
            {renderBlockErrorUIModal()}
            {renderRedirect()}
        </Layout>
    );
};

export default Payment;