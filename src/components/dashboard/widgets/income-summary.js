import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

const styles = {
  card: {
    minWidth: 275,
    marginBottom: '10px'
  },
  cardFooter: {
    float: 'right'
  }
};

function IncomeSummary(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        action={[
          <IconButton color="inherit" aria-label="Menu">
            <ArrowBackIos />
          </IconButton>,
          <IconButton>
            <ArrowForwardIos />
          </IconButton>
        ]}
        title="Income"
        subheader="January 2019"
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

IncomeSummary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IncomeSummary);