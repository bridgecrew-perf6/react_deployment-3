// ORDERS
export const createOrder = (order, token) => {

    return fetch(`http://52.90.192.153/api/orders`,
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


export const createRating = (token, ratings) => {
    return fetch(`http://52.90.192.153/api/rating`, {
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


export const processPayment = async (paymentData) => {

    return fetch(`http://52.90.192.153/api/braintree/processPayment`, {
        method: "POST",
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            console.log('Response Process Payment:::::', response);
            return response.json();
        })
        .catch((err) => {
            //alert('fail process payment');
            console.log(err)
        });
};


export const updateOrderStatus = async (orderId, body) => {
   
    return fetch(`http://52.90.192.153/api/orders/${orderId}/status`,
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
            console.log('Response Update Order:::::', response);
            return response.json();
        })
        .catch((err) => {
            //alert('fail update order');
            console.log(err)
        });
};


export const createProduct = (token, product) => {

    return fetch(`http://52.90.192.153/api/products`,
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

