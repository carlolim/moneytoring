import React, {Component} from 'react';
import moment from "moment";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

const styles = {
  card: {
    minWidth: 275,
  },
  cardFooter: {
    float: 'right'
  }
};

const filterTypes = {daily: 1, weekly: 2, monthly: 3}

class ExpenseSummary extends Component {
  constructor (props) {
    super(props);
    this.state = {
      filterType: filterTypes.daily,
      from: moment().hours(0).minutes(0).seconds(0),
      to: moment().hours(23).minutes(59).seconds(59),
      filterDate: moment().toDate()
    }
  }

  componentDidMount() {
    this.generateFilterDate();
  }

  generateFilterDate() {
    if (this.state.filterType === filterTypes.daily) {
      return this.state.from.toDate("MMMM dd")
    }
    return "";
  }

  render() {
      const { classes } = this.props;
      return (
        <Card className={classes.card}>
          <CardHeader
            action={
            <>
              <IconButton>
                <ArrowBackIos />
              </IconButton>,
              <IconButton>
                <ArrowForwardIos />
              </IconButton>
            </>}
            title="Expense"
            subheader="Jan 01"
          />
          <Divider />
          <CardContent>
            
          </CardContent>
          <Divider />
          <CardActions className={classes.cardFooter}>
            <Typography component="p">0.00</Typography>
          </CardActions>
        </Card>
      );
  }
}

ExpenseSummary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpenseSummary);