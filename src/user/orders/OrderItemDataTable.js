// Core Imports
import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import * as R from 'ramda';

// Custom Component Imports
import Alert from '../../common/Alert';

// API Imports
import { getOrderItems } from "../../APICalls";

// TODO: Explanation
const OrderItemDataTable = (props) => {

    // Init state
    const [orderItems, setOrderItems] = useState(props.orderItems);
    const [selectedOrderItem, setSelectedOrderItem] = useState('');
    const [selectedOrderItemReview, setSelectedOrderItemReview] = useState('');
    const [dataTableError, setDataTableError] = useState(false);
    const [dataTableSuccess, setDataTableSuccess] = useState(false);

    // Initial columns configuration
    const columns = [
        {
            name: '#',
            width: '60px',
            cell: row => <div>{row.element}</div>,
        },
        {
            name: 'Product Name',
            minWidth: '300px',
            //selector: 'productName',
            //sortable: true,
            cell: row => <div>{row.item.product_id.name}</div>
        },
        {
            name: 'Price',
            selector: 'price',
            sortable: true,
            cell: row => <div>${row.item.price.toFixed(2)}</div>
        },
        {
            name: 'Quantity',
            selector: 'qty',
            sortable: true,
            cell: row => <div>${row.item.qty}</div>
        },
        {
            name: 'Size',
            width: '60px',
            selector: 'size',
            sortable: true,
            cell: row => <div>{row.item.size}</div>
        },
        {
            name: 'Total',
            sortable: true,
            cell: row => <div>${(row.item.price * row.item.qty).toFixed(2)}</div>
        },
        {
            name: 'Actions',
            cell: row => actionsBtns(row.item),
            ignoreRowClick: false,
            allowOverflow: true,
            button: true
        }
    ];

    // React Effects -------------------------------------------------------------------------------

    useEffect(() => {

        loadOrders();

    }, [props]);

    // END React Effects ---------------------------------------------------------------------------

    // Methods -------------------------------------------------------------------------------------

    const loadOrders = () => {
        
        if (!R.isNil(props.orderID))
        {
            getOrderItems(props.orderID).then(orderItems => {

                if (orderItems.error)
                {
                    //setError(orderItems.error);
                }
                else
                {
                    let newOrderItems = [];
                    let i = 1;
                    orderItems.orderItems.map(e => { 
                        newOrderItems.push({element: i, item: e});
                        i++;
                    })
                    setOrderItems(newOrderItems);
                }
            });
        }
    }

    // END Methods ---------------------------------------------------------------------------------

    const selectCurrentOrderItem = (row) => { 
        setSelectedOrderItemReview('');
        props.selectedOrderItemCBReview(null);
        setSelectedOrderItem(row);
        props.selectedOrderItemCB && props.selectedOrderItemCB(row);
    }

    const selectCurrentOrderItemReview = (row) => {
        setSelectedOrderItem('');
        props.selectedOrderItemCB(null);
        setSelectedOrderItemReview(row);
        props.selectedOrderItemCBReview && props.selectedOrderItemCBReview(row);
    }


    // Events --------------------------------------------------------------------------------------

    // END Events ----------------------------------------------------------------------------------

    // Render Methods ------------------------------------------------------------------------------

    const actionsBtns = row => (
        <>
            <button 
                type="button"
                title="View Product"
                className={`btn ${row._id !== selectedOrderItem._id ? 'btn-default' : 'btn-info'} btn-sm btn-icon`}
                onClick={() => selectCurrentOrderItem(row) }
            >
                <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
            </button>
            &nbsp;&nbsp;
            <button 
                type="button"
                title="Review Product"
                className={`btn ${row._id !== selectedOrderItemReview._id ? 'btn-default' : 'btn-info'} btn-sm btn-icon`}
                data-toggle="modal"
                data-target="#reviewProductModal"
                aria-label="review" 
                onClick={() => selectCurrentOrderItemReview(row) }
            >
                <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
            </button>
        </>
    );

    // END Render Methods --------------------------------------------------------------------------

    // Main render
    return (
        <>
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
                data={orderItems !== undefined ? orderItems : []}
                pagination
                paginationPerPage={5}
                highlightOnHover
                pointerOnHover
                noHeader
                selectableRowsHighlight
            />
        </>
    );
}

export default OrderItemDataTable;