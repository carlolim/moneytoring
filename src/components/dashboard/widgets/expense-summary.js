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
  },
  expenseItem:{
    marginLeft: 20
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
      filterDate: '',
      data: [],
      total: 0
    }
  }

  componentDidMount () {
    this.loadSummary();
  }

  generateFilterDate () {
    let filterDate = this.state.from.format("MMM DD");
    if (this.state.filterType !== filterTypes.daily) {
      filterDate = this.state.from.format("MMM DD") + ' - ' + this.state.to.format("MMM DD");
    }
    this.setState({...this.state, filterDate});
  }
  
  loadSummary () {
    var range = IDBKeyRange.bound(this.state.from.toDate(), this.state.to.toDate());
    let expenses = [];
    let categories = [];
    let total = 0;
    let data = [];

    const requestDatabase = indexedDB.open("Moneytoring");
    requestDatabase.onsuccess = (event) => {
        var db = event.target.result;
        var transaction = db.transaction(["expense", "category"], "readonly");
        var store = transaction.objectStore("expense");
        var selectall = store.index('date').openCursor(range, 'prev');
        var selectAllCategory = transaction.objectStore("category").getAll();
        selectall.onsuccess = (event) => {
            var cursor = event.target.result;
            if(cursor) {
                expenses.push(cursor.value);
                total += cursor.value.amount;
                cursor.continue();
            }
        }

        selectAllCategory.onsuccess = (event) => {
          categories = event.target.result;
        }

        transaction.oncomplete = () => {
          for(var i=0; i<categories.length; i++){
            data.push({
              category: categories[i],
              items: expenses.filter(m => { return m.categoryId === categories[i].categoryId })
            });
          }
          this.setState({...this.state, data, total});
          this.generateFilterDate();
        }
    }
  }

  changeFilterType () {

  }

  next () {

  }

  prev () {

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
              </IconButton>
              <IconButton>
                <ArrowForwardIos />
              </IconButton>
            </>}
            title="Expense"
            subheader={this.state.filterDate}
          />
          <Divider />
          <CardContent>
            {this.state.data.map((data, index) =>
                data.items.length > 0 ?
                    <div key={index}>
                        <Typography variant="h6">{data.category.name}</Typography>
                        <div className={classes.expenseItem}>
                          {data.items.map((item, i)=> 
                              <div key={i}>
                                  <Typography variant="overline">{item.title}<span style={{float: 'right'}}>{item.amount}</span></Typography>
                                  <Divider light />
                              </div>
                          )}
                        </div>
                    </div>
                : null
            )}
          </CardContent>
          <Divider />
          <CardActions className={classes.cardFooter}>
            <Typography component="p">{this.state.total}</Typography>
          </CardActions>
        </Card>
      );
  }
}

ExpenseSummary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpenseSummary);