import React from "react";
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
  },
});

export default function Header() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbarContainer}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <FastFoodIcon />
          </IconButton>

          <FormControl>
            <Input
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

          <Button variant="contained" startIcon={<AccountCircle />}>
            LOGIN
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

/*
class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="right-container">
          <div className="main-icon">
            <FastfoodIcon />
          </div>
        </div>
        <div className="center-container">
          <FormControl>
            <Input
              id="input-with-icon-adornment"
              placeholder="Search by Restaurant Name"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon className="search-icon" />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="left-container">
          <div className="button-container">
            <Button variant="contained" startIcon={<AccountCircleIcon />}>
              LOGIN
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
*/
