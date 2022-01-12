// Core Imports
import React, { useState, useEffect, Fragment } from "react";

// Custom Component Imports
import Alert from '../../common/Alert';

// Selector Imports
import { isAuthenticated } from "../../auth/functions";

// API Imports
import { createCategory, getPrintingTypes, updateCategory } from "../../APICalls";

// TODO: Explanation
const CategoryForm = ({ 
        selectedCategory,
        onDataTableSuccess,
        onReloadCategories,
        onSetModalOpen,
        modalOpen
    }) => {

    // Init state
    const [name, setName] = useState('');
    const [descr, setDescr] = useState('');
    const [printingType, setPrintingType] = useState('');
    const [printingTypeList, setPrintingTypeList] = useState('');
    const [modalTitle, setModalTitle] = useState('New Category');
    const [btnName, setBtnName] = useState('Add');
    const [error, setError] = useState(false);
  
    const { token } = isAuthenticated();

    // React Effects -------------------------------------------------------------------------------

    useEffect(() => {

        getPrintingTypes().then(data => {

            if (data.error)
            {
                setError(data.error);
            }
            else
            {
                setPrintingTypeList(data);
            }
        });       
    }, []);

    useEffect(() => {

        if (selectedCategory)
        {
            setName(selectedCategory.name);
            setDescr(selectedCategory.descr);
            setPrintingType(selectedCategory.printingType._id);
            setModalTitle("Edit Category");
            setBtnName("Save");
        }
        else
        {
            setName('');
            setDescr('');
            setPrintingType('');
            setModalTitle("Add New Category");
            setBtnName("Add");
        }
    },[selectedCategory]);

    useEffect(() => {

        setError(false);  

    },[name,descr,printingType]);

    // END React Effects ---------------------------------------------------------------------------

    // Events --------------------------------------------------------------------------------------

    const clickSubmit = e => {

        e.preventDefault();
        setError(false);

        if (!name || printingType === 0)
        {
            setError("Missing required fields");
            return;
        }

        if (selectedCategory)
        {
            // make request to api to update category
            updateCategory(selectedCategory._id, token, { name, descr, printingType }).then(data => {

                if (data.error)
                {
                    setError(data.error.description);
                    onDataTableSuccess(false);
                }
                else
                {
                    setName("");
                    setDescr("");
                    setPrintingType(0);
                    onDataTableSuccess("Category Updated");
                    onReloadCategories();
                    onSetModalOpen(false);
                }
            });

        }
        else
        {
            // make request to api to create category
            createCategory(token, { name, descr, printingType }).then(data => {

                if (data.error)
                {
                    setError(data.error.description);
                    onDataTableSuccess(false);
                }
                else
                {
                    setName("");
                    setDescr("");
                    setPrintingType(0);
                    onDataTableSuccess("Category Created");
                    onReloadCategories();
                    onSetModalOpen(false);
                }
            });
        }        
    };

    // END Events ----------------------------------------------------------------------------------

    // Main render
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
                                onClick={() => onSetModalOpen(false)}
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
                                <div className={`form-group col-xs-12 col-sm-6 col-lg-6`}>
                                    <label htmlFor="name" className="normal-label">Category Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control " 
                                        id="name" 
                                        placeholder="Enter category name" 
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                        autoFocus
                                        required
                                    />
                                </div>
                                <div className="form-group col-xs-12 col-sm-6 col-lg-6">
                                    <label htmlFor="descr" className="normal-label">Category Description</label>
                                    <input 
                                        type="text" 
                                        className="form-control " 
                                        id="descr" 
                                        placeholder="Enter category description" 
                                        onChange={e => setDescr(e.target.value)}
                                        value={descr}
                                    />
                                </div>
                            
                            </div>
                            
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-default" 
                                onClick={() => onSetModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-dark"
                                onClick={clickSubmit}
                            >
                                {btnName}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default CategoryForm;