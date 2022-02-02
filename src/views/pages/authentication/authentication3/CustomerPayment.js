import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, TextField, Button } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import useAuth from 'hooks/useAuth';
import axios from 'axios';

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const { isLoggedIn } = useAuth();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [change, setChange] = useState(false);
    const [token, setToken] = useState('');
    const [amount, setAmount] = useState(0);
    const [tip, setTip] = useState(0);
    const [porcent, setPorcent] = useState(10);
    const [price, setPrice] = useState(0);
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    useEffect(() => {
        axios
            .get('http://52.90.192.153/api/braintree/getToken')
            .then((response) => {
                setToken(response.data.clientToken);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (!change)
        return (
            <AuthWrapper1>
                <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <AuthCardWrapper>
                                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                                        <Grid item sx={{ mb: 3 }}>
                                            <Link to="#">
                                                <Logo />
                                            </Link>
                                        </Grid>
                                        {/* <Grid item xs={12}>
                                      
                                        </Grid> */}
                                        <Grid item xs={12}>
                                            {/* <AuthLogin /> */}
                                            <TextField
                                                id="outlined-basic"
                                                label="Bill Amount"
                                                value={amount}
                                                variant="outlined"
                                                fullWidth
                                                onChange={(e) => {
                                                    setAmount(e.target.value);
                                                    if (porcent === 10) {
                                                        setPrice((e.target.value * 0.1).toFixed(2));
                                                    }
                                                    if (porcent === 15) {
                                                        setPrice((e.target.value * 0.15).toFixed(2));
                                                    }
                                                    if (porcent === 20) {
                                                        setPrice((e.target.value * 0.2).toFixed(2));
                                                    }
                                                }}
                                            />
                                        </Grid>

                                        <Grid container style={{ marginTop: 12 }}>
                                            <Grid item xs={2} />
                                            <Grid item xs={1}>
                                                <Button
                                                    style={{ background: '#8B0B35' }}
                                                    variant="contained"
                                                    onClick={() => {
                                                        setPorcent(10);
                                                        setPrice((amount * 0.1).toFixed(2));
                                                    }}
                                                >
                                                    10%
                                                </Button>
                                            </Grid>
                                            <Grid item xs={2} />
                                            <Grid item xs={1}>
                                                <Button
                                                    style={{ background: '#8B0B35' }}
                                                    variant="contained"
                                                    onClick={() => {
                                                        setPorcent(15);
                                                        setPrice((amount * 0.15).toFixed(2));
                                                    }}
                                                >
                                                    15%
                                                </Button>
                                            </Grid>
                                            <Grid item xs={2} />
                                            <Grid item xs={1}>
                                                <Button
                                                    style={{ background: '#8B0B35' }}
                                                    onClick={() => {
                                                        setPorcent(20);
                                                        setPrice((amount * 0.2).toFixed(2));
                                                    }}
                                                    variant="contained"
                                                >
                                                    20%
                                                </Button>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>
                                            {/* <AuthLogin /> */}
                                            <Typography>{`Tips   $${price}`}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12} justifyContent="center">
                                            <Button style={{ background: '#8B0B35' }} onClick={() => setChange(true)} variant="contained">
                                                Proceed to Payment
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                        <AuthFooter />
                    </Grid>
                </Grid>
            </AuthWrapper1>
        );
    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                </Grid>
                                <div>
                                    <DropIn
                                        options={{ authorization: token }}
                                        onInstance={(instance) => {
                                            data.instance = instance;
                                        }}
                                    />
                                </div>
                                <Grid container xs={12} justifyContent="center">
                                    <Button style={{ background: '#8B0B35' }} onClick={() => setChange(true)} variant="contained">
                                        Pay
                                    </Button>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
