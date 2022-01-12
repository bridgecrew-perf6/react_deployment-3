// Core Imports
import React, { useState, useEffect, Fragment } from "react";
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

// Custom Component Imports
import ProductForm from './ProductForm';
import Alert from '../../common/Alert';

// Function Imports
import { isAuthenticated } from "../../auth/functions";

// API Imports
import { getProducts, deleteProduct } from "../../APICalls";

// TODO: Explanation
const ProductDataTable = () => {

    // Inti state
    const [products, setProducts] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [filterText, setFilterText] = useState('');
    const [filteredItems, setFilteredItems] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [dataTableError, setDataTableError] = useState(false);
    const [dataTableSuccess, setDataTableSuccess] = useState(false);

    const { token } = isAuthenticated();

    // Initial columns configuration
    const columns = [
       
        {
            name: 'Category',
            sortable: true,
            cell: row => <div>{row.category.name}</div>
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true
        },
       
        {
            name: 'Actions',
            cell: row => actionsBtns(row),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }       
    ];  

    // React Effects -------------------------------------------------------------------------------

    useEffect(() => {

        loadProducts();

    }, []);   
    
    useEffect(() => {
        
        if (products)
        {
            const items = products.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
            setFilteredItems(items);
        }

    },[filterText,products]);

    // END React Effects ---------------------------------------------------------------------------

    // Methods -------------------------------------------------------------------------------------

    const loadProducts = () => {

        getProducts().then(productData => {

            if (productData.error)
            {
                //setError(productData.error);
            }
            else
            {
                setProducts(productData);
            }
        });
    }

    // END Methods ---------------------------------------------------------------------------------

    // Events --------------------------------------------------------------------------------------

    const clickDelete = productId => {

        deleteProduct(token, productId).then(data => {

            if (data.error)
            {
                setDataTableError(data.error.description);
            }
            else
            {
                loadProducts();
                setDataTableSuccess("Worker Deleted");
            }
        });
    }

    // END Events ----------------------------------------------------------------------------------

    // Render Methods ------------------------------------------------------------------------------

    const actionsBtns = row => (
        <>
            <button 
                type="button"
                className="btn btn-default btn-sm btn-icon" 
                data-toggle="modal" 
                data-target="#deleteModal"
                aria-label="remove" 
                onClick={() => {
                    setSelectedProduct(row);
                }}>
                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>
            &nbsp;&nbsp;
            <button 
                type="button"
                className="btn btn-default btn-sm btn-icon" 
                aria-label="edit" 
                onClick={() => {
                    setSelectedProduct(row);
                    setModalOpen(true);
                }}>
                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>
           
        </>
    );

    const BtnNew = () => (
        <div className="">
            <div className="text-right">
                <button 
                    type="button" 
                    className="btn btn-dark dashboard-container-button" 
                    onClick={() => {
                        setSelectedProduct(null);
                        setModalOpen(true);
                    }}
                    aria-label="new" 
                >New Worker</button>
            </div>
        </div> 
    );

    const modalDeleteConfirm = () => {
        return(
            <div className="modal fade" id="deleteModal" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="myModalLabel">Delete Confirmation</h4>
                    </div>
                    <div className="modal-body">
                        {selectedProduct && `Do you want to delete worker ${selectedProduct.name}?`}
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-default" 
                            data-dismiss="modal"
                        >Cancel</button>
                        <button 
                            type="button" 
                            className="btn btn-dark"
                            data-dismiss="modal"
                            onClick={() => {
                                clickDelete(selectedProduct._id);
                            }}
                        >Delete</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    const FilterComponent = ( filterText ) => (
        <>
          <div className="input-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Worker Name" 
                    ariaDescribedby="sizing-addon2"
                    value={filterText} 
                    onChange={e => setFilterText(e.target.value)}
                    style={{borderRadius:'0'}} 
                />
                <span className="input-group-addon" id="sizing-addon2" style={{borderRadius:'0'}} >Search</span>
            </div>
        </>
    );

    // END Render Methods --------------------------------------------------------------------------

    // Main render
    return (
        <Fragment>  
            {modalDeleteConfirm()}
            <ProductForm 
                selectedProduct={selectedProduct}
                onDataTableError = {(value) => setDataTableError(value)}
                onDataTableSuccess = {(value) => setDataTableSuccess(value)}
                onReloadProducts = {() => loadProducts()}
                onSetModalOpen = {(value) => setModalOpen(value)}
                modalOpen={modalOpen}
            />
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
                defaultSortField="printingType"
                pagination
                highlightOnHover
                pointerOnHover
                subHeader
                subHeaderComponent={[BtnNew(),FilterComponent()]}
            />
        </Fragment>
    );
}

export default ProductDataTable;