import Config from '../config';

//SIGNUP API REQUEST
export const signup = user => {

    return fetch(`${Config.API}/signup`,
    {
        method: 'POST',
        headers:
        {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {

        return response.json();

    })
    .catch(err => {

        console.log(err);

    });
};

//SIGNIN API REQUEST
export const signin = user => {

    return fetch(`${Config.API}/signin`,
    {
        method: 'POST',
        headers:
        {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {

        return response.json();

    })
    .catch(err => {

        console.log(err);

    });
};

//SET LOCALSTORAGE JWT
export const authenticate = (data, next) => {

    if (typeof window !== 'undefined')
    {
        if(!data.token)
        {
            data.token = JSON.parse(localStorage.getItem('jwt')).token;
        }

        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

//GET LOCALSTORAGE
export const isAuthenticated = () => {

    if (typeof window == 'undefined')
    {
        return false;
    }

    if (localStorage.getItem('jwt'))
    {
        return JSON.parse(localStorage.getItem('jwt'));
    }
    else
    {
        return false;
    }
};

//UNSET LOCALSTORAGE JWT (LOGOUT)
export const signout = (next) => {

    if (typeof window !== 'undefined')
    {
        localStorage.removeItem('jwt');
        next();
    }
}