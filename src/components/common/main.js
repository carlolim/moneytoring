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

class Main extends Component {
    render() {
      return (
        <main>
            <Switch>
                <Route path='/income' component={Income}/>
                <Route path='/expense/edit/:id' component={EditExpense} />
                <Route path='/expense/new/:templateId' component={NewExpense} />
                <Route path='/expense' component={Expense}/>
                <Route path='/budget/edit/:id' component={EditBudget}/>
                <Route path='/budget/new' component={NewBudget}/>
                <Route path='/budget' component={Budget}/>
                <Route path='/settings' component={Settings}/>
                <Route path='/accounts' component={Account}/>
                <Route path='/categories' component={Category}/>
                <Route path='/expensetemplates/edit/:id' component={EditExpenseTemplate} />
                <Route path='/expensetemplates/new' component={NewExpenseTemplate}/>
                <Route path='/expensetemplates' component={ExpenseTemplate}/>

                <Route path='/' component={Dashboard}/>
            </Switch>
        </main>
      );
    }
}
  

export default Main
