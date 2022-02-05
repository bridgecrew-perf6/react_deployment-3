import { useEffect, useState } from "react";

// material-ui
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Moment from "react-moment";

// project imports
import MainCard from "ui-component/cards/MainCard";
import SecondaryAction from "ui-component/cards/CardSecondaryAction";
import { gridSpacing } from "store/constant";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
// table data
function createData(order, status, paid, date, total) {
  return { order, status, paid, date, total };
}

// ==============================|| TABLE - BASIC ||============================== //

export default function TableBasic() {
  const { logout, user } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user?.id === "ge9F5m4txyZpczSenHzL4L0bmW42")
      axios
        .get("http://52.90.192.153/api/orders")
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    else {
      axios
        .get(`http://52.90.192.153/api/userfirebase/${user?.id}`)
        .then((response) => {
          console.log("table basic", response.data);
          axios
            .get(`http://52.90.192.153/api/orders/user/${user?.id}`)
            .then((response) => {
              console.log(response.data);
              setData(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        });
    }
  }, []);

  // const getDate = (d) => new Date(d);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard
          content={false}
          title="All Transactions"

          // secondary={<SecondaryAction link="https://next.material-ui.com/components/tables/" />}
        >
          {/* table */}
          <TableContainer>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: 3 }}>Order Number</TableCell>
                  {/* <TableCell align="right">Status</TableCell> */}
                  <TableCell align="right">Is Paid</TableCell>
                  <TableCell align="right" sx={{ pl: 3 }}>
                    Date
                  </TableCell>
                  <TableCell align="right">Total</TableCell>
                  {/* <TableCell align="right">Actions</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow hover key={row.product_id}>
                    <TableCell sx={{ pl: 3 }} component="th" scope="row">
                      {row.product_id}
                    </TableCell>
                    {/* <TableCell align="right">{row.status}</TableCell> */}
                    <TableCell align="right">
                      {row.is_paid ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="right">
                      <Moment format="YYYY/MM/DD HH:hh">
                        {row.order_date}
                      </Moment>
                    </TableCell>
                    <TableCell align="right">{`$${row.order_total}`}</TableCell>
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
