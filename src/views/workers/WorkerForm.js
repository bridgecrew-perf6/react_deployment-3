import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

// material-ui
import { Button, Grid, Stack, TextField, MenuItem } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { SNACKBAR_OPEN } from 'store/actions';
import { gridSpacing } from 'store/constant';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

// assets
import LinkIcon from '@mui/icons-material/Link';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
    email: yup.string().required('Name is required'),
    password: yup.string().min(8, 'Description should be of minimum 8 characters length').required('Description is required')
});

const locals = [
    {
        value: 'id1',
        label: 'Local Test 1'
    },
    {
        value: 'id2',
        label: 'Local Test 2'
    }
];

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const LoginForms = ({ handleClose }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [paypal, setPaypal] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', mail);
        formData.append('phoneNumber', phone);
        formData.append('emailPaypal', paypal);
        formData.append('role', role);
        formData.append('password', password);
        formData.append('category', '5ef37be1527af5690c290a7e');
        axios
            .post('http://52.90.192.153/api/products', { product: formData })
            .then((response) => {
                alert();
                console.log(response);
            })
            .catch((error) => {
                alert('fallo');
                console.log(error);
            });
    };

    // useEffect(() => {
    //     axios
    //         .get('')
    //         .then((response) => {
    //             console.log(response.data);
    //             setCategories(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: () => {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Submit Success',
                variant: 'alert',
                alertSeverity: 'success'
            });
        }
    });

    return (
        <MainCard
        // title="On Submit"
        // secondary={<SecondaryAction icon={<LinkIcon fontSize="small" />} link="https://formik.org/docs/examples/with-material-ui" />}
        >
            <form>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={6}>
                        <TextField
                            label="Name"
                            fullWidth
                            id="outlined-margin-normal"
                            defaultValue=""
                            // helperText="Some important text"
                            margin="normal"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Email"
                            fullWidth
                            id="outlined-margin-normal"
                            defaultValue=""
                            // helperText="Some important text"
                            margin="normal"
                            onChange={(e) => {
                                setMail(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Phone"
                            fullWidth
                            id="outlined-margin-normal"
                            defaultValue=""
                            // helperText="Some important text"
                            margin="normal"
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                        />
                    </Grid>
                    {/* <Grid item xs={6}>
                        <TextField
                            label="Category"
                            fullWidth
                            id="outlined-margin-normal"
                            // helperText="Some important text"
                            margin="normal"
                            select
                            value={selectedCategory}
                            onChange={handleChange}
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid> */}
                    {/* <Grid item xs={6}>
                        <TextField
                            label="Local"
                            fullWidth
                            id="outlined-margin-normal"
                            defaultValue=""
                            // helperText="Some important text"
                            margin="normal"
                            select
                            value="id1"
                        >
                            {locals.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid> */}
                    <Grid item xs={6}>
                        <TextField
                            label="Paypal Account"
                            fullWidth
                            id="outlined-margin-normal"
                            defaultValue=""
                            // helperText="Some important text"
                            margin="normal"
                            onChange={(e) => {
                                setPaypal(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Role"
                            fullWidth
                            id="outlined-margin-normal"
                            defaultValue=""
                            // helperText="Some important text"
                            margin="normal"
                            onChange={(e) => {
                                setRole(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Password"
                            fullWidth
                            id="outlined-margin-normal"
                            defaultValue=""
                            // helperText="Some important text"
                            margin="normal"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" onClick={() => handleSave()} style={{ background: '#96d2c6' }}>
                                    Save
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default LoginForms;