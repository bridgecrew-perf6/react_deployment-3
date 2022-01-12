// Core Imports
import React, { useState, useEffect, Fragment } from "react";
import DataTable from 'react-data-table-component';
import moment from 'moment';

// Custom Component Imports
import OrderForm from './OrderForm';
import Alert from '../../common/Alert';

// API Imports
import { getOrders } from "../../APICalls";

// TODO: Explanation
const OrderDataTable = () => {

    // Inti state
    const [orders, setOrders] = useState('');
    const [selectedOrder, setSelectedOrder] = useState('');
    const [filterStatus, setFilterStatus] = useState('open');
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
            name: 'Quantity',
            width: '100px',
            selector: 'order_qty',
            sortable: true
        },
        {
            name: 'Order Total',
            selector: 'order_total',
            sortable: true,
            cell: row => <div>${row.order_total.toFixed(2)}</div>
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

        console.log(moment());

        loadOrders();

    }, []);   
    
    useEffect(() => {
    
        if (orders)
        {
            const items = orders.filter(item => item.status === filterStatus || filterStatus === 'all');
            setFilteredItems(items);
        }

    }, [filterStatus, orders]);

    // END React Effects ---------------------------------------------------------------------------

    // Methods -------------------------------------------------------------------------------------

    const loadOrders = () => {

        getOrders().then(orderData => {

            if (orderData.error)
            {
                //setError(orderData.error);
            }
            else
            {
                setOrders(orderData);
            }
        });
    }

    // END Methods ---------------------------------------------------------------------------------

    // Events --------------------------------------------------------------------------------------

    // END Events ----------------------------------------------------------------------------------

    // Render Methods ------------------------------------------------------------------------------

    const actionsBtns = row => (
        <>
            <button 
                type="button"
                title="View Details"
                className="btn btn-default btn-sm btn-icon" 
                data-toggle="modal" 
                data-target="#orderSelectedModal"
                aria-label="view" 
                onClick={() => {
                    setSelectedOrder(row);
                }}
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
                onClick={() => {
                    setSelectedOrder(row);
                }}
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

    // END Render Methods --------------------------------------------------------------------------

    // Main render
    return (
        <Fragment>
            <OrderForm selectedOrder={selectedOrder} />
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
        </Fragment>
    );
}

export default OrderDataTable;