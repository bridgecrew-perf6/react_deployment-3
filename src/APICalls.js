import Config from './config';


// CATEGORIES
export const createCategory = (token, category) => {

    return fetch(`${Config.API}/categories`,
    {
        method: 'POST',
        headers:
        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(category)
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {

        console.log(err);
    });
};

export const getCategories = (printingType) => {

    const URI = printingType ? `${Config.API}/categories?printingType=${printingType}` : `${Config.API}/categories`;

    return fetch(URI,
    {
        method: 'GET'       
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {

        console.log(err);
    });
};

export const updateCategory = (categoryId, token, category) => {

    return fetch(`${Config.API}/categories/${categoryId}`,
    {
        method: "PUT",
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(category)
    })
    .then(response => {

        return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteCategory = (token, productId) => {

    return fetch(`${Config.API}/categories/${productId}`,
    {
        method: 'DELETE',
        headers:
        {
            Accept: 'application/json',
            'x-access-token': token
        }
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {

        console.log(err);
    });
};

// PRODUCTS
export const createProduct = (token, product) => {

    return fetch(`${Config.API}/products`,
    {
        method: 'POST',
        headers:
        {
            Accept: 'application/json',
            'x-access-token': token
        },
        body: product
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {

        console.log(err);
    });
};

export const updateProduct = (productId, token, product) => {

    return fetch(`${Config.API}/products/${productId}`,
    {
        method: "PUT",
        headers:
        {
            Accept: 'application/json',
            'x-access-token': token
        },
        body: product
    })
    .then(response => {

        return response.json();
    })
    .catch(err => console.log(err));
};

////GET PRODUCT BY OWNER USER LOGIN

export const getProductByLogin = (owner_user_id) => {

    const URI =  `${Config.API}/products/login/${owner_user_id}`;
    
    return fetch(URI,
    {
        method: 'GET'       
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {

        console.log(err);
    });
};

///////////////////////

export const getProduct = (productId) => {

    const URI =  `${Config.API}/products/${productId}`;
    
    return fetch(URI,
    {
        method: 'GET'       
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {

        console.log(err);
    });
};

export const getProducts = (printingType) => {

    const URI = printingType ? `${Config.API}/products?printingType=${printingType}` : `${Config.API}/products`;
    
    return fetch(URI,
    {
        method: 'GET'       
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {

        console.log(err);
    });
};



export const deleteProduct = (token, productId) => {

    return fetch(`${Config.API}/products/${productId}`,
    {
        method: 'DELETE',
        headers:
        {
            Accept: 'application/json',
            'x-access-token': token
        }
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {

        console.log(err);
    });
};

//RATINGS
export const getRatings = (productId) => {
    const URI = `${Config.API}/rating/products/${productId}`;
    return fetch(URI,
    {
        method: 'GET'       
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const createRating = (token, ratings) => {
    return fetch(`${Config.API}/rating`, {
        method: "POST",
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(ratings)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteRating = (token, productId, userId) => {
    return fetch(`${Config.API}/rating/products/${productId}/user/${userId}`,
    {
        method: 'DELETE',
        headers:
        {
            Accept: 'application/json',
            'x-access-token': token
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//VIEWS
export const createView = (token, productId, productView) => {

    return fetch(`${Config.API}/products/${productId}/productViews`,
    {
        method: 'POST',
        headers:
        {
            Accept: 'application/json',
            'x-access-token': token
        },
        body: productView
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {

        console.log(err);
    });
};

export const updateView = (viewId, token, productId, productView) => {

    return fetch(`${Config.API}/products/${productId}/productViews/${viewId}`,
    {
        method: "PUT",
        headers:
        {
            Accept: 'application/json',
            'x-access-token': token
        },
        body: productView
    })
    .then(response => {

        return response.json();
    })
    .catch(err => console.log(err));
};

export const getViews = (token,productId) => {

    const URI = `${Config.API}/products/${productId}/productViews`;
    
    return fetch(URI,
    {
        method: 'GET',
        headers:
        {
            Accept: 'application/json',
            'x-access-token': token
        }
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {

        console.log(err);
    });
};

export const deleteView = (token,productId, viewId) => {

    return fetch(`${Config.API}/products/${productId}/productViews/${viewId}`,
    {
        method: 'DELETE',
        headers:
        {
            Accept: 'application/json',
            'x-access-token': token
        }
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {

        console.log(err);
    });
};

// PRINTING TYPES
export const getPrintingTypes = (token) => {

    return fetch(`${Config.API}/printing-types`,
    {
        method: 'GET'       
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {

        console.log(err);
    });
};

// USER
export const updateUser = (userId, token, user) => {

    return fetch(`${Config.API}/users/${userId}`,
    {
        method: "PUT",
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(user)
    })
    .then(response => {

        return response.json();
    })
    .catch(err => console.log(err));
};

export const getUser = (userId, token) => {

    return fetch(`${Config.API}/users/${userId}`,
    {
        method: 'GET',
        headers:
        {
            'Accept': 'application/json',
            'x-access-token': token
        }
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {

        console.log(err);
    });
};

//Orders
export const getOrder = (orderId) => {

    return fetch(`${Config.API}/orderItems/${orderId}`,
    {
        method: 'GET'     
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const getOrderWorker = (orderId) => {

    return fetch(`${Config.API}/orders/${orderId}`,
    {
        method: 'GET'     
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};


export const getOrdersByWorker = (productId) => {

    return fetch(`${Config.API}/orders/products/${productId}`,
    {
        method: 'GET'     
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

//Orders for Admin
export const getOrders = () => {
    
    const URI = `${Config.API}/orders`;
        
    return fetch(URI,
    {
        method: 'GET'       
    })
    .then(response => {   
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};





//Orders for Owners
export const getOrdersByUser = (userId, token) => {
    
    const URI = `${Config.API}/orders/user/${userId}`;
        
    return fetch(URI,
    {
        method: 'GET',
        headers:
        {
            Accept: 'application/json',
            'x-access-token': token
        },
    })
    .then(response => {   
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};


export const getOrderItems = (orderID) => {
    
    const URI = `${Config.API}/orderItems/${orderID}`;
        
    return fetch(URI,
    {
        method: 'GET'       
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
            console.log(err);
    });
};

export const createOrder = (order, token) => {

    return fetch(`${Config.API}/orders`,
    {
        method: 'POST',
        headers:
        {
            Accept: 'application/json',
            'x-access-token': token
        },
        body: order
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {

        console.log(err);
    });
};

export const updateOrder = (orderId, order, token) => {

    return fetch(`${Config.API}/orders/${orderId}`,
    {
        method: 'PUT',
        headers:
        {
            Accept: 'application/json',
            'x-access-token': token
        },
        body: order
    })
    .then(response => {

        return response.json();
    })
    .catch(err => {

        console.log(err);
    });
};

export const updateOrderStatus = (orderId, body) => {

    return fetch(`${Config.API}/orders/${orderId}/status`,
    {
        method: 'PUT',
        headers:
        {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

//Braintree
export const getBraintreeClientToken = () => {
    return fetch(`${Config.API}/braintree/getToken`,
    {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const processPayment = (paymentData) => {
    return fetch(`${Config.API}/braintree/processPayment`, {
        method: "POST",
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//Shipping Rates
export const getShippingRates = (zipCode, weight) => {
    return fetch(`${Config.API}/shipping/rates?zipCode=${zipCode}&weight=${weight}`,
    {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};