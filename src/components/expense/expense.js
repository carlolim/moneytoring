import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyToolbarWithNavigation from "../common/my-toolbar-with-navigation";
import './expense.css';
import Filter from "../common/filter";
import moment from "moment";
import { formatMoney } from "../../helpers";
import IconButton from '@material-ui/core/IconButton';
import FilterList from '@material-ui/icons/FilterList';
import Modal from "@material-ui/core/Modal";

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
          <div className="content">
            <div className="under-toolbar-message text-center pt-1">
              {this.state.currentFilter}<br/><small>{formatMoney(this.state.total)}</small>
            </div>
            <div className="expenses-holder">
                {this.state.expenses.map(item =>
                  <Link key={item.expenseId} className="list-item d-block" to={'/expense/edit/' + item.expenseId}>
                    {item.title}
                    <small className="float-right">{formatMoney(item.amount)}</small>
                  </Link>
                )}
                {this.state.expenses.length === 0 ? <p className="text-center mt-5">Wow! no expenses!</p> : null}
            </div>
          </div>
          <Modal open={this.state.showFilter} onClose={this.toggleFilter}>
              <Filter close={this.toggleFilter.bind(this)} applyFilter={this.loadExpenses.bind(this)} />
          </Modal>
        </div>
      );
    }
  }
  
  export default Expense;
  