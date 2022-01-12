// Core Imports
import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';

// Custom Component Imports
import CategoryForm from './CategoryForm';
import Alert from '../../common/Alert'

// Selector Imports
import { isAuthenticated } from '../../auth/functions';

// API Imports
import { getCategories, deleteCategory } from '../../APICalls';

// TODO: Explanation
const CategoryDataTable = () => {

    // Init state
    const [categories, setCategories] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');
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
            name: 'Description',
            selector: 'descr',
            sortable: true
        },{
            name: 'Actions',
            cell: row => actionsBtns(row),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }        
    ];

    // React Effects -------------------------------------------------------------------------------

    useEffect(() => {

        loadCategories();

    }, []);

    useEffect(() => {

        if (categories)
        {
            const items = categories.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
            setFilteredItems(items);
        }

    },[filterText,categories]);

    // END React Effects ---------------------------------------------------------------------------

    // Methods -------------------------------------------------------------------------------------

    const loadCategories = () =>{

        getCategories().then(data => {

            if (data.error)
            {
                //TODO: set error on loading categories list
                //setError(data.error);
            }
            else
            {
                setCategories(data);
            }
        });
    }

    // END Methods ---------------------------------------------------------------------------------

    // Events --------------------------------------------------------------------------------------

    const clickDelete = categoryId => {

        deleteCategory(token, categoryId).then(data => {

            if (data.error)
            {
                setDataTableError(data.error.description);
            }
            else
            {
                loadCategories();
                setDataTableSuccess("Category Deleted");
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
                onClick={() => setSelectedCategory(row)}>
                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>
            &nbsp;&nbsp;
            <button 
                type="button"
                className="btn btn-default btn-sm btn-icon" 
                aria-label="edit" 
                onClick={() => {
                    setSelectedCategory(row);
                    setModalOpen(true);
                }}>
                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>
        </>
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
                            {selectedCategory && `Do you want to delete category ${selectedCategory.name}?`}
                        </div>
                        <div className="modal-footer">
                            <button  type="button" className="btn btn-default"  data-dismiss="modal">Cancel</button>
                            <button 
                                type="button" 
                                className="btn btn-dark"
                                data-dismiss="modal"
                                onClick={() => clickDelete(selectedCategory._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const FilterComponent = ( filterText ) => (            
        <div className="">
            <div className="input-group">                
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Name" 
                    aria-describedby="sizing-addon2"
                    value={filterText} 
                    onChange={e => setFilterText(e.target.value)}
                    style={{borderRadius:'0'}} 
                />
                <span className="input-group-addon" id="sizing-addon2" style={{borderRadius:'0'}}>Search</span>
            </div>
        </div>
    );

    const BtnNew = () => (
        <div className="">
            <div className="text-right">
                <button 
                    type="button" 
                    className="btn btn-dark dashboard-container-button" 
                    onClick={() => {
                        setSelectedCategory(null);
                        setModalOpen(true);
                    }}
                    aria-label="new" 
                >
                    New Category
                </button>
            </div>
        </div> 
    );

    // END Render Methods --------------------------------------------------------------------------

    // Main Render
    return (
        <Fragment> 
            {modalDeleteConfirm()}
            <CategoryForm 
                selectedCategory={selectedCategory}      
                onDataTableError = {(value) => setDataTableError(value)}
                onDataTableSuccess = {(value) => setDataTableSuccess(value)}
                onReloadCategories = {() => loadCategories()}
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
                defaultSortField="name"
                pagination
                highlightOnHover
                pointerOnHover
                subHeader
                subHeaderComponent={[BtnNew(), FilterComponent()]}
            />
        </Fragment>
    );  
}

export default CategoryDataTable;