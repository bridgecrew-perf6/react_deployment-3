import { forwardRef, useState } from 'react';

// material-ui
import { Typography, Grid, Divider, Button, CardActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SimpleModal from './SimpleModal';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// componentes imports
import TableBasic from './TableBasic';

// ==============================|| SAMPLE PAGE ||============================== //

const Categories = () => (
    <MainCard title="Categories">
        <TableBasic />
        <Divider />

        {/* <CardActions> */}
        <SimpleModal />
        {/* </CardActions> */}
    </MainCard>
);

export default Categories;
