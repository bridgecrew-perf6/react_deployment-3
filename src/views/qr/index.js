// material-ui
import { Typography, Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import QRCode from 'react-qr-code';

// components imports

// ==============================|| SAMPLE PAGE ||============================== //

const Qr = () => (
    <MainCard>
        <Grid container xs={12}>
            <Grid lg={4} />
            <Grid item lg={4} xs={12}>
                <SubCard
                    title={
                        <Grid container spacing={2} justifyContent="center">
                            <Typography align="left" variant="subtitle1">
                                My QR
                            </Typography>
                        </Grid>
                    }
                >
                    <Grid container xs={12} justifyContent="center">
                        <QRCode value="http://tiptiptop.co/payment" size={210} />
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    </MainCard>
);

export default Qr;
