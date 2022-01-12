// Core Imports
import React, { useEffect, useState, Fragment } from 'react';
import imagesLoaded from 'imagesloaded';
import Isotope from 'isotope-layout';
import { NavLink } from 'react-router-dom';
import QRCode from 'qrcode.react';
import * as R from 'ramda';

///For datatable
import DataTable from 'react-data-table-component';
import moment from 'moment';
import Alert from '../common/Alert';

// Rich Text Editor
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactHtmlParser from 'react-html-parser';
import 'react-tabs/style/react-tabs.css';


// API Imports
import { getCategories, getProducts, getRatings, deleteRating, getOrdersByWorker, getProductByLogin } from '../APICalls';

// Misc Imports
import Config from '../config';

// Selector Imports
import { isAuthenticated } from '../auth/functions';

// TODO: Explanation
const ShoppingSection = ({ printingTypeId }) => {

    // Initial state
    const [loading, setLoading] = useState(true);
    const [itemsFiltered, setItemsFiltered] = useState(0);
    const [isotope, setIsotope] = useState(null);
    const [filterKey, setFilterKey] = useState("*");
    const [categories, setCategories] = useState('');
    const [products, setProducts] = useState('');
    const [productsRatings, setProductsRatings] = useState('');
    const [ordersByWorker, setOrdersByWorker] = useState('');
    const [selectedProduct, setSelectedProduct] = useState({});
    const [activeIndex, setActiveIndex] = useState("*");
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    let navRef = React.createRef();
    const { user, token } = isAuthenticated();
    ////For datatable
 
    const [filterStatus, setFilterStatus] = useState('all');
    const [filteredItems, setFilteredItems] = useState('');
    const [dataTableError, setDataTableError] = useState(false);
    const [dataTableSuccess, setDataTableSuccess] = useState(false);

    const translateStatus = (status) => {

        let color = '#18cc1b';
        let translate = '';

        switch(status)
        {
            case 'open': translate = 'Open'; break;
            case 'pending_payment': 
                translate = 'Pending for Payment';
                color = '#f77700';
            break;
            case 'completed': 
                translate = 'Completed';
                color = '#0d7c0f';
            break;
            case 'canceled': 
                translate = 'Canceled';
                color = '#e50909';
            break;
        }

        return (
            <div>
                <span style={{ color: color, fontWeight: 500 }}>{translate}</span>
            </div>
        )
    }

    // Initial columns configuration
    const columns = [
        {
            name: 'Order Number',
            width: '220px',
            cell: row => <div>{row._id}</div>,
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            cell: row => translateStatus(row.status),
        },
        {
            name: 'Is Paid',
            width: '100px',
            selector: 'is_paid',
            sortable: true,
            cell: row => row.is_paid ? <div>Paid</div> : <div>Not Paid</div>
        },
        {
            name: 'Order Date',
            selector: 'order_date',
            sortable: true,
            cell: row => <div>{moment(row.order_date).format('DD-MM-YYYY hh:mm A')}</div>
        },
        {
            name: 'Order Total',
            selector: 'order_total',
            sortable: true,
            cell: row => <div>${row.order_total.toFixed(2)}</div>
        },
        
    ];  

    // React Effects -------------------------------------------------------------------------------

    
    
    useEffect(() => {
    
        if (ordersByWorker)
        {
            const items = ordersByWorker.filter(item => item.status === filterStatus || filterStatus === 'all');
            setFilteredItems(items);
        }

    }, [filterStatus, ordersByWorker]);

    useEffect(() => {

        getCategories(printingTypeId).then(data => {

            if (data.error) {
                //setError(data.error);
                //TODO: mostrar mensaje de error
            }
            else {
                setCategories(data);
            }
        });

        if (user && user.role == 'admin') {
            getProducts(printingTypeId).then(data => {

                if (data.error) {
                    //setError(data.error);
                    //TODO: mostrar mensaje de error
                }
                else {
                    setProducts(data);
                }
            });
        };
        
        if (user && user.role == 'worker') {
           //console.log(user._id)
            getProductByLogin(user._id).then(data => {

                if (data.error) {
                    //setError(data.error);
                    //TODO: mostrar mensaje de error
                }
                else {
                    setProducts(data);
                }
            });
        };
        if (user  == undefined) {
            setLoading(false);
            //TODO
            /*getProductByLogin(owner_user_id).then(data => {

                if (data.error) {
                    //setError(data.error);
                    //TODO: mostrar mensaje de error
                }
                else {
                    setProducts(data);
                }
            });*/
        };



    }, [printingTypeId]);

    useEffect(() => {

        if (products) {
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

    }, [products]);

    // handling filter key change
    useEffect(() => {

        if (isotope) {
            filterKey === "*" ? isotope.arrange({ filter: `*` }) : isotope.arrange({ filter: `.${filterKey}` });
            setItemsFiltered(isotope.filteredItems.length);
        }

    }, [isotope, filterKey]);

    useEffect(() => {
        if (
            Object.entries(selectedProduct).length === 0) {
            return;
        }

        updateStars(selectedProduct);
        getRatings(selectedProduct._id).then(data => {
            if (data.error) {
                //setError(data.error);
                //TODO: mostrar mensaje de error
            }
            else {
                setProductsRatings(data);
            }
        });
        getOrdersByWorker(selectedProduct._id).then(data => {
            if (data.error) {
                //setError(data.error);
                //TODO: mostrar mensaje de error
            }
            else {
                console.log('selectdProduct:', selectedProduct._id,'OrdersByWorker1111:', data.orders)
                setOrdersByWorker(data.orders);
            }
        });


    }, [selectedProduct]);

    // END React Effects ---------------------------------------------------------------------------

    // Methods -------------------------------------------------------------------------------------

    imagesLoaded('.product__list', function () {
        if (isotope) {
            isotope.layout();
            setLoading(false);
        }
    });


    // END Methods ---------------------------------------------------------------------------------

    // Events -------------------------------------------------------------------------------------- 

    const removeReview = (rating) => {

        deleteRating(token, rating.product, rating.user._id).then(data => {
            console.log('removed DATA', data)
            if (data.error) {
                //setError(data.error);
                //TODO: mostrar mensaje de error
            }
            else {
                getRatings(selectedProduct._id).then(data => {
                    if (data.error) {
                        //setError(data.error);
                        //TODO: mostrar mensaje de error
                    }
                    else {
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

    /// Render Methods ---------------------------------------------------------------------------

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

                    )
                })}
                {ratings && ratings.diffStarArray.map(star => {
                    return (
                        <li><span className="ti-star" style={{ color: '#f8cd35' }}></span></li>
                    )
                })}
            </span>
        )
    }

    const actionsBtns = row => (
        <>
            <button 
                type="button"
                title="View Details"
                className="btn btn-default btn-sm btn-icon" 
                data-toggle="modal" 
                data-target="#orderSelectedModal"
                aria-label="view" 
                
            >
                <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
            </button>
            &nbsp;&nbsp;
            <button 
                type="button"
                title="Change Status"
                className="btn btn-default btn-sm btn-icon" 
                data-toggle="modal" 
                data-target="#categoryModal"
                aria-label="edit"
                
            >
                <span className="glyphicon glyphicon-tag" aria-hidden="true"></span>
            </button>
        </>
    );

    const FilterComponent = () => (
        <>
            <div className="input-group">
                <label for="filterByStatus">Filter by Status: </label>
                <select name="filterByStatus" className="form-control" defaultValue={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value='all'>All</option>
                    <option value='pending_payment'>Pending for Payment</option>
                    <option value='open'>Open</option>
                    <option value='completed'>Completed</option>
                    <option value='canceled'>Canceled</option>
                </select>
            </div>
        </>
    );

    // End Render Methods  ----------------------------------------------------------------------

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
                                    <img src={window.location.origin + "/images/icons/ajax-loader.gif"} alt="loading" />
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
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                //e.target.src="images/product/1.png"
                                                            }}
                                                            alt="Product Image"
                                                            style={{ maxHeight: '120px', maxWidth: '120px', height: '100px', width: '100px' }}
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="product__details" style={{ paddingTop: 5 }}>
                                                <h2 style={{ fontSize: 16 }}>
                                                    <a href="#!" data-toggle="modal" data-target="#productModal">{product.name}</a>
                                                </h2>

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
                                        <img
                                            src={`${Config.API}/${selectedProduct.imageURL}`}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                //e.target.src="images/product/1.png"
                                            }}
                                            alt="Product Image"
                                            style={{ maxHeight: '300px', maxWidth: '300px' }}
                                        />
                                        <QRCode value={`https://tiptiptop1.herokuapp.com/checkout?worker=${selectedProduct._id}`} size="79" />
                                    </div>

                                    <div className="product-info">
                                        <h1>{selectedProduct.name}</h1>
                                        <div className="rating__and__review">
                                            {selectedProduct.rateCount > 0 &&
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
                                            Category
                                            <div><b>
                                                {selectedProduct.category &&
                                                    selectedProduct.category.name
                                                }
                                            </b> </div>
                                        </div>


                                        {/*<div className="start-designing-btn">
                                            <a
                                                href='#!'
                                                data-dismiss="modal"
                                            //onClick={() => navRef.current.click() }
                                            >
                                                {selectedProduct && selectedProduct.category && selectedProduct.category.printingType._id == '606dd5141d92c0793269d682' ? 'View Designing' : 'Print QR'}
                                            </a>
                                        </div>

                                        <div className="start-designing-btn">
                                            <a
                                                href='#!'
                                                data-dismiss="modal"
                                            //onClick={() => navRef.current.click() }
                                            >
                                                {selectedProduct && selectedProduct.category && selectedProduct.category.printingType._id == '606dd5141d92c0793269d682' ? 'View Designing' : 'Add Tip'}
                                            </a>
                                            </div>*/}
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
                            <div className="wrapper" style={{ marginTop: '4%' }}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12" style={{ overflow: 'hidden', marginTop: '20px', width: '96.3%' }}>
                                            <Tabs>
                                                <TabList>
                                                    <Tab>Description</Tab>
                                                    <Tab>Reviews</Tab>
                                                    <Tab>My Tip History</Tab>
                                                </TabList>
                                                <TabPanel className="ck-editor">
                                                    <div className="wrapper" style={{ marginTop: '0%' }}>
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-12" style={{ minHeight: '25px', marginLeft: '5px', marginBottom: '30px', width: '92%', overflow: 'auto' }}>
                                                                    {selectedProduct.descr ? ReactHtmlParser(selectedProduct.descr) : 'There is no description to display'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPanel>
                                                <TabPanel>
                                                    <div className="wrapper" style={{ marginTop: '0%' }}>
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-12" style={{ minHeight: '25px', overflow: 'auto', marginLeft: '5px', marginRight: '20px', width: '92%' }}>
                                                                    {productsRatings && productsRatings.length === 0 &&
                                                                        <div style={{ marginBottom: '30px' }}>
                                                                            There is no reviews to display
                                                                        </div>
                                                                    }
                                                                    {productsRatings &&
                                                                        productsRatings.map((ratings, i) => (
                                                                            <div key={i} className="testimonial-3-wrapper mb--30">
                                                                                <div className="testimonial-3-content">
                                                                                    <div className="testimonial-3-name">
                                                                                        <div>
                                                                                            {console.log('RATINGS//////',ratings)}
                                                                                            <span style={{ fontSize: 22, fontWeight: 600, marginBottom: '5px', textTransform: 'capitalize', color: '#5c5c5c' }}>{ratings.user ? ratings.user.name : ''}</span>
                                                                                            {user && user.role == 'admin' &&
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
                                                                                    <p style={{ color: '#8f8f8f', fontSize: '15px', fontWeight: 400, marginBottom: '0px' }}>

                                                                                        <div>
                                                                                            {ratings.review[0].dish == 1 &&
                                                                                                <span class="col-xg-1 col-md-1 col-xs-3" >
                                                                                                    <img

                                                                                                        src={window.location.origin + "/images/logo/dish_inactive.png"}
                                                                                                        alt="logo" style={{ height: "30px", maxHeight: "100%" }}
                                                                                                    />
                                                                                                    <span>Dish</span>
                                                                                                </span>
                                                                                            }
                                                                                            {ratings.review[0].atmosphere == 1 &&
                                                                                                <span class="col-xg-1 col-md-1 col-xs-3" >
                                                                                                    <img

                                                                                                        src={window.location.origin + "/images/logo/atmosphere_inactive.png"}
                                                                                                        alt="logo" style={{ height: "30px", maxHeight: "100%" }}
                                                                                                    />
                                                                                                    <span>Atmos</span>
                                                                                                </span>
                                                                                            }
                                                                                            {ratings.review[0].tasty == 1 &&
                                                                                                <span class="col-xg-1 col-md-1 col-xs-3" >
                                                                                                    <img

                                                                                                        src={window.location.origin + "/images/logo/tasty_inactive.png"}
                                                                                                        alt="logo" style={{ height: "30px", maxHeight: "100%" }}
                                                                                                    />
                                                                                                    <span>Tasty</span>
                                                                                                </span>
                                                                                            }
                                                                                            {ratings.review[0].goodService == 1 &&
                                                                                                <span class="col-xg-1 col-md-1 col-xs-3" >
                                                                                                    <img

                                                                                                        src={window.location.origin + "/images/logo/service_inactive.png"} alt="logo"
                                                                                                        style={{ height: "30px", maxHeight: "100%" }}
                                                                                                    />
                                                                                                    <span>Good</span>
                                                                                                </span>
                                                                                            }
                                                                                            <span>&nbsp;</span>
                                                                                        </div>


                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </TabPanel>
                                                <TabPanel className="ck-editor">
                                                    <div className="wrapper" style={{ marginTop: '0%' }}>
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-12" style={{ minHeight: '25px', marginLeft: '5px', marginBottom: '30px', width: '92%', overflow: 'auto' }}>
                                                                    {ordersByWorker == '' &&
                                                                        <div style={{ marginBottom: '30px' }}>
                                                                            There is no reviews to display
                                                                        </div>
                                                                    }
                                                                    {console.log('ordersByWorkers:::',ordersByWorker.length)}
                                                                    {console.log('ordersByWorkers:::',ordersByWorker)}
                                                                    {}
                                                                    {ordersByWorker !== '' &&
                                                                        
                                                                            
                                                                            <div  className="testimonial-3-wrapper mb--30">
                                                                                <div className="testimonial-3-content">
                                                                                    

                                                                                <div className="row">   
                                                                                    <Alert 
                                                                                        error = {dataTableError}
                                                                                        success = {dataTableSuccess}
                                                                                        onError = {(value) => {setDataTableError(value)}}
                                                                                        onSuccess = {(value) => {setDataTableSuccess(value)}}
                                                                                    />
                                                                                </div>
                                                                                <DataTable
                                                                                    columns={columns}
                                                                                    data={filteredItems}
                                                                                    pagination
                                                                                    highlightOnHover
                                                                                    pointerOnHover
                                                                                    subHeader
                                                                                    subHeaderComponent={[FilterComponent()]}
                                                                                />





                                                                                    
                                                                                </div>
                                                                            </div>
                                                                        }
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
