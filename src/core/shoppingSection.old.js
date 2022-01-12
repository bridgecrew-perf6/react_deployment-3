// Core Imports
import React, { useEffect, useState, Fragment } from 'react';
import imagesLoaded from 'imagesloaded';
import Isotope from 'isotope-layout';
import { NavLink } from 'react-router-dom';
import * as R from 'ramda';

// Rich Text Editor
import { CKEditor  } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactHtmlParser from 'react-html-parser';
import 'react-tabs/style/react-tabs.css';

// API Imports
import { getCategories, getProducts, getRatings, deleteRating } from '../APICalls';

// Misc Imports
import Config from '../config';

// Selector Imports
import { isAuthenticated } from '../auth/functions';

// TODO: Explanation
const ShoppingSection = ({printingTypeId}) => {    

    // Initial state
    const [loading, setLoading] = useState(true);
    const [itemsFiltered, setItemsFiltered] = useState(0);
    const [isotope, setIsotope] = useState(null);
    const [filterKey, setFilterKey] = useState("*");
    const [categories, setCategories] = useState('');
    const [products, setProducts] = useState('');
    const [productsRatings, setProductsRatings] = useState('');
    const [selectedProduct, setSelectedProduct] = useState({});
    const [activeIndex, setActiveIndex] = useState("*");

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    let navRef = React.createRef();

    const { user, token } = isAuthenticated();

    // React Effects -------------------------------------------------------------------------------

    useEffect(() => {

        getCategories(printingTypeId).then(data => {

            if (data.error)
            {
                //setError(data.error);
                //TODO: mostrar mensaje de error
            }
            else
            {
                setCategories(data);
            }
        });

        getProducts(printingTypeId).then(data => {
            
            if (data.error)
            {
                //setError(data.error);
                //TODO: mostrar mensaje de error
            }
            else
            {   
                setProducts(data);
            }
        });

    }, [printingTypeId]);

    useEffect(() => {

        if (products)
        {
            //Initialize isotope only if products is defined
            setIsotope(
                new Isotope(".product__list",
                {
                    itemSelector: ".single__pro",
                    percentPosition: true,
                    transitionDuration: '0.5s',
                    masonry: {
                        columnWidth: '.single__pro',
                    }
                })
            );
        }

    },[products]);

    // handling filter key change
    useEffect(() => {

        if (isotope)
        {
            filterKey === "*" ? isotope.arrange({ filter: `*` }) : isotope.arrange({ filter: `.${filterKey}` }); 
            setItemsFiltered(isotope.filteredItems.length);
        }

    },[isotope, filterKey]);

    useEffect(() => {

        if(selectedProduct.mainView === undefined || 
            Object.entries(selectedProduct).length === 0 ||
            Object.entries(selectedProduct.mainView).length === 0)
        {
            return;
        }

        let i = 0;
        let canvasContainer = document.getElementById("canvas-container");

        canvasContainer.innerHTML = '';

        let colors = R.filter(color => color === true, selectedProduct.colorList);
        let sizes = R.filter(size => size === true, selectedProduct.sizeList);

        setSelectedColor(Object.keys(colors)[0]);
        setSelectedSize(Object.keys(sizes)[0]);

        for (const key of Object.keys(selectedProduct.mainView).filter(x => x !== '_id')) 
        {
            let canvas = getCanvas(key, i, selectedProduct, `#${Object.keys(colors)[0]}`);
            canvasContainer.appendChild(canvas);

            i++;
        }

        updateStars(selectedProduct);

        getRatings(selectedProduct._id).then(data => {
            if (data.error)
            {
                //setError(data.error);
                //TODO: mostrar mensaje de error
            }
            else
            {
                setProductsRatings(data);
            }
        });

    },[selectedProduct]);

    // END React Effects ---------------------------------------------------------------------------

    // Methods -------------------------------------------------------------------------------------

    imagesLoaded('.product__list', function()
    {
        if (isotope)
        {
            isotope.layout();     
            setLoading(false);       
        }
    });

    const getCanvas = (key, i, selectedProduct, color) => {

        let canvas = document.createElement('canvas');
        canvas.id = `layer${i}`;
        canvas.width = 400;
        canvas.height = 400;
        canvas.style.zIndex = i;
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "10%";
        let context = canvas.getContext('2d');           
        let background = new Image();
        background.src = `${Config.API}/${selectedProduct.mainView[key]}`;

        background.onload = function()
        {
            if (key === "imageBaseURL")
            {
                context.fillStyle = color;
                context.fillRect(0,0,400,400);
                context.globalCompositeOperation = "destination-in";
                context.drawImage(background, 0, 0);
            }
            else
            {
                context.drawImage(background, 0, 0); 
            }
        }
        return canvas;
    }

    const changeCanvasColor = (color) => 
    {
        let canvas = document.getElementById("layer0");
        let canvasContainer = document.getElementById("canvas-container");
        canvas.remove();
        canvas = getCanvas("imageBaseURL", 0, selectedProduct, color);
        canvasContainer.prepend(canvas);

        setSelectedColor(color.substr(1, color.length - 1));
    }

    const changeProductSize = (newSize) => {

        setSelectedSize(newSize);
    }

    // END Methods ---------------------------------------------------------------------------------

    // Events -------------------------------------------------------------------------------------- 

    const removeReview = (rating) => {
        
        deleteRating(token, rating.product, rating.user._id).then(data => {
            console.log('removed DATA',data)
            if (data.error)
            {
                //setError(data.error);
                //TODO: mostrar mensaje de error
            }
            else
            {   
                getRatings(selectedProduct._id).then(data => {
                    if (data.error)
                    {
                        //setError(data.error);
                        //TODO: mostrar mensaje de error
                    }
                    else
                    {
                        setProductsRatings(data);
                    }
                });
            }
        });
    }

    const updateStars = (selectedProduct) => {
        let rateAverage = Math.floor(selectedProduct.rateValue / selectedProduct.rateCount);
        let diffRateAverage = 5 - rateAverage;
        selectedProduct.starArray = [];
        selectedProduct.diffStarArray = [];

        for (let index = 0; index < rateAverage; index++) {
            selectedProduct.starArray.push(index);        
        }

        for (let index = 0; index < diffRateAverage; index++) {
            selectedProduct.diffStarArray.push(index);        
        }
    }

    // END Events ----------------------------------------------------------------------------------

    

    const renderStar = (ratings) => {

        if (!ratings || ratings.rating == 0) return;

        let rateAverage = Math.floor(ratings.rating);
        let diffRateAverage = 5 - rateAverage
        ratings.starArray = [];
        ratings.diffStarArray = [];

        for (let index = 0; index < rateAverage; index++) {
            ratings.starArray.push(index);        
        }

        for (let index = 0; index < diffRateAverage; index++) {
            ratings.diffStarArray.push(index);        
        }

        return (
            <span>
                {ratings && ratings.starArray.map(star => {
                    return (
                        <li><span className="zmdi zmdi-star" style={{ color: '#f8cd35' }}></span></li>

                )})}
                {ratings && ratings.diffStarArray.map(star => {
                    return (
                        <li><span className="ti-star" style={{ color: '#f8cd35' }}></span></li>
                )})}
            </span>
        )
    }
    
    // Main Render
    return (
        <Fragment> 
            <section className="htc__product__area shop__page bg__white">
                <div className="container">
                    <div className="htc__product__container">
                        <div className="row">     
                            <div className="product__menu gutter-btn text-center">
                                <button 
                                    className={activeIndex === "*" ? "is-checked" : null} 
                                    onClick={() => {
                                        setFilterKey("*");
                                        setActiveIndex("*");
                                    }}
                                >
                                    All
                                </button>
                                {categories && categories.map((category, i) => (
                                    <button 
                                        key={i}      
                                        className={activeIndex === i ? "is-checked" : null}
                                        onClick={() => {
                                            setFilterKey(category.name.replace(/\s/g, ""));
                                            setActiveIndex(i);
                                        }}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="row product__list another-product-style">
                            {loading ?
                                (<div className="row mt--60 text-center">
                                    <img src={window.location.origin +"/images/icons/ajax-loader.gif"} alt="loading" />
                                </div>) : ""
                            }

                            {isotope && itemsFiltered === 0 ?
                                (<div className="row mt--60 mb--60 text-center">
                                    <span>No products to show in this category</span>
                                </div>) : ""
                            }
                            
                            {products &&
                                products.map((product, i) => (
                                    <div key={i} className={`${product.category.name.replace(/\s/g, "")} single__pro col-lg-4 col-xl-4 col-md-4 col-sm-6 col-12`} >
                                        <div className="product" style={{ marginTop: 25 }}>
                                            <div className="product__inner">
                                                <div className="pro__thumb">
                                                    <a 
                                                        href="#!"
                                                        data-toggle="modal" 
                                                        data-target="#productModal"
                                                        className="text-center"
                                                        onClick={() => {
                                                            setSelectedProduct(product);
                                                        }}
                                                    >
                                                        <img 
                                                            src={`${Config.API}/${product.imageURL}`} 
                                                            onError={(e)=>{
                                                                e.target.onerror = null; 
                                                                //e.target.src="images/product/1.png"
                                                            }}
                                                            alt="Product Image"
                                                            style={{maxHeight: '400px'}}
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="product__details" style={{ paddingTop: 5 }}>
                                                <h2 style={{ fontSize: 16 }}>
                                                    <a href="#!" data-toggle="modal" data-target="#productModal">{product.name}</a>
                                                </h2>
                                                <ul className="product__price">
                                                    <li style={{fontSize: 14}}>
                                                        <span className="quantity" style={{ color: '#333' }}>Price: </span>
                                                        <span className="shp__price" style={
                                                            {
                                                                marginLeft: 5,
                                                                fontWeight: 500
                                                            }}>${product.price}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}   
                            
                        </div>
                    
                        <div className="row mt--60">
                        
                        </div>
                
                    </div>
                </div>
            </section>
   
            <div id="quickview-wrapper">
              
                <div className="modal fade" id="productModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal__container" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel">Product Information</h4>
                            </div>
                            <div className="modal-body">
                                <div className="modal-product">
                            
                                    <div className="product-images">
                                        <div id="canvas-container" className="main-image images text-center"> 
                                        </div>
                                    </div>
                            
                                    <div className="product-info">
                                            <h1>{selectedProduct.name}</h1>
                                        <div className="rating__and__review">
                                            {selectedProduct.rateCount >0 && 
                                                <ul className="rating">
                                                    {selectedProduct.starArray &&
                                                        selectedProduct.starArray.map((product, i) => (
                                                            <li><span className="zmdi zmdi-star" style={{ color: '#f8cd35' }}></span></li>
                                                    ))}   
                                                    {selectedProduct.diffStarArray &&
                                                        selectedProduct.diffStarArray.map((product, i) => (
                                                            <li><span className="ti-star" style={{ color: '#f8cd35' }}></span></li>
                                                    ))}   
                                                </ul>
                                            }
                                            <div className="reviews">
                                                {selectedProduct.rateCount} customer reviews
                                            </div>
                                        </div>
                                        <div className="s-price-box">
                                            <div className="s-price-box">
                                                <span className="normal-price">${selectedProduct.price}</span>                                              
                                            </div>
                                        </div>
                                        
                                        
                                        <div className="start-designing-btn">
                                            <a
                                                href='#!'
                                                data-dismiss="modal"
                                                onClick={() => navRef.current.click() }
                                            >
                                                {selectedProduct && selectedProduct.category && selectedProduct.category.printingType._id == '606dd5141d92c0793269d682' ? 'View Designing' : 'Start Designing'}
                                            </a>
                                        </div>
                                        <NavLink
                                            ref={navRef}
                                            to={{
                                                pathname: `/design/${selectedProduct._id}`,
                                                state: { selectedColor: selectedColor, selectedSize: selectedSize, selectedProduct: selectedProduct, simom: 123 }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper" style={{marginTop: '4%'}}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12" style={{ overflow: 'hidden', marginTop: '20px', width: '96.3%'}}>
                                            <Tabs>
                                                <TabList>
                                                    <Tab>Description</Tab>
                                                    <Tab>Reviews</Tab>
                                                </TabList>
                                                <TabPanel className="ck-editor">
                                                    <div className="wrapper" style={{marginTop: '0%'}}>
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-12" style={{minHeight: '25px', marginLeft: '5px', marginBottom: '30px', width: '92%', overflow: 'auto'}}>
                                                                    {selectedProduct.descr ? ReactHtmlParser(selectedProduct.descr) : 'There is no description to display'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPanel>
                                                <TabPanel>
                                                    <div className="wrapper" style={{marginTop: '0%'}}>     
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-12" style={{minHeight: '25px', overflow: 'auto', marginLeft: '5px', marginRight: '20px', width: '92%'}}>
                                                                    {productsRatings && productsRatings.length === 0 &&
                                                                        <div style={{marginBottom: '30px'}}>
                                                                            There is no reviews to display
                                                                        </div>
                                                                    }
                                                                    {productsRatings &&
                                                                        productsRatings.map((ratings, i) => (
                                                                            <div key={i} className="testimonial-3-wrapper mb--30">
                                                                                <div className="testimonial-3-content">
                                                                                    <div className="testimonial-3-name">
                                                                                        <div>
                                                                                            <span style={{fontSize: 22, fontWeight: 600, marginBottom: '5px', textTransform: 'capitalize', color: '#5c5c5c'}}>{ratings.user.name}</span> 
                                                                                            {user.role == 'admin' && 
                                                                                                <button 
                                                                                                    type="button" 
                                                                                                    className="close" 
                                                                                                    aria-label="Close" 
                                                                                                    onClick={() => removeReview(ratings)}
                                                                                                >
                                                                                                    <span aria-hidden="true">&times;</span>
                                                                                                </button>
                                                                                            }
                                                                                        </div>
                                                                                        <div className="rating__and__review">
                                                                                            <ul className="rating">
                                                                                                {renderStar(ratings)}
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                    <p style={{color: '#8f8f8f', fontSize: '15px', fontWeight: 400, marginBottom: '0px'}}>{ratings.review}</p>
                                                                                </div>
                                                                            </div>
                                                                    ))}          
                                                                </div>
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                </TabPanel>
                                            
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};  

export default ShoppingSection;
