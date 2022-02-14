import { useEffect, useState } from "react";
// material-ui
import { useTheme } from "@mui/material/styles";
import { Alert, AlertTitle, Button, Grid, TextField } from "@mui/material";

// project imports
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import { gridSpacing } from "store/constant";
import useAuth from "../../../../../hooks/useAuth";
import firebase from "firebase/app";
import "firebase/auth";

// ==============================|| PROFILE 1 - CHANGE PASSWORD ||============================== //
const reauthenticate = (currentPassword) => {
  var user = firebase.auth().currentUser;
  var cred = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword
  );
  return user.reauthenticateWithCredential(cred);
};

const cPassword = (currentPassword, newPassword) => {
  reauthenticate(currentPassword)
    .then(() => {
      var user = firebase.auth().currentUser;
      user
        .updatePassword(newPassword)
        .then(() => {
          alert("Password updated!");
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

const ChangePassword = () => {
  const { logout, user } = useAuth();
  const theme = useTheme();
  const [current, setCurrent] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  return (
    <Grid container spacing={gridSpacing}>
      {/* <Grid item xs={12}>
                <Alert severity="warning" variant="outlined" sx={{ borderColor: 'warning.dark' }}>
                    <AlertTitle>Alert!</AlertTitle>
                    Your Password will expire in every 3 months. So change it periodically.
                    <strong> Do not share your password</strong>
                </Alert>
            </Grid> */}
      <Grid item xs={12}>
        <SubCard title="Change Password">
          <form noValidate autoComplete="off">
            <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  type="password"
                  id="outlined-basic7"
                  fullWidth
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  label="Current Password"
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
            </Grid>
            <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  type="password"
                  id="outlined-basic8"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  label="New Password"
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
              <Grid item xs={12} md={6}>
                <TextField
                  type="password"
                  id="outlined-basic9"
                  fullWidth
                  label="Confirm Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
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
            </Grid>
          </form>
          <Grid spacing={2} container justifyContent="flex-end" sx={{ mt: 3 }}>
            <Grid item>
              <AnimateButton>
                <Button
                  style={{ background: "#8b0b35" }}
                  variant="contained"
                  onClick={async () => cPassword(current, newPassword)}
                >
                  Change Password
                </Button>
              </AnimateButton>
            </Grid>
            <Grid item>
              <Button
                sx={{ color: "#8b0b35" }}
                onClick={() => {
                  setCurrent("");
                  setNewPassword("");
                  setConfirmNewPassword("");
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
