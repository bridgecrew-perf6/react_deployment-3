// Core Imports
import React, { useState, useEffect, useRef, Fragment } from "react";

// Custom Component Imports
import Alert from '../../common/Alert';

// Function Imports
import { isAuthenticated } from "../../auth/functions";

// API Imports
import { createView, updateView } from "../../APICalls";

// TODO: Explanation
const ViewForm = ({ 
        productId,
        selectedView,
        numberOfViews,
        onDataTableSuccess,
        onReloadViews,
        onSetModalOpen,
        modalOpen,
    }) => {

    // Initial State
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [mainView, setMainView] = useState(false);
    const [formData, setFormData] = useState(new FormData());
    const [modalTitle, setModalTitle] = useState('New View');
    const [btnName, setBtnName] = useState('Add');
    const [error, setError] = useState(false);
    const imgInputRef = useRef(null);
    const imgBaseInputRef = useRef(null);
    const imgShadowsInputRef = useRef(null);
    const imgHighlightsInputRef = useRef(null);

    const { token } = isAuthenticated();

    // React Effects -------------------------------------------------------------------------------

    useEffect(() => {

        setError(false);

    },[name, price, mainView]);

    useEffect(() => {

        if (selectedView)
        {
            setName(selectedView.name);
            setPrice(selectedView.price);
            setModalTitle("Edit View");
            setBtnName("Save");
            setMainView(selectedView._id == selectedView.product.mainView);
        }
        else
        {
            setName('');
            setPrice('');
            setModalTitle("Add New Modal");
            setBtnName("Add");
            setMainView(false);
        }

    },[selectedView]);

    // END React Effects ---------------------------------------------------------------------------


    // Event Methods -------------------------------------------------------------------------------

    const clickSubmit = e => {

        e.preventDefault();
        setError(false);
        formData.set('product', productId);

        if (selectedView)
        {
            updateView(selectedView._id, token, productId, formData).then(data => { 

                if (data.error)
                {
                    setError(data.error.description);
                    onDataTableSuccess(false);
                }
                else
                {
                    setName('');
                    setPrice('');

                    if(imgInputRef.current)
                    {
                        imgInputRef.current.value = null;
                    }

                    if(imgBaseInputRef.current)
                    {
                        imgBaseInputRef.current.value = null;
                    }

                    if (imgShadowsInputRef.current)
                    {
                        imgShadowsInputRef.current.value = null;
                    }

                    if(imgHighlightsInputRef.current)
                    {
                        imgHighlightsInputRef.current.value = null;
                    }

                    setFormData(new FormData());
                    onDataTableSuccess("View Updated");
                    onReloadViews(mainView ? selectedView._id : null);
                    onSetModalOpen(false);
                    setMainView(false);
                }
            });
        }
        else
        {
            createView(token, productId, formData).then(data => { 
                
                if (data.error)
                {
                    setError(data.error.description);
                    onDataTableSuccess(false);
                }
                else
                {
                    setName('');
                    setPrice('');

                    if(imgInputRef.current)
                    {
                        imgInputRef.current.value = null;
                    }

                    if(imgBaseInputRef.current)
                    {
                        imgBaseInputRef.current.value = null;
                    }

                    if(imgShadowsInputRef.current)
                    {
                        imgShadowsInputRef.current.value = null;
                    }

                    if(imgHighlightsInputRef.current)
                    {
                        imgHighlightsInputRef.current.value = null;
                    }
                    
                    setFormData(new FormData());
                    onDataTableSuccess("View Created");
                    onReloadViews(mainView ? data._id : null);
                    onSetModalOpen(false);
                    setMainView(false);
                }
            });
        }   
    };

    // END Event Methods ---------------------------------------------------------------------------

    // Main Render
    return (
        <Fragment> 
            <div class="modal-backdrop fade in" style={{ display: modalOpen ? '' : 'none' }}></div>
            <div className={`modal fade in`} id="categoryModal" role="dialog" aria-labelledby="myModalLabel" style={{ display: modalOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button 
                                type="button" 
                                className="close" 
                                onClick={() => {
                                    onSetModalOpen(false);
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
                        </div>
                            <div className="form-row row">
                                <div className={`form-group col-xs-12 col-sm-8 col-lg-8`}>
                                    <label htmlFor="name" className="normal-label">View Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control input-file" 
                                        id="name" 
                                        placeholder="Enter View name" 
                                        onChange={e => {
                                            setName(e.target.value);
                                            formData.set('name', e.target.value);
                                        }}
                                        value={name}
                                        autoFocus
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <div className="form-group col-xs-12 col-sm-4 col-lg-4">
                                        <label htmlFor="price" className="normal-label">Price</label>
                                        <input 
                                            type="number" 
                                            className="form-control input-file" 
                                            id="price" 
                                            step="any" 
                                            placeholder="Enter view price" 
                                            onChange={e => {
                                                setPrice(e.target.value);
                                                formData.set('price', e.target.value);
                                            }}
                                            value={price}
                                        />
                                    </div>                            
                                                        
                                </div>

                                <div className="form-group col-xs-12 col-sm-6 col-lg-6">
                                    <label htmlFor="image" className="normal-label">View Image Preview</label>
                                    <input 
                                        type="file" 
                                        className="form-control input-file" 
                                        id="image" 
                                        accept="image/*"
                                        placeholder="Enter view image preview"
                                        ref={imgInputRef}
                                        onChange={e => {
                                            let fileExtension = e.target.files[0].name.split('.').pop();
                                            formData.set('image', e.target.files[0],`preview.${fileExtension}`);                                      
                                        }}
                                    />
                                </div>

                                <div className="form-group col-xs-12 col-sm-6 col-lg-6">
                                    <label htmlFor="imageBase" className="normal-label">View Image Base</label>
                                    <input 
                                        type="file" 
                                        className="form-control input-file" 
                                        id="imageBase" 
                                        accept="image/*"
                                        placeholder="Enter view image base"
                                        ref={imgBaseInputRef}
                                        onChange={e => {
                                            let fileExtension = e.target.files[0].name.split('.').pop();
                                            formData.set('imageBase', e.target.files[0],`base.${fileExtension}`);                                      
                                        }}
                                    />
                                </div>

                                <div className="form-group col-xs-12 col-sm-6 col-lg-6">
                                    <label htmlFor="imageShadows" className="normal-label">View Image Shadows</label>
                                    <input 
                                        type="file" 
                                        className="form-control input-file" 
                                        id="imageShadows" 
                                        accept="image/*"
                                        placeholder="Enter view image shadows"
                                        ref={imgShadowsInputRef}
                                        onChange={e => {
                                            let fileExtension = e.target.files[0].name.split('.').pop();
                                            formData.set('imageShadows', e.target.files[0],`shadows.${fileExtension}`);
                                        }}
                                    />
                                </div>

                                <div className="form-group col-xs-12 col-sm-6 col-lg-6">
                                    <label htmlFor="imageHighlights" className="normal-label">View Image Highlights</label>
                                    <input 
                                        type="file" 
                                        className="form-control input-file" 
                                        id="imageHighlights" 
                                        accept="image/*"
                                        placeholder="Enter view image highlights"
                                        ref={imgHighlightsInputRef}
                                        onChange={e => {
                                            let fileExtension = e.target.files[0].name.split('.').pop();
                                            formData.set('imageHighlights', e.target.files[0],`highlights.${fileExtension}`);                                    
                                        }}
                                    />
                                </div>
                                
                                <div className="checkbox form-group col-xs-6 col-sm-6 col-lg-6">
                                    <label className="checkbox" style={{"padding-left": "0px"}}>
                                        Set this as main view
                                        <input 
                                            style={{"margin-left": "10px", "margin-top": "5px"}}
                                            type="checkbox" 
                                            checked={mainView}
                                            name="mainView"
                                            onChange={e => {
                                                setMainView(e.target.checked);                                         
                                                formData.set('mainView', e.target.checked);
                                            }}
                                            disabled={selectedView && selectedView._id == selectedView.product.mainView}
                                        />                                        
                                    </label>
                                </div>
                            </div> 
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-default" 
                                onClick={() => {
                                    onSetModalOpen(false);
                                }}  
                            >Cancel</button>
                            <button 
                                type="button" 
                                className="btn btn-dark"
                                onClick={clickSubmit}
                            >{btnName}</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ViewForm;