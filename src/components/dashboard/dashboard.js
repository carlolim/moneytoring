import React, { Component } from 'react';
import MyToolbarWithNavigation from "../common/my-toolbar-with-navigation";
import { Typography, Fab, Backdrop, Divider } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import AttachMoneyICon from "@material-ui/icons/AttachMoney";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import ExpenseSummary from "./widgets/expense-summary";
import BudgetSummary from "./widgets/budget-summary";
import { selectAll, budgetRepeatEnum } from "../../helpers";
import { validateBudget } from "../../modules/budget-module";


const styles = {
  fabPrimary: {
    position: 'fixed', bottom: '15px', right: '15px', zIndex: 2
  },
  fabExpense: {
    position: 'fixed', bottom: '150px', right: '23px', zIndex: 2
  },
  fabIncome: {
    position: 'fixed', bottom: '90px', right: '23px', zIndex: 2
  },
  backdrop: {
    zIndex: 1
  },
  divider: {
    marginBottom: 20
  }
}

class Dashboard extends Component {
  state = { showMenu: false, daily: [], weekly: [], monthly: [], nonRepeating: [] }

  componentDidMount() {
    this.loadBudgets();
  }

  loadBudgets() {
    selectAll("budget").then((items) => {
      let daily = [];
      let weekly = [];
      let monthly = [];
      let nonRepeating = [];
      for (var i = 0; i < items.length; i++) {
        let budget = items[i];
        if (budget.showInDashboard) {
          if (budget.repeat) {
            let ledger = validateBudget(budget);
            if (ledger != null) {
              budget.ledger = [ledger];
              if (budget.repeat === budgetRepeatEnum.daily) daily.push(budget);
              else if (budget.repeat === budgetRepeatEnum.weekly) weekly.push(budget);
              else if (budget.repeat === budgetRepeatEnum.monthly) monthly.push(budget);
            }
          }
          else {
            budget.ledger[0].endDate = budget.noEndDate ? new Date() : budget.ledger[0].endDate;
            nonRepeating.push(budget);
          }
        }
      }
      this.setState({ ...this.state, daily, weekly, monthly, nonRepeating });
    });
  }

  toggleMenu = () => {
    this.setState({ ...this.state, showMenu: !this.state.showMenu });
  }

  newExpense = () => {
    this.props.history.push('/expense/new');
  }

  render() {
    return (
      <div>
        <MyToolbarWithNavigation title="moneytoring" buttons={[]} />
        <div style={{ padding: '10px' }}>
          <ExpenseSummary />
        </div>
        <div style={{ padding: '10px' }}>
          <RenderBudget items={this.state.nonRepeating} />
          <RenderBudget items={this.state.daily} />
          <RenderBudget items={this.state.weekly} />
          <RenderBudget items={this.state.monthly} />
        </div>
        {this.state.showMenu ?
          <>
            <Fab onClick={this.newExpense} color="secondary" size="small" aria-label="expense" style={styles.fabExpense}>
              <MoneyOffIcon />
            </Fab>
            <Fab  color="default" size="small" aria-label="income" style={styles.fabIncome}>
              <AttachMoneyICon />
            </Fab>
            <Backdrop onClick={this.toggleMenu} open={true} style={styles.backdrop} />
          </>
          : null}
        <Fab onClick={this.toggleMenu} color="primary" aria-label="Add" style={styles.fabPrimary}>
          {this.state.showMenu ? <CloseIcon /> : <AddIcon />}
        </Fab>
      </div>
    );
  }
}

const RenderBudget = (props) => (
  <>
    {props.items.length > 0 ?
      <>
        {props.items.map((item, i) =>
            <BudgetSummary key={i} budget={item} />
        )}
      </>
      : null}
  </>
)

export default Dashboard;
