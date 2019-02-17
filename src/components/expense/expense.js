import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyToolbarWithNavigation from "../common/my-toolbar-with-navigation";
import './expense.css';
import Filter from "../common/filter";
import moment from "moment";
import { formatMoney } from "../../helpers";
import {
  IconButton,
  Dialog,
  List,
  ListItem,
  ListItemText,
  Typography,
  Fab,
  AppBar,
  Toolbar,
  Divider
} from '@material-ui/core';
import FilterList from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const styles = {
  appBar: {
      position: 'fixed',
      marginTop: 56,
      zIndex: 1
  },
  filterLabel:{
    flexGrow: 1,
    textAlign: 'center'
  }
}

class Expense extends Component {
  constructor(props) {
    super(props);
    let filter = localStorage.getItem('expensefilter');
    if (filter !== null) {
      filter = JSON.parse(filter);
      filter.from = moment(filter.from);
      filter.to = moment(filter.to);
    }
    else {
      filter = {
        viewType: 'daily',
        from: moment().hours(0).minutes(0).seconds(0),
        to: moment().hours(23).minutes(59).seconds(59)
      }
    }

    if (filter.selectedAccounts === undefined) {
      filter.selectedAccounts= [{accountId: 0, name: "All"}];
      filter.selectedCategories= [{categoryId: 0, name: "All"}];
    }
    this.state = {
      currentFilter: '',
      total: 0,
      expenses: [],
      showFilter: false,
      filter
    }
  }

  componentDidMount() {
    this.loadExpenses(this.state.filter.from, this.state.filter.to, this.state.filter.viewType, this.state.filter.selectedAccounts, this.state.filter.selectedCategories);
  }

  toggleFilter = () => {
    this.setState({ ...this.state, showFilter: !this.state.showFilter });
  }

  loadExpenses = (from, to, viewType, selectedAccounts, selectedCategories) => {
    let filter = { from, to, viewType, selectedAccounts, selectedCategories};
    selectedAccounts = selectedAccounts.map(m => {return m.accountId});
    selectedCategories = selectedCategories.map(m => {return m.categoryId});
    localStorage.setItem("expensefilter", JSON.stringify(filter));
    if (from.month() === to.month() && from.date() === to.date() && from.year() === to.year()) {
      this.setState({ ...this.state, expenses: [], currentFilter: from.format('MMM DD'), total: 0, filter });
    }
    else {
      this.setState({ ...this.state, expenses: [], currentFilter: from.format('MMM DD') + ' - ' + to.format('MMM DD'), total: 0, filter });
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
      this.setState({ ...this.state, showFilter: false });
      let shits = [];
      let total = 0;
      selectall.onsuccess = (event) => {
        var cursor = event.target.result;
        if (cursor) {
          if ((selectedAccounts.indexOf(0) !== -1 || selectedAccounts.indexOf(cursor.value.accountId) !== -1) &&
              (selectedCategories.indexOf(0) !== -1 || selectedCategories.indexOf(cursor.value.categoryId) !== -1)) {
                shits.push(cursor.value);
                total += cursor.value.amount;
          }
          cursor.continue();
        }
      }
      transaction.oncomplete = () => {
        this.renderShits(shits, total);
      }
    }
  }

  renderShits = (shits, total) => {
    this.setState({ ...this.state, expenses: shits, total });
  }

  navigate = (type) => {
    let filterType = "days";
    filterType = this.state.filter.viewType === "weekly" ? "weeks" : filterType;
    filterType = this.state.filter.viewType === "monthly" ? "months" : filterType;
    filterType = this.state.filter.viewType === "yearly" ? "years" : filterType;
    let from, to;
    if (type === "prev") {
      from = this.state.filter.from.subtract(1, filterType);
      to = this.state.filter.to.subtract(1, filterType);
    }
    else {
      from = this.state.filter.from.add(1, filterType);
      to = this.state.filter.to.add(1, filterType);
    }

    if (filterType === "months") {
      to.endOf("month");
    }
    this.setState({ ...this.state, filter: { ...this.state.filter, from: from, to: to } });
    this.loadExpenses(from, to, this.state.filter.viewType, this.state.filter.selectedAccounts, this.state.filter.selectedCategories);
  }

  render() {
    return (
      <div>
        <MyToolbarWithNavigation title="Expense" buttons={[
          <IconButton onClick={this.toggleFilter} color="inherit" aria-label="Menu">
            <FilterList />
          </IconButton>
        ]} />
        <AppBar className={this.props.classes.appBar} color="default">
          <Toolbar>
            {this.state.filter.viewType !== "custom" ?
              <IconButton onClick={this.navigate.bind(this, 'prev')}>
                <ArrowBackIos />
              </IconButton>
              : null}
            <Typography component="p" className={this.props.classes.filterLabel}>
              {this.state.currentFilter}<br /><small>{formatMoney(this.state.total)}</small>
            </Typography>
            {this.state.filter.viewType !== "custom" ?
              <IconButton onClick={this.navigate.bind(this, 'next')}>
                <ArrowForwardIos />
              </IconButton>
              : null}
          </Toolbar>
        </AppBar>

        <div style={{ marginTop: '56px', overflowY: 'auto', minHeight: '100%' }}>
          <List component="nav">
            {this.state.expenses.map(item =>
              <Link key={item.expenseId} style={{ textDecoration: 'none' }} className="list-item" to={'/expense/edit/' + item.expenseId}>
                <ListItem button>
                  <ListItemText primary={item.title} secondary={moment(item.date).format('MMM DD hh:mma (ddd)')} />
                  <Typography className="float-right">{formatMoney(item.amount)}</Typography >
                </ListItem>
                <Divider light />
              </Link>
            )}
          </List>
        </div>

        <Dialog
          onClose={this.toggleFilter}
          open={this.state.showFilter}>
          <Filter close={this.toggleFilter.bind(this)} applyFilter={this.loadExpenses.bind(this)} />
        </Dialog>

        <Fab onClick={() => { this.props.history.push("/expense/new") }} color="primary" aria-label="Add" style={{ position: 'fixed', bottom: '15px', right: '15px' }}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

Expense.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Expense);