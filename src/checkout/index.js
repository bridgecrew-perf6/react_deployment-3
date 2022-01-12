// Core Imports
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useIndexedDB } from 'react-indexed-db';
import PhoneInput from 'react-phone-number-input/input'
import { createOrder, updateOrder, getShippingRates, getProduct } from '../APICalls'
import { createRating } from "../APICalls";
import { Redirect } from 'react-router-dom';


// Custom Component Imports
import Layout from '../core/Layout2';
import Product2 from './Product2';
import BeautyStars from 'beauty-stars';

// Function Imports
import { isAuthenticated } from '../auth/functions';

// Misc Imports
import Config from '../config'

// TODO: Explanation



const getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    //console.log(query)//"app=article&act=news_content&aid=160990"
    var vars = query.split("&");
    //console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        //console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ] 
        if (pair[0] == variable) {
            //console.log('pair1',pair[1]);
            return pair[1];
        }
    }
    return (false);
}





const Checkout = (params) => {

    // Initial state
    const { user, token } = isAuthenticated();
    const [cart, setCart] = useState();
    const [numberOfItems, setNumberOfItems] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [cartLastUpdate, setCartLastUpdate] = useState(localStorage.getItem('cartLastUpdate'));
    const [redirectToPayment, setRedirectToPayment] = useState(0);
    const [orderId, setOrderId] = useState(localStorage.getItem('orderId'));
    const [postalCode, setPostalCode] = useState('');
    const [shippingFee, setShippingFee] = useState(0);
    const [weight, setWeight] = useState(0);
    const { getAll, deleteRecord, update } = useIndexedDB('cart');
    const [currentProduct, setCurrentProduct] = useState('');
    const [currentOrder, setCurrentOrder] = useState('');
    const [price, setPrice] = useState(0);
    const [priceBill, setPriceBill] = useState('');
    const [trFee, setTrFee] = useState(0);
    const [term, setTerm] = useState(0);
    const [goodService, setGoodService] = useState(0);
    const [atmosphere, setAtmosphere] = useState(0);
    const [dish, setDish] = useState(0);
    const [tasty, setTasty] = useState(0);
    const [porcent, setPorcent] = useState(10);
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });
    const [valueStar, setValueStar] = useState(0);
    const [selectedOrderItemReview, setSelectedOrderItemReview] = useState({});
    const [descrReview, setDescrReview] = useState('');
    const [error, setError] = useState(false);

    let currentData = localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : '';
    // console.log('currentData', localStorage);

    let worker = getQueryVariable('worker');
    console.log('worker:', worker);

    const [shippingInfo, setShippingInfo] = useState(
        {
            name: currentData !== '' ? currentData.user.name : '',
            email: currentData !== '' ? currentData.user.email : '',
            confirmEmail: currentData !== '' ? currentData.user.email : '',
            phone: currentData !== '' ? currentData.phoneNumber : '',
            addressLine1: currentData !== '' ? currentData.street : '',
            city: currentData !== '' ? currentData.city : '',
            state: currentData !== '' ? currentData.state : '',
            postalCode: '',
            country: currentData !== '' ? currentData.name : '',
        }
    );

    const [errorFieldMessages, setErrorFieldMessages] = useState(
        {
            name: null,
            email: null,
            confirmEmail: null,
            phone: null,
            addressLine1: null,
            addressLine2: null,
            city: null,
            state: null,
            postalCode: null,
        }
    );

    const showBlockSuccessUIModalReviewRef = useRef(null);
    const hideBlockSuccessUIModalReviewRef = useRef(null);

    // Events --------------------------------------------------------------------------------------

    const clickSubmitReview = e => {
        e.preventDefault();
        setError(false);
        if (valueStar > 0 && descrReview != '') {
            createRating(token, {
                rating: valueStar,
                review: descrReview,
                product: currentOrder.order.product_id,
                user: user._id
            }).then(data => {
                if (data.message == 'The rating already exist') {
                    setError(data.message);
                    return
                }
                if (data.error) {
                    setError(data.error.description);
                    console.log('error', error)
                }
                else {
                    /// showBlockSuccessUIModalRef.current.click();
                    setValueStar(0);
                    setDescrReview('');
                    //setSuccess("Review Created");
                }
            })
        }
        else {
            setError("Must indicate a value for the rating / description");
            return
        }
    };



    const onLocalStorageChange = useCallback(event => {

        console.log('Checkout@onLocalStorageChange');

        if (event.key && event.key === 'cartLastUpdate' && event.oldValue !== event.newValue) {
            updateCart();
        }

    }, []);

    // This receives the product from the iframe
    const onMessageReceived = useCallback(event => {

        console.log('Checkout@onMessageReceived()');

        if (event.data === 'updateCart' && event.origin === Config.HOME_URL) {
            let storageCartLastUpdate = localStorage.getItem('cartLastUpdate');

            if (storageCartLastUpdate !== null && storageCartLastUpdate !== cartLastUpdate) {
                setTimeout(() => {

                    updateCart();
                    setCartLastUpdate(storageCartLastUpdate);

                }, 750);
            }
        }
        else {
            if (event.origin !== Config.BASE_FPD_URL) return;

            setTimeout(() => {

                updateCart();

            }, 750);
        }

    }, []);

    // Delete item from cart
    const onDeleteProduct = useCallback(id => {

        console.log('onDeleteProduct ' + id);

        if (id) {
            deleteRecord(id).then(

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
        }

    }, []);

    const onEditProduct = useCallback((product, newValue, field) => {

        console.log('onEditProduct ' + product.id);

        if (true) {
            product[field] = newValue;

            update(product).then(

                // Accept
                () => {
                    console.log('Product Updated successfully!.');
                    window.postMessage('updateCart', '*');
                    localStorage.setItem('cartLastUpdate', Date.now());
                    updateCart();
                },

                // Reject
                error => {

                    console.log(error);
                }
            );
        }
    });

    // END Events ----------------------------------------------------------------------------------

    // React Effects -------------------------------------------------------------------------------

    useEffect(() => {
        updateCart();



    }, []);

    useEffect(() => {

        window.addEventListener("message", onMessageReceived);

        getProduct(worker).then(data => {

            if (data.error) {
                //setError(data.error);
                //TODO: mostrar mensaje de error
            }
            else {
                console.log('data de product', data);
                setCurrentProduct(data);
                //return data;
            }
        });


        return () => window.removeEventListener("message", onMessageReceived);


    }, [onMessageReceived]);

    useEffect(() => {
        window.addEventListener("storage", onLocalStorageChange);
        return () => window.removeEventListener("storage", onLocalStorageChange);

    }, [onLocalStorageChange]);

    /*useEffect(() => {
        getQueryVariable('id');
        if (postalCode === undefined || postalCode.length < 5) 
        {
            setShippingFee(0);
            return;
        }

        getShippingRates(postalCode, weight).then(data => {
            if( data !==undefined && data.rate !== undefined){
                setShippingFee(data.rate);
            }
            else
            {
                setShippingFee(0);
            }
        });
    }, [postalCode]);
    
    useEffect(() => {
        getQueryVariable('id');
        if (weight !== undefined && weight > 0)
        {
            getShippingRates(postalCode, weight).then(data => {
                if( data !==undefined && data.rate !== undefined){
                    setShippingFee(data.rate);
                }
                else
                {
                    setShippingFee(0);
                }
            });
        }
    }, [weight]);*/

    useEffect(() => {
        localStorage.setItem('shippingFee', shippingFee);
    }, [shippingFee]);

    // END React Effects ---------------------------------------------------------------------------

    // Methods -------------------------------------------------------------------------------------

    // Update the items and information in the cart.
    const updateCart = () => {

        getAll().then(

            // Accept
            cart => {
                let total = 0;
                let _numberOfItems = 0;
                let totalWeight = 0;

                // Calculate the current total
                for (var i = 0; i < cart.length; i++) {
                    total += cart[i].price * parseInt(cart[i].qty);
                    _numberOfItems += parseInt(cart[i].qty);
                    totalWeight += parseInt(cart[i].qty) * cart[i].weight;

                }

                setWeight(Math.ceil(totalWeight));
                setCart(cart);
                setSubtotal(total);
                setNumberOfItems(_numberOfItems);
                localStorage.setItem('cartHasItems', _numberOfItems > 0);
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

    const onChangeText = e => {

        const { name, value } = e.target

        if (name === 'postalCode') {
            setPostalCode(value);
        }

        setShippingInfo(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (errorFieldMessages[name] !== '' || errorFieldMessages[name] !== null) {
            setErrorFieldMessages(prevState => ({
                ...prevState,
                [name]: null
            }));
        }
    }

    const onChangePhoneNumber = value => {
        setShippingInfo(prevState => ({
            ...prevState,
            phone: value
        }));

        if (errorFieldMessages.phone !== '' || errorFieldMessages.phone !== null) {
            setErrorFieldMessages(prevState => ({
                ...prevState,
                phone: null
            }));
        }
    }

    const onClickTrFee = () => {
        if (trFee == 0) {
            setTrFee(1);
        }
        else {
            setTrFee(0);
        }
        
    }

    const onClickTerm = () => {
        if (term == 0) {
            setTerm(1);
        }
        else {
            setTerm(0);
        }
        
    }


    const onClickGoodService = () => {
        if (goodService == 0) {
            setGoodService(1);
        }
        else {
            setGoodService(0);
        }
        
    }

    const onClickAtmosphere = () => {
        if (atmosphere == 0) {
            setAtmosphere(1);
        }
        else {
            setAtmosphere(0);
        }
        
    }

    const onClickDish = () => {
        if (dish == 0) {
            setDish(1);
        }
        else {
            setDish(0);
        }
        
    }

    const onClickTasty = () => {
        if (tasty == 0) {
            setTasty(1);
        }
        else {
            setTasty(0);
        }
        
    }

    const onClickPorcent = (porcentNumber) => {
        if (porcentNumber == 10) {
            setPorcent(10);
            if (priceBill > 0) { setPrice((priceBill * 0.10).toFixed(2)) }
        }
        if (porcentNumber == 15) {
            setPorcent(15);
            if (priceBill > 0) { setPrice((priceBill * 0.15).toFixed(2)) }
        }
        if (porcentNumber == 20) {
            setPorcent(20);
            if (priceBill > 0) { setPrice((priceBill * 0.20).toFixed(2)) }
        }
        
    }




    

    const onChangeSelectedState = e => {

        e.preventDefault();

        if (e && e.target) {
            const { name, value } = e.target

            setShippingInfo(prevState => ({
                ...prevState,
                [name]: value
            }));

            if (errorFieldMessages[name] !== '' || errorFieldMessages[name] !== null) {
                setErrorFieldMessages(prevState => ({
                    ...prevState,
                    [name]: null
                }));
            }
        }
    }

    const showErrorMsg = (field) => {

        if (errorFieldMessages[field]) {
            return <label className="checkout-field-error-msg">{errorFieldMessages[field]}</label>
        }
        else return null;
    }

    const onSubmitForm = () => {

        let errors = {
            name: null,
            email: null,
            phone: null,
            addressLine1: null,
            city: null,
            state: null,
            postalCode: null,
        }

        let hasErrors = false;
        

        if (price == 0) {
            errors.name = 'Please, enter amount in the bill';
            hasErrors = true;
        }

        if (term == 0) {
            errors.name = 'Please, accept terms...';
            hasErrors = true;
        }

        if (trFee == 0) {
            errors.name = 'Please, accept fees...';
            hasErrors = true;
        }

        


        setErrorFieldMessages(prevState => ({
            ...prevState,
            ...errors
        }));

        if (!hasErrors) {

            let formData = new FormData();
            console.log('currentProduct for JSON', currentProduct);
            //formData.append('name', shippingInfo.name);
            //formData.append('phone', shippingInfo.phone);
            //formData.append('email', shippingInfo.email);
            //formData.append('addressLine1', shippingInfo.addressLine1);
            //formData.append('city', shippingInfo.city);
            //formData.append('state', shippingInfo.state);
            //formData.append('postalCode', shippingInfo.postalCode);
            formData.append('price', price);
            formData.append('term', term);
            formData.append('trFee', trFee);
            formData.append('dish', dish);
            formData.append('atmosphere', atmosphere);
            formData.append('tasty', tasty);
            formData.append('goodService', goodService);
            formData.append('porcent', porcent);
            formData.append('valueStar', valueStar);
            formData.append('product_id', currentProduct._id);
            formData.append('product', JSON.stringify(currentProduct));


            createOrder(formData, token).then(data => {
                setTimeout(() => {
                    
                    setOrderId(data._id);
                    setError(false);
                    if (valueStar > 0) {
                        let newReview = {dish: dish, tasty: tasty, goodService:goodService, atmosphere: atmosphere};
                        createRating(token, {
                        rating: valueStar,
                        review: newReview,
                        product: currentProduct._id,
                        user: user ? user._id : '61bea35a889ca550650d4fff'
                        }).then(data => {
                            if (data.message == 'The rating already exist') {
                                setError(data.message);
                                return
                            }
                            if (data.error) {
                                setError(data.error.description);
                                console.log('error', error)
                            }
                            else {
                                /// showBlockSuccessUIModalRef.current.click();
                                setValueStar(0);
                                setDescrReview('');
                                //setSuccess("Review Created");
                                }
                        })
                    }
                    localStorage.setItem('orderId', data._id);
                    setRedirectToPayment(true);
                }, 1500);
            });




        }
    }

    // END Methods ---------------------------------------------------------------------------------

    // Render Methods ------------------------------------------------------------------------------

    const renderRedirect = () => {
        if (redirectToPayment) {
            return <Redirect to={{ pathname: "/payment", orderId: orderId }} />
        }
    }

    // Render all current items in the cart
    const renderProducts = () => {
        let currentProduct0 = [];

        if (currentProduct) {
            currentProduct0.push(currentProduct);
            console.log('currentProduct0', currentProduct0)
            return currentProduct0.map(product => {

                return (
                    <div key={product._id} className="checkout__cart__wrap">
                        <Product2 product={product} editCallback={onEditProduct} delCallback={onDeleteProduct} />
                    </div>
                )
            })
        }
        else {
            return (<span>...</span>);
        }
    }

    const renderFormField = (type, fieldName, onChangeCb, placeholder, props) => {

        const hasError = errorFieldMessages[fieldName] !== '' && errorFieldMessages[fieldName] !== null;
        const className = hasError ? 'checkout-field-error' : '';

        if (type !== 'tel' && type !== 'select') {
            return (
                <input type={type} name={fieldName} className={className} value={shippingInfo[fieldName]} onChange={onChangeCb} placeholder={placeholder} {...props} />
            );
        }
        else if (type === 'tel') {
            return (
                <PhoneInput name={fieldName} value={shippingInfo[fieldName]} onChange={onChangeCb} placeholder={placeholder} {...props} />
            );
        }
        else if (type === 'select') {
            return (

                <select name={fieldName} className={className} value={shippingInfo[fieldName]} onChange={onChangeCb}>
                    <option value='default'>{props.defaultOption}</option>
                    {props.options.map(row => <option key={row[props.key]} value={row[props.key]}>{row[props.value]}</option>)}
                </select>
            );
        }
        else return null;

    }

    const renderFormFieldContainer = (type, fieldName, labelName, onChangeCb, placeholder, props) => {

        const errorStyle = errorFieldMessages[fieldName] ? { marginBottom: 4 } : {};

        return (
            <div className="single-checkout-box-div" style={errorStyle}>
                <label htmlFor={fieldName} className="normal-label">{labelName}</label>
                {renderFormField(type, fieldName, onChangeCb, placeholder, props)}
                {showErrorMsg(fieldName)}
            </div>
        );
    }

    const renderShippingForm = () => {

        return (
            <form className="pasadena-checkout-form-inner" autoComplete="off">

                <div className="input-checkout-container col-xg-12 col-md-12 col-xs-12">
                    <div 
                        class="botonbill col-xg-4 col-md-4 col-xs-4" 
                        onClick={() => onClickPorcent(10)}
                        style={{ backgroundColor: porcent == 10 ? 'gray' : 'white' }}
                    >  
                        <b><span>10%</span></b>
                    </div>
                    <div 
                        class="botonbill col-xg-4 col-md-4 col-xs-4"
                        onClick={() => onClickPorcent(15)}
                        style={{ backgroundColor: porcent == 15 ? 'gray' : 'white' }}
                    >
                         <b><span>15%</span></b> 
                    </div>
                    <div 
                        class="botonbill col-xg-4 col-md-4 col-xs-4"
                        onClick={() => onClickPorcent(20)}
                        style={{ backgroundColor: porcent == 20 ? 'gray' : 'white' }}
                    >
                        <b><span>20%</span></b> 
                    </div>
                </div>

                <div className="itiptiptop-amount-tip">
                    
                <div className="tiptiptop-amount-tip font-white font-18">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{price}$ <span className="label2">Tip amount</span></div>
                </div>

                <div>
                    <input type="text" disabled className="label2 bg_tip" name="ratelabel" value="Rate your experience"></input>
                </div>
                <div>
                    <div className="col-md-12">
                        <br></br>
                        <div>
                            <div className="row" id="post-review-box" >
                                <div className="col-md-12 col-xs-12">
                                    <div class="col-xg-1 col-md-1 col-xs-1">&nbsp;</div>
                                    <form accept-charset="UTF-8" action="" method="post" class="col-xg-8 col-md-8 col-xs-8">

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


                                        </div>

                                    </form>
                                    <div class="col-xg-2 col-md-2 col-xs-2">&nbsp;</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg_tip">
                    &nbsp;
                </div>

                <div className="input-checkout-container col-xg-12 col-md-12 col-xs-12 bg_tip">
                    <span class="col-xg-1 col-md-1 col-xs-3" >
                        <img 
                            onClick={() => onClickDish()}
                            src={window.location.origin + "/images/logo/dish_inactive.png"} 
                            alt="logo" style={{ height: "30px", maxHeight: "100%" }} 
                        />
                        <span style={{ color: dish == 0 ? 'black' : 'white' }}>Dish</span>
                    </span>
                    <span class="col-xg-1 col-md-1 col-xs-3" >
                        <img 
                            onClick={() => onClickAtmosphere()}
                            src={window.location.origin + "/images/logo/atmosphere_inactive.png"} 
                            alt="logo" style={{ height: "30px", maxHeight: "100%" }} 
                        />
                        <span style={{ color: atmosphere == 0 ? 'black' : 'white' }}>Atmos</span>
                    </span>
                    <span class="col-xg-1 col-md-1 col-xs-3" >
                        <img 
                            onClick={() => onClickTasty()}
                            src={window.location.origin + "/images/logo/tasty_inactive.png"} 
                            alt="logo" style={{ height: "30px", maxHeight: "100%" }} 
                        />
                        <span style={{ color: tasty == 0 ? 'black' : 'white' }}>Tasty</span>
                    </span>
                    <span class="col-xg-1 col-md-1 col-xs-3" >
                        <img 
                            onClick={() => onClickGoodService()}
                            src={window.location.origin + "/images/logo/service_inactive.png"} alt="logo" 
                            style={{ height: "30px", maxHeight: "100%" }} 
                        />
                        <span style={{ color: goodService == 0 ? 'black' : 'white' }}>Good</span>
                    </span>
                </div>

        


            </form>
        );

    }

    const renderShippingDetails = () => {

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
                <div className="mobile-menu-area"></div>





                <div className="tiptiptop-amount-bill"><br></br>Amount in the bill: <input className="input-amount-bill"
                    type="text"
                    id="priceBill"
                    
                    onChange={e => {

                        setPriceBill(e.target.value);
                        if (porcent == 10) { setPrice((e.target.value * 0.10).toFixed(2)); }
                        if (porcent == 15) { setPrice((e.target.value * 0.15).toFixed(2)); }
                        if (porcent == 20) { setPrice((e.target.value * 0.20).toFixed(2)); }

                    }}
                    value={priceBill}
                    style={{ fontSize: 20, textAlign: "right", color: "white" }} maxLength="7" size="7" /> <span className="font-white">$</span></div>



                {renderShippingForm()}
            </div>
        );
    }

    const renderCheckoutCart = () => {

        const strItem = numberOfItems > 1 ? 'items' : 'item';

        return (
            <>
                <div className="our-important-note bg_tip">

                    <div className="input-checkout-container col-xg-12 col-md-12 col-xs-12 bg_tip">
                        &nbsp;
                    </div>


                    <div className="col-xs-1"></div>
                    <ul className="shopping__btn col-xs-9">
                        <li className="shp__checkout">
                            <b><a href="javascript:void(0)" onClick={onSubmitForm}>{`Proceed to payment`}</a></b>
                        </li>

                    </ul>
                    <div className="col-xs-2"></div>
                </div>
                <div>
                    <div className="tiptiptop-bottom-tip"><br></br><br></br>&nbsp;</div>
                </div>
                <div>
                    <br></br>
                    <img 
                        class="col-xg-3 col-md-3 col-xs-3" 
                        onClick={() => onClickTrFee()}
                        src={trFee == 0 ? window.location.origin + "/images/logo/option_inactive.png" : window.location.origin + "/images/logo/option_active.png"} 
                        alt="logo" 
                        style={{ width: "45px", height: "12px", marginTop: "7px" }} 
                    />
                    I want to take transactional fee (0.5$). So waiter can receive the full amount.
                </div>
                <div>
                    <img class="col-xg-3 col-md-3 col-xs-3" 
                    onClick={() => onClickTerm()}
                    src={term == 0 ? window.location.origin + "/images/logo/option_inactive.png" : window.location.origin + "/images/logo/option_active.png"} 
                    alt="logo" style={{ width: "45px", height: "12px", marginTop: "7px" }} />
                    I agree with Terms of use and Personal data processing policy.
                </div>

                {/*
                <div className="puick-contact-area mt--60">
                    <h2 className="section-title-3">Quick Contract</h2>
                    <a href="phone:+8801722889963">+012 345 678 102 </a>
                </div>
                */}
            </>
        );
    }

    const renderContent = () => {
        /* if (cart && cart.length > 0)
         {*/

        return (
            <section className="our-checkout-area ptb--10 bg__white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-8">
                            <div className="ckeckout-left-sidebar">
                                {renderShippingDetails()}
                                {renderCheckoutCart()}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        );
        /*}
        else
        {
            return (
                <div className="cart-main-area ptb--60 bg__white">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <ul style={{ paddingTop: 22, paddingBottom: 22}}>
                                    <li style={{ fontSize: 22, textAlign: 'center'}}>Cart is empty <span className="ti-face-sad"></span>!</li>
                                </ul>
                                <ul className="shopping__btn">
                                    <li><a href="/screen-printing/traditional">Go to Shop</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }*/
    }

    // END Render Methods --------------------------------------------------------------------------

    // Main Render
    return (
        <Layout
            title="Main TiptipTop Page"
            description="Ecommerce"
            showBreadcrumb={false}
        >
            {renderContent()}
            {renderRedirect()}
        </Layout>
    );
};

export default Checkout;