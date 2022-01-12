// Core Imports
import React, { useState, useCallback, useEffect }   from 'react';
import { useIndexedDB } from 'react-indexed-db';
import { useParams } from 'react-router-dom';
import Iframe from 'react-iframe';
import { v4 as uuidv4 } from 'uuid';

// Custom Component Imports
import Layout from '../core/Layout';

// Misc Imports
import Config from '../config'

// TODO: Explanation
const Design = (params) => {
    // Initial state
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const { add, getByID, update } = useIndexedDB('cart');
    let { productId, editProductId,  printingType} = useParams();

    // Events --------------------------------------------------------------------------------------

    // This receives the product from the iframe
    const onMessageReceived = useCallback(event => {

        if (event.origin !== Config.BASE_FPD_URL) return;

        if (event && event.data)
        {
            // If a product is going to be edited, the object must be sent to FPD iframe to be able 
            // to load it and show all the layers.
            if (event.data === "editProduct")
            {
                getProductByID(event);
            }
            else
            {
                let productWithImage = JSON.parse(event.data);

                if (productWithImage.isEditing 
                    && productWithImage.isEditing === true 
                    && editProductId)
                {
                    updateProduct(productWithImage);
                }
                else
                {
                    insertProduct(productWithImage);
                }
            }
        }

    }, []);

    // END Events ----------------------------------------------------------------------------------

    // React Effects -------------------------------------------------------------------------------

    useEffect(() => {

        window.addEventListener("message", onMessageReceived);
        return () => window.removeEventListener("message", onMessageReceived);

    }, [onMessageReceived]);

    // END React Effects ---------------------------------------------------------------------------

    // Methods -------------------------------------------------------------------------------------

    // Get the product to be edited in the FPD plugin. It is returned using postMessage.
    const getProductByID = (event) => {

        if (editProductId)
        {
            // Retrieve the product from the local database
            getByID(editProductId).then(
                
                // Accept
                row => {

                    if (row === null || row === undefined || row.product === undefined || row.product === null)
                    {
                        setShowError(true);
                        setErrorMsg('The product that you are trying to edit was not found.');
                    }
                    else
                    {
                        event.source.postMessage(JSON.stringify(row.product), event.origin);
                    }
                },

                // Reject
                error => {

                    // TODO: Maybe, if there is a server-side persisting of the cart,
                    // retrive it and update the local storage? This must be confirmed.
                    setShowError(true);
                    setErrorMsg('Something went wrong. Please, try again.');
                    console.log(error);
                }
            );
        }
    }

    // Update the product by ID and the changes are reflected in the cart.
    const updateProduct = (productWithImage) => {

        if (editProductId)
        {
            getByID(editProductId).then(
                        
                // Accept
                row => {

                    if (row === null || row === undefined || row.product === undefined || row.product === null)
                    {
                        setShowError(true);
                        setErrorMsg('The product that you are trying to edit was not found.');
                    }
                    else
                    {
                        let rowToUpdate = {
                            id: row.id,
                            guid: uuidv4(),
                            name: row.name,
                            size: row.size,
                            productType: row.productType,
                            price: row.price,
                            qty: row.qty,
                            weight: row.weight,
                            description: row.description,
                            image: productWithImage.image,
                            product: productWithImage.product
                        }
                        
                        update(rowToUpdate).then(

                            // Accept
                            () => {
                                console.log('Design Updated successfully!.');
                                localStorage.setItem('cartLastUpdate', Date.now());
                            },

                            // Reject
                            error => {

                                // TODO: Maybe, if there is a server-side persisting of the cart,
                                // retrive it and update the local storage? This must be confirmed.
                                setShowError(true);
                                setErrorMsg('Something went wrong. Please, try again.');
                                console.log(error);
                            }
                        );
                    }
                },

                // Reject
                error => {

                    // TODO: Maybe, if there is a server-side persisting of the cart,
                    // retrive it and update the local storage? This must be confirmed.
                    setShowError(true);
                    setErrorMsg('Something went wrong. Please, try again.');
                    console.log(error);
                }
            );
        }
    }

    // Insert the product to the cart.
    const insertProduct = (productWithImage) => {

        let selectedSize = '';
        let productName = '';
        let productPrice = 0;
        let productWeight = 0;
        let productDesc = '';
        let productColor = '';
        let availableSizes = {};
        let category = '';

        if (params && params.location && params.location.state && params.location.state.selectedProduct)
        {
            selectedSize = params.location.state.selectedSize;
            productName = params.location.state.selectedProduct.name;
            productPrice = params.location.state.selectedProduct.price;
            productWeight = params.location.state.selectedProduct.weight;
            productDesc = params.location.state.selectedProduct.descr;
            availableSizes = params.location.state.selectedProduct.sizeList;
            productColor = params.location.state.selectedColor;
            category = params.location.state.selectedProduct.category;
        }

        let row = {
            guid: uuidv4(),
            name: productName,
            price: productPrice,
            productType: productId,
            qty: 1,
            weight: productWeight,
            size: selectedSize,
            description: productDesc,
            image: productWithImage.image,
            product: productWithImage.product,
            color: productColor,
            category: category,
            availableSizes: availableSizes,
        }

        // TODO: If user is logged, send this information to the cloud

        add(row).then(

            // Accept
            event => {
                console.log('Product added to the cart! ' + event);
                localStorage.setItem('cartLastUpdate', Date.now());
            },

            // Reject
            error => {
                // TODO: Maybe, if there is a server-side persisting of the cart,
                // retrive it and update the local storage? This must be confirmed.
                setShowError(true);
                setErrorMsg('Something went wrong. Please, try again.');
                console.log(error);
            }
        );
    }

    // END Methods ---------------------------------------------------------------------------------

    // Render Methods ------------------------------------------------------------------------------

    const renderContent = () => {

        let isMerchandise = params && 
        params.location && 
        params.location.state && 
        params.location.state.selectedProduct && 
        params.location.state.selectedProduct.category &&
        params.location.state.selectedProduct.category.printingType._id == '606dd5141d92c0793269d682' ? true : false;

        isMerchandise = printingType && printingType == '606dd5141d92c0793269d682' ? true : isMerchandise;

        let selectedColor = 'default';

        if (params && params.location && params.location.state && params.location.state.selectedColor)
        {
            selectedColor = params.location.state.selectedColor;
        }

        if (showError === false)
        {
            return (
                <div className="container">
                    <Iframe 
                        url={Config.FPD_URL+`${isMerchandise ? 'm/' : '/'}`+`${editProductId ? 1 : 0}/${productId}/${selectedColor}`}
                        styles={{border:"none", height:"600px"}}
                        width="100%"
                        height="800px"
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
        else
        {
            return (
                <div className="htc__login__register bg__white ptb--90" >
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="bradcaump__inner text-center">
                                    <h2>{errorMsg}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
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

export default Design;