// material-ui
import { Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";

// project imports
import MainCard from "ui-component/cards/MainCard";
import SubCard from "ui-component/cards/SubCard";
import QRCode from "react-qr-code";

// components imports

import axios from "axios";
import useAuth from "../../hooks/useAuth";

// ==============================|| SAMPLE PAGE ||============================== //

const Qr = () => {
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
  return (
    <MainCard title="My Qr">
      <Grid container xs={12}>
        <Grid lg={4} />
        <Grid item lg={4} xs={12}>
          <SubCard
            title={
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Typography align="left" variant="subtitle1">
                    {apiUser?.name}
                  </Typography>
                </Grid>
              </Grid>
            }
          >
            <Grid container xs={12} justifyContent="center">
              <QRCode
                value={`http://52.90.192.153/payment?worker=${apiUser?._id}`}
                size={210}
              />
            </Grid>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Qr;
