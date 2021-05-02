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
import { FormHelperText, TextField } from "@material-ui/core";

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

  return (
    <div value={value}>
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

          <Button
            variant="contained"
            onClick={setModalIsOpenToTrue}
            startIcon={<AccountCircle />}
          >
            LOGIN
          </Button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={setModalIsOpenToFalse}
            ariaHideApp={false}
            className={classes.content}
          >
            <Tabs
              value={valueTab}
              onChange={handleChangeTab}
              aria-label="simple tabs example"
            >
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Register" {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={valueTab} index={0}>
              Login
            </TabPanel>
            <TabPanel value={valueTab} index={1}>
              Register
            </TabPanel>
          </Modal>
        </Toolbar>
      </AppBar>
    </div>
  );
}
