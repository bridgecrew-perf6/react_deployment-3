import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// material-ui
import {
  Box,
  Button,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

// project imports
import Avatar from "ui-component/extended/Avatar";
import SubCard from "ui-component/cards/SubCard";
import { gridSpacing } from "store/constant";
import useAuth from "../../../../../hooks/useAuth";

// assets
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconBuildingBank,
  IconUser,
} from "@tabler/icons";
import PhonelinkRingTwoToneIcon from "@mui/icons-material/PhonelinkRingTwoTone";
import PinDropTwoToneIcon from "@mui/icons-material/PinDropTwoTone";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";

import Avatar3 from "assets/images/users/avatar-3.png";
import Avatar1 from "assets/images/users/avatar-1.png";
import QRCode from "react-qr-code";
import axios from "axios";

// progress
function LinearProgressWithLabel({ value, ...other }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress {...other} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number,
};

// personal details table
/** names Don&apos;t look right */
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Full Name", ":", "Anshan Handgun"),
  createData("Fathers Name", ":", "Mr. Deepen Handgun"),
  createData("Address", ":", "Street 110-B Kalians Bag, Dewan, M.P. INDIA"),
  createData("Zip Code", ":", "12345"),
  createData("Phone", ":", "+0 123456789 , +0 123456789"),
  createData("Email", ":", "support@example.com"),
  createData("Website", ":", "http://example.com"),
];

// ==============================|| PROFILE 1 - PROFILE ||============================== //

const Profile = () => {
  const { logout, user } = useAuth();
  const [apiUser, setApiUser] = useState(null);
  useEffect(() => {
    axios
      .get(`http://52.90.192.153/api/userfirebase/${user?.id}`)
      .then((response) => {
        console.log("api user", response.data);
        setApiUser(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (user?.id !== "ge9F5m4txyZpczSenHzL4L0bmW42") {
    return (
      <Grid container spacing={gridSpacing}>
        <Grid item lg={3} xs={12} />
        <Grid item lg={6} xs={12}>
          <SubCard
            title={
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <IconUser />
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography align="left" variant="subtitle1">
                    {apiUser?.name}
                  </Typography>
                  <Typography align="left" variant="subtitle2">
                    {apiUser?.role}
                  </Typography>
                </Grid>

                <Grid item>
                  <Chip size="small" label="Worker" />
                </Grid>
              </Grid>
            }
          >
            <List component="nav" aria-label="main mailbox folders">
              <ListItemButton>
                <ListItemIcon>
                  <IconMail sx={{ fontSize: "1.3rem" }} />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="subtitle1">Email</Typography>}
                />
                <ListItemSecondaryAction>
                  <Typography variant="subtitle2" align="right">
                    {apiUser?.email}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemIcon>
                  <IconPhone sx={{ fontSize: "1.3rem" }} />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="subtitle1">Phone</Typography>}
                />
                <ListItemSecondaryAction>
                  <Typography variant="subtitle2" align="right">
                    {apiUser?.phoneNumber}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemIcon>
                  <IconMapPin sx={{ fontSize: "1.3rem" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">Location</Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <Typography variant="subtitle2" align="right">
                    {apiUser?.local}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemIcon>
                  <IconBuildingBank sx={{ fontSize: "1.3rem" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">Payment Account</Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <Typography variant="subtitle2" align="right">
                    {apiUser?.emailPaypal}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItemButton>
            </List>
          </SubCard>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item lg={3} xs={12} />
      <Grid item lg={6} xs={12}>
        <SubCard
          title={
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <IconUser />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  Admin TipTipTop
                </Typography>
                <Typography align="left" variant="subtitle2">
                  Admin
                </Typography>
              </Grid>

              <Grid item>
                <Chip size="small" label="Admin" />
              </Grid>
            </Grid>
          }
        >
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton>
              <ListItemIcon>
                <IconMail sx={{ fontSize: "1.3rem" }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle1">Email</Typography>}
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  info@tiptiptop.co
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemIcon>
                <IconPhone sx={{ fontSize: "1.3rem" }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle1">Phone</Typography>}
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  (+1) 582 982 1807
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>

            <Divider />
          </List>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default Profile;
