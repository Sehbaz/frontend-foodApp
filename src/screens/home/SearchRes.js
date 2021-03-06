import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import ReactDOM from "react-dom";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import StarIcon from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Details from "../details/Details";

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
          <Card
            key={item.id}
            className={classes.root}
            onClick={() => {
              ReactDOM.render(
                <Details value={item.restaurant_name} />,
                document.getElementById("root")
              );
            }}
          >
            <CardActionArea>
              <CardMedia component="img" height="140" image={item.photo_URL} />
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
      })}
    </div>
  );
};

export default SearchRes;
