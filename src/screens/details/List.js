import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";
import TableRow from "@material-ui/core/TableRow";
import { IconButton, Paper, Snackbar } from "@material-ui/core";
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
  addBtn: {
    border: "1px solid red",
    textAlign: "center",
  },
});
const List = () => {
  const classes = useStyles();
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
  const itemAdded = (e) => {
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <FiberManualRecordRoundedIcon style={{ color: dotColor }} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                {checkColor}
                <TableCell align="right"> &#8377;0.0</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="upload picture"
                    component="span"
                    onClick={itemAdded}
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default List;
