// Core Imports
import React, { useEffect, useState, useCallback }  from 'react';
import { useIndexedDB } from 'react-indexed-db';

// Custom Component Imports
import Product from './Product'

// Custom Component Imports
import Layout from '../../core/Layout';

// Misc Imports
import Config from '../../config'

const FullCart = () => {

    // Initial state
    const [cart, setCart] = useState();
    const [subtotal, setSubtotal] = useState(0);
    const [cartLastUpdate, setCartLastUpdate] = useState(localStorage.getItem('cartLastUpdate'));
    const { getAll, deleteRecord, update } = useIndexedDB('cart');

    // Events --------------------------------------------------------------------------------------

    const onLocalStorageChange = useCallback(event => {

        console.log('FullCart@onLocalStorageChange');

        if (event.key && event.key === 'cartLastUpdate' && event.oldValue !== event.newValue)
        {
            updateCart();
        }

    }, []);

    // This receives the product from the iframe
    const onMessageReceived = useCallback(event => {

        console.log('FullCart@onMessageReceived()');

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

    // Delete item from cart
    const onDeleteProduct = useCallback(id => {

        console.log('onDeleteProduct ' + id);

        if (id)
        {
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

        if (true)
        {
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

    // Methods -------------------------------------------------------------------------------------

    // Update the items and information in the cart.
    const updateCart = () => {

        getAll().then(
            
            // Accept
            cart => {

                let subtotal = 0;

                // Calculate the current subtotal
                for(var i = 0; i < cart.length; i++)
                {
                    subtotal += cart[i].price * cart[i].qty;
                }

                setCart(cart);
                setSubtotal(subtotal);
                localStorage.setItem('cartHasItems', cart.length > 0);

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

    // Render all current items in the cart
    const renderProducts = () => {

        if (cart && cart.length > 0)
        {
            return cart.map(product => {

                return(
                    <Product key={product.id} product={product} editCallback={onEditProduct} delCallback={onDeleteProduct} />
                )
            })
        }
        else
        {
            return null;
        }
    }

    const renderContent = () => {

        if (cart && cart.length > 0)
        {
            return (
                <div className="cart-main-area ptb--60 bg__white">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="table-content table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="product-thumbnail">Preview</th>
                                                <th className="product-name">Product</th>
                                                <th className="product-price">Price</th>
                                                <th className="product-quantity">Quantity</th>
                                                <th className="product-size">Size</th>
                                                <th className="product-subtotal">Total</th>
                                                <th className="product-remove">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderProducts()}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <ul className="shopping__btn">
                                            <li><a href="/screen-printing/traditional">Keep Shopping</a></li>
                                        </ul>
                                        {/*<div className="coupon">
                                            <h3>Coupon</h3>
                                            <p>Enter your coupon code if you have one.</p>
                                            <input type="text" placeholder="Coupon code" />
                                            <input type="submit" value="Apply Coupon" />
                                        </div>*/}
                                    </div>
                                    <div className="col-md-3 col-md-offset-6">
                                        <div className="our-important-note">
                                            <ul className="shoping__total" style={{ border: 0, paddingTop: 0}}>
                                                <li className="subtotal">Sub-Total:</li>
                                                <li className="total__price" style={{ fontSize: 20 }}>${subtotal.toFixed(2)}</li>
                                            </ul>
                                            <ul className="shopping__btn">
                                                <li className="shp__checkout">
                                                    <a href="/checkout">Proceed to Checkout</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
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
        }
    }

    // END Render Methods --------------------------------------------------------------------------

    // Main Render
    return (
        <Layout 
            title = "Screen Printing Page"
            description = "Ecommerce"
            showBreadcrumb = {false}
        >
            {renderContent()}
        </Layout>
    );
};

export default FullCart;