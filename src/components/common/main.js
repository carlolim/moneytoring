import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Expense from '../expense/expense';
import Income from '../income/income';
import NewExpense from '../expense/new-expense';
import EditExpense from '../expense/edit-expense';

class Main extends Component {
    render() {
      return (
        <main>
            <Switch>
                <Route path='/income' component={Income}/>
                <Route path='/expense/edit/:id' component={EditExpense} />
                <Route path='/expense/new' component={NewExpense} />
                <Route path='/expense' component={Expense}/>
                <Route path='/' component={Dashboard}/>
            </Switch>
        </main>
      );
    }
}
  

export default Main
