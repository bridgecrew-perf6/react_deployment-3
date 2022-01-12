// Core Imports
import React, { useEffect, useState, useCallback }  from 'react';
import { useIndexedDB } from 'react-indexed-db';

// Custom Component Imports
import Product from '../sideCart/Product'

// Misc Imports
import Config from '../../config'

// Quick access side cart
const SideCart = () => {

    // Initial state
    const [cart, setCart] = useState();
    const [subtotal, setSubtotal] = useState(0);
    const [cartLastUpdate, setCartLastUpdate] = useState(localStorage.getItem('cartLastUpdate'));
    const { getAll, update, deleteRecord } = useIndexedDB('cart');

    // Events --------------------------------------------------------------------------------------

    const onLocalStorageChange = useCallback(event => {

        console.log('SideCart@onLocalStorageChange');
        
        if (event.key && event.key === 'cartLastUpdate' && event.oldValue !== event.newValue)
        {
            updateCart();
        }

    }, []);

    // This receives the product from the iframe
    const onMessageReceived = useCallback(event => {

        console.log('siteCart@onMessageReceived()');
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

                let productSimple = {

                    id: product.id,
                    title: product.name,
                    qty: product.qty,
                    productType: product.productType,
                    price: product.price,
                    image: product.image,
                }

                return(
                    <div key={product.id} className="checkout__cart__wrap" style={{ borderColor: '#ddd' }}>
                        <Product product={product} editCallback={onEditProduct} delCallback={onDeleteProduct} />
                    </div>
                )
            })
        }
        else
        {
            return (
                <>
                    <ul style={{ paddingTop: 22, paddingBottom: 22}}>
                        <li style={{ fontSize: 18, textAlign: 'center'}}>Cart is empty <span className="ti-face-sad"></span>!</li>
                    </ul>
                    <ul className="shopping__btn">
                        <li><a href="/screen-printing/traditional">Go to Shop</a></li>
                    </ul>
                </>
            );
        }
    }

    // Render totals section
    const renderTotals = () => {
        if (cart && cart.length > 0)
        {
            return (
                <>
                    <ul className="shoping__total">
                        <li className="subtotal">Subtotal:</li>
                        <li className="total__price">${subtotal.toFixed(2)}</li>
                    </ul>
                    <ul className="shopping__btn">
                        <li><a href="/cart">View Cart</a></li>
                        <li className="shp__checkout"><a href="/checkout">Checkout</a></li>
                    </ul>
                </>
            );
        }
        else return null;
    }

    // END Render Methods --------------------------------------------------------------------------

    // Main Render
    return (
        <div className="shopping__cart">
            <div className="shopping__cart__inner">
                <div className="offsetmenu__close__btn">
                    <button className="link-button"><i className="zmdi zmdi-close"></i></button>
                </div>
                <div className="our-important-note">
                    {renderProducts()}
                </div>
                {renderTotals()}
            </div>
        </div>
    );
};

export default SideCart;