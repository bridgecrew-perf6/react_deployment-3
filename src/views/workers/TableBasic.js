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

// project imports
import MainCard from "ui-component/cards/MainCard";
import SecondaryAction from "ui-component/cards/CardSecondaryAction";
import { gridSpacing } from "store/constant";
import { IconTrash } from "@tabler/icons";

import useAuth from "../../hooks/useAuth";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";

// table data
function createData(category, name) {
  return { category, name };
}

const rows = [
  createData("NightClubs", "Mya Miller"),
  createData("Restaurants", "Tommy Phillips"),
  createData("Restaurants", "admin2@gmail.com"),
];

// ==============================|| TABLE - BASIC ||============================== //

const deleteUser = async (id, getData) => {
  axios
    .delete(`http://52.90.192.153/api/products/users/${id}`)
    .then(async (response) => await getData())
    .catch((error) => console.log(error));
};

export default function TableBasic(props) {
  const [data, setData] = useState([]);
  const { logout, user } = useAuth();

  useEffect(() => {
    console.log(props.data);
    setData(props.data);
  }, [props]);

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
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row) => (
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
                    <TableCell align="right">
                      <IconTrash
                        onClick={async () =>
                          await deleteUser(row.idFirebase, props.getData)
                        }
                      />
                    </TableCell>
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
