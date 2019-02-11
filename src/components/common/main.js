import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Expense from '../expense/expense';
import Income from '../income/income';
import NewExpense from '../expense/new-expense';
import EditExpense from '../expense/edit-expense';
import Budget from '../budget/budget';
import EditBudget from '../budget/edit-budget';
import NewBudget from '../budget/new-budget';

class Main extends Component {
    render() {
      return (
        <main>
            <Switch>
                <Route path='/income' component={Income}/>
                <Route path='/expense/edit/:id' component={EditExpense} />
                <Route path='/expense/new' component={NewExpense} />
                <Route path='/expense' component={Expense}/>
                <Route path='/budget/edit/:id' component={EditBudget}/>
                <Route path='/budget/new' component={NewBudget}/>
                <Route path='/budget' component={Budget}/>
                <Route path='/' component={Dashboard}/>
            </Switch>
        </main>
      );
    }
}
  

export default Main
