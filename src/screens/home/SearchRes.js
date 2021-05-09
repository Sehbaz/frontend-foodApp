import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

import { createMuiTheme } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import StarIcon from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
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
  root: {
    maxWidth: "275px",
    margin: "1%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  ratingButton: {
    backgroundColor: "#f7ca18",
    color: "white",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
const SearchRes = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.cardContainer}>
      {props.value.map((item, index) => {
        return (
          <Card key={item.id} className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={item.photo_URL}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.restaurant_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.categories}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.buttonContainer}>
              <Button startIcon={<StarIcon />} className={classes.ratingButton}>
                {item.customer_rating} ({item.number_customers_rated})
              </Button>
              <Button>
                <span>&#8377;{item.average_price}&nbsp; </span>
                <span style={{ textTransform: "lowercase" }}> for two</span>
              </Button>
            </CardActions>
          </Card>
        );

        return null;
      })}
      {/*
      {props.value.map((item, index) => {
        return (
          
          <Card key={item.id} className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {item.restaurant_name}
              </Typography>
              <br />
              <Typography variant="body2" component="p">
                well meaning and kindly.
              </Typography>
            </CardContent>
          </Card>
        );

        return null;
      })}
    */}
    </div>
  );
};

export default SearchRes;
