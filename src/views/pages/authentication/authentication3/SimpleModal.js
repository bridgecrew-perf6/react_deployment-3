import PropTypes from "prop-types";
import { forwardRef, useState, useEffect } from "react";

// material-ui
import {
  Button,
  CardContent,
  CardActions,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";

// assets
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";

// modal position
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    // transform: `translate(-${top}%, -${left}%)`
  };
}

const Body = forwardRef(({ modalStyle, handleClose, getData }, ref) => (
  <div ref={ref} tabIndex={-1}>
    {/**
     * style={modalStyle}
     * Property 'style' does not exist on type 'IntrinsicAttributes & MainCardProps & RefAttributes<HTMLDivElement>
     */}
    <MainCard
      style={modalStyle}
      sx={{
        position: "absolute",
        width: { xs: 280, lg: 400 },
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      // title="Add New Worker"
      content={false}
      secondary={
        <IconButton onClick={handleClose} size="large">
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <CardContent>
        <Typography variant="body1">Payment Successfull, Thank You.</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}></Typography>
      </CardContent>
      <Divider />
    </MainCard>
  </div>
));

Body.propTypes = {
  modalStyle: PropTypes.object,
  handleClose: PropTypes.func,
};

// ==============================|| SIMPLE MODAL ||============================== //

export default function SimpleModal(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container justifyContent="flex-end">
      <Button
        variant="contained"
        type="button"
        onClick={handleOpen}
        style={{ background: "#8B0B35", marginTop: 12 }}
      >
        <AddIcon />
      </Button>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Body
          modalStyle={modalStyle}
          handleClose={handleClose}
          getData={() => props.getData()}
        />
      </Modal>
    </Grid>
  );
}
