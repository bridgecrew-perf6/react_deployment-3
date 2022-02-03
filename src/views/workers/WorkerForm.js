import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

// material-ui
import { Button, Grid, Stack, TextField, MenuItem } from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import SecondaryAction from "ui-component/cards/CardSecondaryAction";
import { SNACKBAR_OPEN } from "store/actions";
import { gridSpacing } from "store/constant";

import { createProduct } from "../APICalls";

// third-party
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import firebase from "firebase/app";
import "firebase/auth";

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

const locals = [
  {
    value: "id1",
    label: "Local Test 1",
  },
  {
    value: "id2",
    label: "Local Test 2",
  },
];

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

/*
useEffect(() => {
    axios
        .get('http://52.90.192.153/api/braintree/getToken')
        .then((response) => {
            setToken(response.data.clientToken);
            setData({ clientToken: data.clientToken });
            console.log('token::::', response.data.clientToken)
        })
        .catch((error) => {
            console.log(error);
        });
}, []);*/

const firebaseRegister = async (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

const LoginForms = ({ handleClose }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [paypal, setPaypal] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [local, setLocal] = useState("");

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSave = async () => {
    await firebaseRegister(mail, password).then((datacusuarioreate) => {
      console.log("datacusuarioreate", datacusuarioreate.user.uid);
      const formData = new FormData();

      formData.append("email", mail);
      formData.append("password", password);
      formData.append("idFirebase", datacusuarioreate.user.uid);
      formData.append("name", name);
      formData.append("phoneNumber", phone);
      formData.append("printingType", "5ee5a2c62055cc54dc5ecf4a");
      formData.append("category", "5ef37be1527af5690c290a7e");
      formData.append("qty", Number(1));
      formData.append("price", Number(1));
      formData.append("weight", Number(1));
      formData.append("local", local);
      formData.append("emailPaypal", paypal);
      formData.append("role", role);
      formData.append("descr", "perfil personal");
      let token0 = "123456";
      createProduct(token0, formData).then((datacreate) => {
        setTimeout(() => {
          console.log("datacreate", datacreate);
          //setOrderId(datacreate._id);
        }, 15000);
      });
    });

    await firebase
      .auth()
      .signInWithEmailAndPassword("info@tiptiptop.co", "123456789");
  };

  // useEffect(() => {
  //     axios
  //         .get('')
  //         .then((response) => {
  //             console.log(response.data);
  //             setCategories(response.data);
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //         });
  // }, []);

  useEffect(() => {
    axios
      .get("http://52.90.192.153/api/braintree/getToken")
      .then((response) => {
        setToken(response.data.clientToken);

        console.log("token::::", response.data.clientToken);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      <form>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={6}>
            <TextField
              label="Name"
              fullWidth
              id="outlined-margin-normal"
              defaultValue=""
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
          <Grid item xs={6}>
            <TextField
              label="Email"
              fullWidth
              id="outlined-margin-normal"
              defaultValue=""
              // helperText="Some important text"
              margin="normal"
              onChange={(e) => {
                setMail(e.target.value);
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
          <Grid item xs={6}>
            <TextField
              label="Phone"
              fullWidth
              id="outlined-margin-normal"
              defaultValue="+974"
              // helperText="Some important text"
              margin="normal"
              onChange={(e) => {
                setPhone(e.target.value);
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
          <Grid item xs={6}>
            <TextField
              label="Local"
              fullWidth
              id="outlined-margin-normal"
              // helperText="Some important text"
              margin="normal"
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
          {/* <Grid item xs={6}>
                        <TextField
                            label="Category"
                            fullWidth
                            id="outlined-margin-normal"
                            // helperText="Some important text"
                            margin="normal"
                            select
                            value={selectedCategory}
                            onChange={handleChange}
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid> */}
          {/* <Grid item xs={6}>
                        <TextField
                            label="Local"
                            fullWidth
                            id="outlined-margin-normal"
                            defaultValue=""
                            // helperText="Some important text"
                            margin="normal"
                            select
                            value="id1"
                        >
                            {locals.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid> */}
          <Grid item xs={6}>
            <TextField
              label="Payment Account"
              fullWidth
              id="outlined-margin-normal"
              defaultValue=""
              // helperText="Some important text"
              margin="normal"
              onChange={(e) => {
                setPaypal(e.target.value);
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
          <Grid item xs={6}>
            <TextField
              label="Role"
              fullWidth
              id="outlined-margin-normal"
              defaultValue=""
              // helperText="Some important text"
              margin="normal"
              onChange={(e) => {
                setRole(e.target.value);
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
          <Grid item xs={6}>
            <TextField
              label="Password"
              fullWidth
              id="outlined-margin-normal"
              defaultValue=""
              // helperText="Some important text"
              margin="normal"
              onChange={(e) => {
                setPassword(e.target.value);
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
