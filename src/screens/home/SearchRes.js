import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "10px",
  },
});
const SearchRes = (props) => {
  const classes = useStyles();
  return (
    <div>
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
    </div>
  );
};

export default SearchRes;
