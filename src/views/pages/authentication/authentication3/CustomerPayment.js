import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  TextField,
  Button,
} from "@mui/material";
import {
  createOrder,
  processPayment,
  updateOrderStatus,
} from "../../../APICalls";

// project imports
import AuthWrapper1 from "../AuthWrapper1";
import AuthCardWrapper from "../AuthCardWrapper";
import AuthLogin from "../auth-forms/AuthLogin";
import Logo from "ui-component/Logo";
import AuthFooter from "ui-component/cards/AuthFooter";
import useAuth from "hooks/useAuth";
import axios from "axios";

// assets

const getQueryVariable = (variable) => {
  var query = window.location.search.substring(1);
  //console.log(query)//"app=article&act=news_content&aid=160990"
  var vars = query.split("&");
  //console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    //console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
    if (pair[0] == variable) {
      //console.log('pair1',pair[1]);
      return pair[1];
    }
  }
  return false;
};

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const { isLoggedIn } = useAuth();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [change, setChange] = useState(false);
  const [token, setToken] = useState("");
  const [orderId, setOrderId] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [currentWorker, setCurrentWorker] = useState("");
  const [amount, setAmount] = useState(0);
  const [tip, setTip] = useState(0);
  const [porcent, setPorcent] = useState(10);
  const [price, setPrice] = useState(0);
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  useEffect(() => {
    axios
      .get("http://52.90.192.153/api/braintree/getToken")
      .then((response) => {
        setToken(response.data.clientToken);
        setData({ clientToken: data.clientToken });
        console.log("token::::", response.data.clientToken);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let worker = getQueryVariable("worker");

    axios
      .get(`http://52.90.192.153/api/products/${worker}`)
      .then((response) => {
        console.log("response CurrentWorker:::", response.data);
        setWorkerId(worker);
        setCurrentWorker(response.data);
      })
      .catch((error) => {
        alert("fail get current worker");
        console.log(error);
      });
  }, []);

  const onClickPay = async () => {
    let formData = new FormData();
    formData.append("price", Number(price));
    formData.append("term", Number(1));
    formData.append("trFee", Number(1));
    formData.append("dish", Number(1));
    formData.append("atmosphere", Number(1));
    formData.append("tasty", Number(1));
    formData.append("goodService", Number(1));
    formData.append("porcent", Number(porcent));
    formData.append("valueStar", Number(4));
    formData.append("product_id", "61bebaa007211555408b72a0");
    formData.append("product", JSON.stringify(currentWorker));
    console.log("formData::", formData);

    createOrder(formData, token).then((datacreate) => {
      console.log("datacreate", datacreate);
      setTimeout(() => {
        setOrderId(datacreate._id);
      }, 1500);

      let nonce;
      console.log("DATA INSTANCE:", data);
      data.instance
        .requestPaymentMethod()
        .then((data) => {
          // console.log(data);
          nonce = data.nonce;
          // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
          // and also total to be charged
          console.log("send nonce and total to process: ", nonce);
          console.log("price", price);

          const paymentData = {
            paymentMethodNonce: nonce,
            orderId: datacreate._id,
          };

          processPayment(paymentData)
            .then((response) => {
              console.log("response payment process:", response);
              if (response.success === true) {
                //showBlockSuccessUIModalRef.current.click();
                //setNoPayment(false);
                alert("Payment successful");
                //let body = { status: "Open", is_paid: "true" };
                //updateOrderStatus(datacreate._id, body).then((response) => {
                  //console.log("response update orfder status", response);
                //});

                //TODO: vaciar carrito y eliminar datos de localstorage y de indexDB
              }
            })
            .catch((error) => {
              // showBlockErrorUIModalRef.current.click();
              console.log(error);
              setData({ loading: false });
            });
        })
        .catch((error) => {
          // console.log("dropin error: ", error);
          setData({ ...data, error: error.message });
        });
    });
  };

  if (!change)
    return (
      <AuthWrapper1>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: "calc(100vh - 68px)" }}
            >
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item sx={{ mb: 3 }}>
                      <Link to="#">
                        <Logo />
                      </Link>
                    </Grid>
                    {/* <Grid item xs={12}>
                                      
                                        </Grid> */}
                    <Grid item xs={12}>
                      {/* <AuthLogin /> */}
                      <TextField
                        id="outlined-basic"
                        label="Bill Amount"
                        value={amount}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                          setAmount(e.target.value);
                          if (porcent === 10) {
                            setPrice((e.target.value * 0.1).toFixed(2));
                          }
                          if (porcent === 15) {
                            setPrice((e.target.value * 0.15).toFixed(2));
                          }
                          if (porcent === 20) {
                            setPrice((e.target.value * 0.2).toFixed(2));
                          }
                        }}
                      />
                    </Grid>

                    <Grid container style={{ marginTop: 12 }}>
                      <Grid item xs={2} />
                      <Grid item xs={1}>
                        <Button
                          style={{ background: "#8B0B35" }}
                          variant="contained"
                          onClick={() => {
                            setPorcent(10);
                            setPrice((amount * 0.1).toFixed(2));
                          }}
                        >
                          10%
                        </Button>
                      </Grid>
                      <Grid item xs={2} />
                      <Grid item xs={1}>
                        <Button
                          style={{ background: "#8B0B35" }}
                          variant="contained"
                          onClick={() => {
                            setPorcent(15);
                            setPrice((amount * 0.15).toFixed(2));
                          }}
                        >
                          15%
                        </Button>
                      </Grid>
                      <Grid item xs={2} />
                      <Grid item xs={1}>
                        <Button
                          style={{ background: "#8B0B35" }}
                          onClick={() => {
                            setPorcent(20);
                            setPrice((amount * 0.2).toFixed(2));
                          }}
                          variant="contained"
                        >
                          20%
                        </Button>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      {/* <AuthLogin /> */}
                      <Typography>{`Tips   $${price}`}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12} justifyContent="center">
                      <Button
                        style={{ background: "#8B0B35" }}
                        onClick={() => setChange(true)}
                        variant="contained"
                      >
                        Proceed to Payment
                      </Button>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
            <AuthFooter />
          </Grid>
        </Grid>
      </AuthWrapper1>
    );
  return (
    <AuthWrapper1>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>
                </Grid>
                <div onBlur={() => setData({ ...data, error: "" })}>
                  <DropIn
                    options={{ authorization: token }}
                    onInstance={(instance) => {
                      console.log("INSTANCE ONLY:::", instance);
                      setData({ ...data, instance: instance });
                    }}
                  />
                </div>
                <Grid container xs={12} justifyContent="center">
                  <Button
                    style={{ background: "#8B0B35" }}
                    onClick={() => onClickPay()}
                    variant="contained"
                  >
                    Pay
                  </Button>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
