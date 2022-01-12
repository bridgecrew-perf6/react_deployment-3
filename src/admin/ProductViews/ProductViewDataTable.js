// Core Imports
import React, { useState, useEffect, Fragment } from "react";
import DataTable from 'react-data-table-component';

// Custom Component Imports
import Alert from '../../common/Alert';
import ViewForm from './ViewForm.js';

// Function Imports
import { isAuthenticated } from "../../auth/functions";

// API Imports
import { getViews, deleteView } from "../../APICalls";

// TODO: Explanation
const ProductViewDataTable = (props) => {

    let { productId } = props;

    // Initial State
    const [views, setViews] = useState('');
    const [selectedView, setSelectedView] = useState('');
    const [filterText, setFilterText] = useState('');
    const [filteredItems, setFilteredItems] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [dataTableError, setDataTableError] = useState(false);
    const [dataTableSuccess, setDataTableSuccess] = useState(false);
    const { token } = isAuthenticated();

    // Initial columns configuration
    const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true
        },
        {
            name: 'Price',
            selector: 'price',
            sortable: true
        },
        {
            name: 'Main View',
            cell: row => (
                <div style={{ marginLeft: 20 }}>
                    <input type="checkbox" checked={row.product.mainView == row._id} />
                </div>
            ),
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

        loadViews();

    }, []);

    useEffect(() => {

        if (views)
        {
            const items = views.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
            setFilteredItems(items);
        }

    },[filterText,views]);

    // END React Effects ---------------------------------------------------------------------------
    
    // Methods -------------------------------------------------------------------------------------

    const loadViews = () => {

        getViews(token, productId).then(viewData => {
            
            if (viewData.error)
            {
                //setError(viewData.error);
            }
            else
            {
                let newDataArray = [];

                viewData.forEach(productView => {
                                    
                    if (productView._id == productView.product.mainView)
                    {
                        newDataArray.unshift(productView);
                    }
                    else
                    {
                        newDataArray.push(productView);
                    }
                });

                setViews(newDataArray);
            }
        });
    }

    // END Methods ---------------------------------------------------------------------------------
    
    // Event Methods -------------------------------------------------------------------------------

    const clickDelete = viewId => {

        deleteView(token,productId, viewId).then(data => {

            if (data.error)
            {
                setDataTableError(data.error.description);
            }
            else
            {
                loadViews();
                setDataTableSuccess("View Deleted");
            }
        });
    }

    // END Event Methods ---------------------------------------------------------------------------

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
                    setSelectedView(row);
                }}>
                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>
            &nbsp;&nbsp;
            <button 
                type="button"
                className="btn btn-default btn-sm btn-icon" 
                aria-label="edit" 
                onClick={() => {
                    setSelectedView(row);
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
                        setSelectedView(null);
                        setModalOpen(true);
                    }}
                    aria-label="new" 
                >New Product View</button>
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
                        {selectedView && `Do you want to delete view ${selectedView.name}?`}
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
                                clickDelete(selectedView._id);
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
                    placeholder="View Name" 
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
            <ViewForm 
                productId={productId}
                selectedView={selectedView}
                numberOfViews={views.length}
                onDataTableError = {(value) => setDataTableError(value)}
                onDataTableSuccess = {(value) => setDataTableSuccess(value)}
                onReloadViews = {() => loadViews()}
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

export default ProductViewDataTable;