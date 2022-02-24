import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

// material-ui
import { Button, Grid, Stack, TextField } from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import SecondaryAction from "ui-component/cards/CardSecondaryAction";
import { SNACKBAR_OPEN } from "store/actions";
import { gridSpacing } from "store/constant";

// third-party
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

// assets
import LinkIcon from "@mui/icons-material/Link";

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  email: yup.string().required("Name is required"),
  password: yup
    .string()
    .min(8, "Description should be of minimum 8 characters length")
    .required("Description is required"),
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const LoginForms = ({ handleClose, getData, category }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log(category);
    if (category) {
      setName(category.name);
      setDescription(category.descr);
    }
  }, []);

  const handleSave = async () => {
    if (category) {
      axios
        .put(`http://52.90.192.153/api/categories/${category._id}`, {
          name: name,
          descr: description,
        })
        .then((response) => {
          getData();
          handleClose();
        })
        .catch((error) => console.log(error));
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    axios
      .post("http://52.90.192.153/api/categories", { name, descr: description })
      .then((response) => {
        console.log("paso", response);
        getData();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        handleClose();
      });
  };

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: () => {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: "Submit Success",
        variant: "alert",
        alertSeverity: "success",
      });
    },
  });

  return (
    <MainCard
    // title="On Submit"
    // secondary={<SecondaryAction icon={<LinkIcon fontSize="small" />} link="https://formik.org/docs/examples/with-material-ui" />}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              id="outlined-margin-normal"
              defaultValue=""
              value={name}
              // helperText="Some important text"
              margin="normal"
              onChange={(e) => {
                setName(e.target.value);
              }}
              sx={{
                "& label.Mui-focused": {
                  color: "#8b0b35",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#747474",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#c4c4c4",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8b0b35",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8b0b35",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              id="outlined-margin-normal"
              defaultValue=""
              value={description}
              // helperText="Some important text"
              margin="normal"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              sx={{
                "& label.Mui-focused": {
                  color: "#8b0b35",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#747474",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#c4c4c4",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8b0b35",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8b0b35",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={() => handleSave()}
                  style={{ background: "#8b0b35" }}
                >
                  Save
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
};

export default LoginForms;
