// material-ui
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";

// components imports
import TableBasic from "./TableBasic";
import SimpleModal from "./SimpleModal";

import axios from "axios";

// ==============================|| SAMPLE PAGE ||============================== //

const Workers = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    axios
      .get("http://52.90.192.153/api/products")
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
    <MainCard title="Workers">
      <TableBasic data={data} getData={async () => getData()} />

      <SimpleModal getData={async () => getData()} />
    </MainCard>
  );
};

export default Workers;
