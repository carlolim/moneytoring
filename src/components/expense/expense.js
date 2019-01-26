import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyToolbarWithNavigation from "../common/my-toolbar-with-navigation";
import './expense.css';
import Filter from "../common/filter";
import moment from "moment";
import { formatMoney } from "../../helpers";
import IconButton from '@material-ui/core/IconButton';
import FilterList from '@material-ui/icons/FilterList';
import Dialog from "@material-ui/core/Dialog";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from "@material-ui/core/Typography";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class Expense extends Component {
    constructor (props) {
      super(props);
      this.state = {
        currentFilter: '',
        total: 0,
        expenses: [],
        showFilter: false
      }
    }

    componentDidMount () {
      let from = moment().hours(0).minutes(0).seconds(0);
      let to = moment().hours(23).minutes(59).seconds(59);
      this.loadExpenses(from, to);
    }

    toggleFilter = () => {
      this.setState({...this.state, showFilter: !this.state.showFilter});
    }

    loadExpenses = (from, to) => {
      if (from.month() === to.month() && from.date() === to.date() && from.year() === to.year()){
        this.setState({...this.state, expenses: [], currentFilter: from.format('MMM DD'), total: 0});
      }
      else {
        this.setState({...this.state, expenses: [], currentFilter: from.format('MMM DD') + ' - ' + to.format('MMM DD'), total: 0});
      }
      var range = null;
      if (from && to) {
        range = IDBKeyRange.bound(from.toDate(), to.toDate());
      }
      const requestDatabase = indexedDB.open("Moneytoring");
      requestDatabase.onsuccess = (event) => {
          var db = event.target.result;
          var transaction = db.transaction(["expense"], "readonly");
          var store = transaction.objectStore("expense");
          var selectall = range === null ? store.index('date').openCursor(null, 'prev') : store.index('date').openCursor(range, 'prev');
          
          selectall.onsuccess = (event) => {
              this.setState({...this.state, showFilter: false});
              var cursor = event.target.result;
              if(cursor) {
                  this.setState({...this.state, 
                    expenses: [...this.state.expenses, cursor.value],
                    total: this.state.total + cursor.value.amount
                  });
                  cursor.continue();
              }
          }
      }
    }

    render() {
      return (
        <div>
          <MyToolbarWithNavigation title="Expense" buttons={[
            <IconButton onClick={this.toggleFilter} color="inherit" aria-label="Menu">
                <FilterList />
            </IconButton>
          ]} />
          <AppBar position="fixed" style={{marginTop: '56px', zIndex: 1}} color="default">
            <Toolbar>
              <Typography style={{display: "block", width: "100%", textAlign: "center"}} component="p">
                {this.state.currentFilter}<br/><small>{formatMoney(this.state.total)}</small>
              </Typography>
            </Toolbar>
          </AppBar>
          
          <div style={{marginTop: '112px', overflowY: 'scroll', minHeight: '100%'}}>
              <List component="nav">
                  {this.state.expenses.map(item =>
                      <Link key={item.expenseId} style={{textDecoration:'none'}} className="list-item" to={'/expense/edit/' + item.expenseId}>
                          <ListItem button>
                              <ListItemText primary={item.title} />
                              <Typography className="float-right">{formatMoney(item.amount)}</Typography >
                          </ListItem>
                      </Link>
                  )}
              </List>
          </div>

          <Dialog
            onClose={this.toggleFilter}
            open={this.state.showFilter}>
              <Filter close={this.toggleFilter.bind(this)} applyFilter={this.loadExpenses.bind(this)} />
          </Dialog>
          
          <Fab onClick={() => {this.props.history.push("/expense/new")}} color="primary" aria-label="Add" style={{position: 'fixed', bottom: '15px', right: '15px'}}>
              <AddIcon />
          </Fab>
        </div>
      );
    }
  }
  
  export default Expense;
  