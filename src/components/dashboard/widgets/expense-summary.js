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
import { formatMoney } from "../../../helpers";

const styles = {
  card: {
    minWidth: 275,
  },
  cardContent: {
    height: 150,
    overflowY: 'auto'
  },
  cardFooter: {
    float: 'right'
  },
  expenseItem:{
    marginLeft: 20
  },
  nothingToDoHere: {
    paddingTop: 35,
    textAlign: 'center'
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
    let filterDate = this.state.from.format("MMM DD [(]ddd[)]");
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
            let categoryItemProperties = this.getExpensesForCategory(expenses, categories[i].categoryId);
            data.push({
              category: categories[i],
              subTotal: categoryItemProperties.subTotal,
              items: categoryItemProperties.data
            });
          }
          this.setState({...this.state, data, total});
          this.generateFilterDate();
        }
    }
  }

  getExpensesForCategory = (items, categoryId) => {
    let data = items.filter(m => { return m.categoryId === categoryId });
    return { 
      data,
      subTotal: data.reduce((currValue, i) => { return i.amount + currValue; }, 0)
    };
  }

  changeFilterType () {

  }

  next () {
    this.setState({...this.state, from: this.state.from.add(1, "days"), to: this.state.to.add(1, "days")});
    this.loadSummary();
  }

  prev () {
    this.setState({...this.state, from: this.state.from.subtract(1, "days"), to: this.state.to.subtract(1, "days")});
    this.loadSummary();
  }

  render() {
      const { classes } = this.props;
      return (
        <Card className={classes.card}>
          <CardHeader
            action={
            <>
              <IconButton onClick={this.prev.bind(this)}>
                <ArrowBackIos />
              </IconButton>
              <IconButton onClick={this.next.bind(this)}>
                <ArrowForwardIos />
              </IconButton>
            </>}
            title="Expense"
            subheader={this.state.filterDate}
          />
          <Divider />
          <CardContent className={classes.cardContent}>
            {this.state.data.map((data, index) =>
                data.items.length > 0 ?
                    <div key={index}>
                        <Typography variant="overline">
                            {data.category.name}
                            <span style={{float: 'right'}}>{formatMoney(data.subTotal)}</span>
                        </Typography>
                        <div className={classes.expenseItem}>
                          {data.items.map((item, i)=> 
                              <Typography key={i} variant="caption">{item.title}<span style={{float: 'right'}}>{formatMoney(item.amount)}</span></Typography>
                          )}
                        </div>
                        <Divider light />
                    </div>
                : null
            )}
            {this.state.total === 0 ? <Typography variant="body1" className={classes.nothingToDoHere}>to do here: nothing</Typography> : null}
          </CardContent>
          <Divider />
          <CardActions className={classes.cardFooter}>
            <Typography component="p">{formatMoney(this.state.total)}</Typography>
          </CardActions>
        </Card>
      );
  }
}

ExpenseSummary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpenseSummary);