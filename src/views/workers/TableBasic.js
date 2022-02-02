import { useEffect, useState } from 'react';
// material-ui
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

import axios from 'axios';

// table data
function createData(category, name) {
    return { category, name };
}

const rows = [
    createData('NightClubs', 'Mya Miller'),
    createData('Restaurants', 'Tommy Phillips'),
    createData('Restaurants', 'admin2@gmail.com')
];

// ==============================|| TABLE - BASIC ||============================== //

export default function TableBasic() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://52.90.192.153/api/products')
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard
                    content={false}
                    title="All Workers"

                    // secondary={<SecondaryAction link="https://next.material-ui.com/components/tables/" />}
                >
                    {/* table */}
                    <TableContainer>
                        <Table sx={{ minWidth: 350 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 3 }}>Category</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    {/* <TableCell align="right">Is Paid</TableCell>
                                    <TableCell align="right" sx={{ pl: 3 }}>
                                        Date
                                    </TableCell>
                                    <TableCell align="right">Total</TableCell> */}
                                    {/* <TableCell align="right">Actions</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow hover key={row.name}>
                                        <TableCell sx={{ pl: 3 }} component="th" scope="row">
                                            {row.category.name}
                                        </TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        {/* <TableCell align="right">{row.paid}</TableCell>
                                        <TableCell align="right">{row.date}</TableCell>
                                        <TableCell align="right">{`$${row.total}`}</TableCell> */}
                                        {/* <TableCell align="right">
                                            <SecondaryAction link="https://next.material-ui.com/components/tables/" />
                                        </TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MainCard>
            </Grid>
        </Grid>
    );
}