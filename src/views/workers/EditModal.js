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
import WorkerForm from "./WorkerForm";
import { IconTrash, IconPencil } from "@tabler/icons";

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

const Body = forwardRef(({ modalStyle, handleClose, getData, worker }, ref) => (
  <div ref={ref} tabIndex={-1}>
    {/**
     * style={modalStyle}
     * Property 'style' does not exist on type 'IntrinsicAttributes & MainCardProps & RefAttributes<HTMLDivElement>
     */}
    <MainCard
      style={modalStyle}
      sx={{
        position: "absolute",
        width: { xs: 280, lg: 840 },
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      title="Edit Worker"
      content={false}
      secondary={
        <IconButton onClick={handleClose} size="large">
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <CardContent>
        <WorkerForm
          handleClose={handleClose}
          getData={() => getData()}
          worker={worker}
        />
        {/* <Typography variant="body1">Laboris non ad et aute sint aliquip mollit voluptate velit dolore magna fugiat ex.</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Commodo amet veniam nostrud mollit quis sint qui nulla elit esse excepteur ullamco esse magna. Nisi duis aute est in
                    mollit irure enim tempor in.
                </Typography> */}
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

export default function EditModal(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    props.setEditModal(true);
  };

  const handleClose = () => {
    props.setEditModal(false);
  };

  return (
    <Grid container justifyContent="flex-end">
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Body
          modalStyle={modalStyle}
          handleClose={handleClose}
          getData={() => props.getData()}
          worker={props.worker}
        />
      </Modal>
    </Grid>
  );
}
