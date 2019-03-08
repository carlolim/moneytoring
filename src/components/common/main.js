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
import Settings from "../settings/settings";
import Account from "../account/account";
import Category from "../category/category";
import ExpenseTemplate from "../expense-template/expense-template";
import NewExpenseTemplate from "../expense-template/new-expense-template";
import EditExpenseTemplate from "../expense-template/edit-expense-template";
import DetailsBudget from '../budget/details-budget';

class Main extends Component {
    render() {
      return (
        <main>
            <Switch>
                <Route exact path='/' component={Dashboard}/>
                <Route exact path='/expense' component={Expense}/>
                <Route exact path='/expense/edit/:id' component={EditExpense} />
                <Route exact path='/expense/new/:templateId' component={NewExpense} />
                <Route exact path='/budget/edit/:id' component={EditBudget}/>
                <Route exact path='/budget/new' component={NewBudget}/>
                <Route exact path='/budget' component={Budget}/>
                <Route exact path='/budget/details/:id' component={DetailsBudget} />
                <Route exact path='/settings' component={Settings}/>
                <Route exact path='/accounts' component={Account}/>
                <Route exact path='/categories' component={Category}/>
                <Route exact path='/expensetemplates/edit/:id' component={EditExpenseTemplate} />
                <Route exact path='/expensetemplates/new' component={NewExpenseTemplate}/>
                <Route exact path='/expensetemplates' component={ExpenseTemplate}/>

            </Switch>
        </main>
      );
    }
}
  

export default Main
