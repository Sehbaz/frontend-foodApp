import Header from "../../common/header/Header";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StarIcon from "@material-ui/icons/Star";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopCircle } from "@fortawesome/free-solid-svg-icons";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";

import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Snackbar,
  Typography,
} from "@material-ui/core";
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
  detailsContainer: {
    display: "flex",
    justifyContent: "flex-start",
    height: "280px",
    padding: "1rem",
    backgroundColor: "#E8E8E8",
    [theme.breakpoints.between("0", "590")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "auto",
    },
  },

  container1: {
    width: "30%",
    marginRight: "1em",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.between("0", "590")]: {
      width: "80%",

      marginRight: "0",
      marginBottom: "1rem",
    },
  },
  container2: {
    width: "60%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.between("0", "590")]: {
      width: "80%",
      textAlign: "center",
    },
  },
  ratingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
  media: {
    width: "100%",
    maxWidth: "280px",
    maxHeight: "166px",
    height: "auto",
  },
  menuContainer: {
    display: "flex",
    padding: "1em",
    [theme.breakpoints.between("0", "590")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  menuItem: {
    width: "50%",
    [theme.breakpoints.between("0", "590")]: {
      width: "100%",
      marginBottom: "1em",
    },
  },
  cartContainer: {
    width: "50%",
    padding: "2rem",
    [theme.breakpoints.between("0", "590")]: {
      width: "100%",
    },
  },
  totalContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
});
const Details = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [add, setAdd] = React.useState("");
  useEffect(() => {
    fetch("http://localhost:8080/api/restaurant/name/" + props.value)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.restaurants[0]);
        setValue(result.restaurants[0]);
        setAdd(result.restaurants[0].address);
      });
  }, []);

  const [adder, setAdder] = useState(0);
  const onAdderIncrease = () => {
    setAdder(adder + 1);
  };
  const onAdderDecrease = () => {
    if (adder > 0) {
      setAdder(adder - 1);
    }
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const [open, setOpen] = React.useState(false);

  const handleCloseSnack = () => {
    setOpen(false);
  };
  const itemAdded = () => {
    setOpen(true);
  };
  const [dotColor, setDotColor] = useState("black");
  const checkColor = (e) => {
    if (e === "veg") {
      setDotColor("green");
    } else {
      setDotColor("red");
    }
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        onClose={handleCloseSnack}
        autoHideDuration={4000}
        message="Item added to cart!"
      ></Snackbar>
      <Header />
      <div className={classes.detailsContainer}>
        <div className={classes.container1}>
          <img src={value.photo_URL} className={classes.media}></img>
        </div>
        <div className={classes.container2}>
          <h1>{value.restaurant_name}</h1>
          <h3>{add.locality}</h3>
          <h4>{value.categories}</h4>
          <div className={classes.ratingContainer}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StarIcon />
                <span>{value.customer_rating}</span>
              </div>
              <div style={{ color: "#909090" }}>
                <p>
                  AVERAGE RATING BY {value.number_customers_rated} CUSTOMERS
                </p>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span>&#8377;{value.average_price}</span>
              </div>
              <p style={{ color: "#909090" }}> AVERAGE COST FOR TWO PEOPLE</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.menuContainer}>
        <div className={classes.menuItem}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>
                      <FiberManualRecordRoundedIcon
                        style={{ color: dotColor }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>

                    <TableCell align="right"> &#8377;0.0</TableCell>
                    <TableCell align="right">
                      <Button startIcon={<AddIcon />} onClick={itemAdded} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={classes.cartContainer}>
          {" "}
          <Paper style={{ padding: "2rem" }}>
            <Typography variant="h4" component="h2" gutterBottom>
              <ShoppingCartIcon /> My Cart
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                {" "}
                <FontAwesomeIcon
                  icon={faStopCircle}
                  style={{ color: dotColor }}
                />
              </div>

              <div>
                <Typography variant="button" gutterBottom>
                  Chicken Biryani
                </Typography>
              </div>
              <div style={{ display: "flex" }}>
                {" "}
                <Button
                  onClick={onAdderIncrease}
                  startIcon={<AddIcon />}
                ></Button>
                <p>{adder}</p>
                <Button
                  onClick={onAdderDecrease}
                  startIcon={<RemoveRoundedIcon />}
                ></Button>
              </div>
              <div>
                {" "}
                <Typography variant="button" gutterBottom>
                  &#8377;0.0
                </Typography>
              </div>
            </div>

            <div className={classes.totalContainer}>
              <Typography variant="button" gutterBottom>
                Total Amount
              </Typography>

              <Typography variant="button" gutterBottom>
                &#8377;0.0
              </Typography>
            </div>

            <Button variant="contained" color="primary" fullWidth>
              Checkout
            </Button>
          </Paper>
        </div>
      </div>
    </div>
  );
};
export default Details;
