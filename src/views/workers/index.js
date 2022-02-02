// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// components imports
import TableBasic from './TableBasic';
import SimpleModal from './SimpleModal';

// ==============================|| SAMPLE PAGE ||============================== //

const Workers = () => (
    <MainCard title="Workers">
        {/* <Typography variant="body2">
            Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
            ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
            reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
            qui officiate descent molls anim id est labours.
        </Typography> */}
        <TableBasic />

        <SimpleModal />
    </MainCard>
);

export default Workers;