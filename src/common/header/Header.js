import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FastFoodIcon from "@material-ui/icons/Fastfood";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { createMuiTheme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  FormHelperText,
  InputLabel,
  Snackbar,
  TextField,
} from "@material-ui/core";
import validator from "validator";
import { DateRange } from "@material-ui/icons";

var passwordValidator = require("password-validator");
var base64 = require("base-64");

const theme = createMuiTheme({
  breakpoints: {
    values: {
      zero: 0,
      phone: 460,
      laptop: 1024,
      desktop: 1280,
    },
  },
});
const useStyles = makeStyles({
  header: {
    backgroundColor: "#37474f",
  },
  toolbarContainer: {
    display: "flex",

    justifyContent: "space-between",
    [theme.breakpoints.between("0", "460")]: {
      padding: "20px",
      flexWrap: "wrap",
      flexDirection: "column",
      alignContent: "flex-start",
      justifyContent: "none",
      alignItems: "flex-start",
    },
  },
  formContainer: {
    color: "white",
    width: "250px",
    borderBottomColor: "green",
    borderColor: "red",
    "&.MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    [theme.breakpoints.between("0", "460")]: {
      margin: "15px 0px",
    },
  },
  content: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid grey",
    outline: "none",
    backgroundColor: "white",
    padding: "1em",
    width: "30vw",
    [theme.breakpoints.between("0", "460")]: {
      width: "80vw",
    },
    [theme.breakpoints.between("460", "900")]: {
      width: "55vw",
    },
    textAlign: "center",
  },
  modalItem: {
    margin: "2em 0 0 0 ",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const [value, setValue] = useState("");

  const [valueTab, setValueTab] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleChange = (e) => {
    //setValue(e.target.value);
    props.onChange(e.target.value);
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const [loginContact, setLoginContact] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [loginContactRequired, setLoginContactRequired] = React.useState(
    "none"
  );
  const [loginPasswordRequired, setLoginPasswordRequired] = React.useState(
    "none"
  );
  const [invalidContact, setInvalidContact] = React.useState("none");
  const [invalidCred, setInvalidCred] = React.useState("none");
  const [userFirstName, setUserFirstName] = React.useState("");
  const submitLoginHandler = (e) => {
    var encodedData = base64.encode(loginContact + ":" + loginPassword);

    if (loginPassword !== "") {
      setLoginPasswordRequired("none");
    } else {
      setLoginPasswordRequired("block");
      setInvalidContact("none");
    }
    if (loginContact !== "") {
      setLoginContactRequired("none");
    } else {
      setLoginContactRequired("block");
      setInvalidContact("none");
    }
    if (loginPassword !== "" && loginContact !== "") {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + encodedData,
        },
        body: JSON.stringify({}),
      };
      fetch("http://localhost:8080/api/customer/login", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.code === "ATH-001") {
            setInvalidContact("block");
            setInvalidCred("none");
          } else if (data.code === "ATH-002") {
            setInvalidContact("none");
            setInvalidCred("block");
          } else {
            setInvalidCred("none");
            setInvalidContact("none");
            setOpen(true);
            setModalIsOpen(false);
            setButtonContainer("block");
            setLoginButtonContainer("none");
            setUserFirstName(data.first_name);
          }
        });
    }
  };
  const onInputLoginUsernameHandler = (e) => {
    setLoginContact(e.target.value);
    setLoginContactRequired("none");
  };
  const onInputLoginPasswordHandler = (e) => {
    setLoginPassword(e.target.value);
    setLoginPasswordRequired("none");
  };

  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [contact, setContact] = React.useState("");

  const [firstnameRequired, setFirstnameRequired] = React.useState("none");
  const [lastnameRequired, setLastnameRequired] = React.useState("none");
  const [emailRequired, setEmailRequired] = React.useState("none");
  const [passwordRequired, setPasswordRequired] = React.useState("none");
  const [contactRequired, setContactRequired] = React.useState("none");
  const [emailErrorRequired, setEmailErrorRequired] = React.useState("none");
  const [inavlidPasswordRequired, setInvalidPasswordRequired] = React.useState(
    "none"
  );
  const [phoneValidationRequred, setPhoneValidationRequired] = React.useState(
    "none"
  );

  const [userExist, setUserExist] = React.useState("none");

  const onInputFirstnameHandler = (e) => {
    setFirstname(e.target.value);
    setFirstnameRequired("none");
  };
  const onInputLastnameHandler = (e) => {
    setLastname(e.target.value);
    setLastnameRequired("none");
  };
  const onInputEmailHandler = (e) => {
    setEmail(e.target.value);
    setEmailRequired("none");
  };
  const onInputPasswordHandler = (e) => {
    setPassword(e.target.value);
    setPasswordRequired("none");
  };
  const onInputContactHandler = (e) => {
    setContact(e.target.value);
    setContactRequired("none");
  };
  const submitRegisterHandler = (e) => {
    if (firstname !== "") {
      setFirstnameRequired("none");
    } else {
      setFirstnameRequired("block");
    }
    if (lastname !== "") {
      setLastnameRequired("none");
    } else {
      setLastnameRequired("block");
    }
    if (email !== "") {
      setEmailRequired("none");

      if (validator.isEmail(email)) {
        setEmailErrorRequired("none");
      } else {
        setEmailErrorRequired("block");
      }
    } else {
      setEmailRequired("block");
    }
    if (password !== "") {
      setPasswordRequired("none");
      // Create a schema
      var schema = new passwordValidator();
      // Add properties to it
      schema
        .is()
        .min(8) // Minimum length 8
        .is()
        .max(100) // Maximum length 100
        .has()
        .uppercase() // Must have uppercase letters
        .has()
        .lowercase() // Must have lowercase letters
        .has()
        .digits(2) // Must have at least 2 digits
        .has()
        .not()
        .spaces() // Should not have spaces
        .is()
        .not()
        .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

      // Validate against a password string
      if (schema.validate(password)) {
        setInvalidPasswordRequired("none");
      } else {
        setInvalidPasswordRequired("block");
      }
    } else {
      setPasswordRequired("block");
    }
    if (contact !== "") {
      setContactRequired("none");
      setUserExist("none");

      let reg = new RegExp(/^\d*$/).test(contact);
      let contactLength = contact.length;
      if (!reg || contactLength !== 10) {
        setPhoneValidationRequired("block");
      } else {
        setPhoneValidationRequired("none");
      }
    } else {
      setContactRequired("block");
    }

    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact_number: contact,
        email_address: email,
        first_name: firstname,
        last_name: lastname,
        password: password,
      }),
    };
    fetch("http://localhost:8080/api/customer/signup", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.code == "SGR-001") {
          console.log("Exists");
          setUserExist("block");
        } else if (
          data.code !== "SGR-002" &&
          data.code !== "SGR-003" &&
          data.code !== "SGR-004" &&
          data.code !== "SGR-005"
        ) {
          setValueTab(0);
          setOpenLoginTab(true);
          setUserExist("none");
        }
      });
  };
  const [open, setOpen] = React.useState(false);

  const handleCloseSnack = () => {
    setOpen(false);
  };
  const [openLoginTab, setOpenLoginTab] = React.useState(false);

  const handleCloseSnackRegister = () => {
    setOpenLoginTab(false);
  };

  const [buttonContainer, setButtonContainer] = React.useState("none");
  const [loginButtonContainer, setLoginButtonContainer] = React.useState(
    "block"
  );

  return (
    <div value={value}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        onClose={handleCloseSnack}
        autoHideDuration={4000}
        message="Logged in successfully!"
      ></Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={openLoginTab}
        onClose={handleCloseSnackRegister}
        autoHideDuration={4000}
        message="Registered successfully! Please login now !"
      ></Snackbar>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbarContainer}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <FastFoodIcon />
          </IconButton>

          <FormControl>
            <Input
              onChange={handleChange}
              value={props.value}
              className={classes.formContainer}
              id="input-with-icon-adornment"
              placeholder="Search by Restaurant Name"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>

          <div style={{ display: buttonContainer }}>
            <Button variant="contained" startIcon={<AccountCircle />}>
              {userFirstName}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
              <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
            </Menu>
          </div>
          <div style={{ display: loginButtonContainer }}>
            {" "}
            <Button
              variant="contained"
              onClick={setModalIsOpenToTrue}
              startIcon={<AccountCircle />}
            >
              LOGIN
            </Button>
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={setModalIsOpenToFalse}
            ariaHideApp={false}
            className={classes.content}
          >
            <Tabs
              value={valueTab}
              onChange={handleChangeTab}
              variant="fullWidth"
              aria-label="simple tabs example"
            >
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Register" {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={valueTab} index={0}>
              <FormControl required fullWidth className={classes.modalItem}>
                <InputLabel htmlFor="logincontact">Contact </InputLabel>
                <Input
                  id="logincontact"
                  type="text"
                  onChange={onInputLoginUsernameHandler}
                />
                <FormHelperText
                  style={{ display: loginContactRequired, color: "red" }}
                >
                  <span>required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <FormControl required fullWidth className={classes.modalItem}>
                <InputLabel htmlFor="loginpassword">Password</InputLabel>
                <Input
                  id="loginpassword"
                  type="password"
                  onChange={onInputLoginPasswordHandler}
                />
                <FormHelperText
                  style={{ display: loginPasswordRequired, color: "red" }}
                >
                  <span>required</span>
                </FormHelperText>
                <FormHelperText
                  style={{ display: invalidContact, color: "red" }}
                >
                  <span>This contact number has not been registered!</span>
                </FormHelperText>
                <FormHelperText style={{ display: invalidCred, color: "red" }}>
                  <span>Invalid Credentials</span>
                </FormHelperText>
              </FormControl>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={submitLoginHandler}
                className={classes.modalItem}
              >
                LOGIN
              </Button>
            </TabPanel>
            <TabPanel value={valueTab} index={1}>
              <FormControl required fullWidth className={classes.modalItem}>
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input
                  id="firstname"
                  type="text"
                  onChange={onInputFirstnameHandler}
                />
                <FormHelperText
                  style={{ display: firstnameRequired, color: "red" }}
                >
                  <span>required</span>
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth className={classes.modalItem}>
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input
                  id="username"
                  type="text"
                  onChange={onInputLastnameHandler}
                />
                <FormHelperText
                  style={{ display: lastnameRequired, color: "red" }}
                >
                  <span>required</span>
                </FormHelperText>
              </FormControl>
              <FormControl required fullWidth className={classes.modalItem}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" type="email" onChange={onInputEmailHandler} />
                <FormHelperText
                  style={{ display: emailRequired, color: "red" }}
                >
                  <span>required</span>
                </FormHelperText>
                <FormHelperText
                  style={{ display: emailErrorRequired, color: "red" }}
                >
                  <span>Invalid Email</span>
                </FormHelperText>
              </FormControl>
              <FormControl required fullWidth className={classes.modalItem}>
                <InputLabel htmlFor="password">Password </InputLabel>
                <Input
                  id="password"
                  type="password"
                  onChange={onInputPasswordHandler}
                />
                <FormHelperText
                  style={{ display: passwordRequired, color: "red" }}
                >
                  <span>required</span>
                </FormHelperText>
                <FormHelperText
                  style={{ display: inavlidPasswordRequired, color: "red" }}
                >
                  <span>
                    Password must contain at least one capital letter, one small
                    letter, one number, and one special character
                  </span>
                </FormHelperText>
              </FormControl>
              <br />
              <FormControl required fullWidth className={classes.modalItem}>
                <InputLabel htmlFor="contact">Contact no</InputLabel>
                <Input
                  id="contact"
                  type="tel"
                  onChange={onInputContactHandler}
                />
                <FormHelperText
                  style={{ display: contactRequired, color: "red" }}
                >
                  <span>required</span>
                </FormHelperText>
                <FormHelperText
                  style={{ display: phoneValidationRequred, color: "red" }}
                >
                  <span>
                    Contact No. must contain only numbers and must be 10 digits
                    long
                  </span>
                </FormHelperText>
                <FormHelperText style={{ display: userExist, color: "red" }}>
                  <span>
                    This contact number is already registered! Try other contact
                    number.
                  </span>
                </FormHelperText>
              </FormControl>
              <br />

              <Button
                variant="contained"
                color="primary"
                onClick={submitRegisterHandler}
                className={classes.modalItem}
              >
                SIGNUP
              </Button>
            </TabPanel>
          </Modal>
        </Toolbar>
      </AppBar>
    </div>
  );
}
