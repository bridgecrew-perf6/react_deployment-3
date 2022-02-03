import { useEffect, useState } from 'react';
// material-ui
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import axios from 'axios';

// table data
function createData(name, description) {
    return { name, description };
}

const rows = [
    createData('Restaurants', 'Restaurants & Pubs'),
    createData('NightClubs', 'NightClubs'),
    createData('Parking', 'Parking Places Categorie Description'),
    createData('Airport/Bus/Train', 'Airport and Terminal Bus / Train'),
    createData('Malls/Supermaket', 'Shoping Malls and Supermarkets')
];

// ==============================|| TABLE - BASIC ||============================== //

export default function TableBasic(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.data);
    }, [props]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard
                    content={false}
                    title="All Categories"

                    // secondary={<SecondaryAction link="https://next.material-ui.com/components/tables/" />}
                >
                    {/* table */}
                    <TableContainer>
                        <Table sx={{ minWidth: 350 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 3 }}>Name</TableCell>
                                    <TableCell align="left">Description</TableCell>
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
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.descr}</TableCell>

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
