import Header from "../../common/header/Header";
import React, { useEffect } from "react";

import StarIcon from "@material-ui/icons/Star";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
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
});
const Details = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  useEffect(() => {
    fetch("http://localhost:8080/api/restaurant/name/" + props.value)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.restaurants[0]);
        setValue(result.restaurants[0]);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className={classes.detailsContainer}>
        <div className={classes.container1}>
          <img src={value.photo_URL} className={classes.media}></img>
        </div>
        <div className={classes.container2}>
          <h1>{value.restaurant_name}</h1>
          <h4>{value.address.locality}</h4>
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
    </div>
  );
};
export default Details;
