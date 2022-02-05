import { forwardRef, useState, useEffect } from "react";

// material-ui
import { Typography, Grid, Divider, Button, CardActions } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SimpleModal from "./SimpleModal";

// project imports
import MainCard from "ui-component/cards/MainCard";
import axios from "axios";

// componentes imports
import TableBasic from "./TableBasic";

// ==============================|| SAMPLE PAGE ||============================== //

const Categories = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    axios
      .get("http://52.90.192.153/api/categories")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainCard title="Categories">
      <TableBasic data={data} />
      <Divider />

      {/* <CardActions> */}
      <SimpleModal getData={async () => getData()} />
      {/* </CardActions> */}
    </MainCard>
  );
};

export default Categories;
