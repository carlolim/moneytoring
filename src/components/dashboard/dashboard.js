import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import MyToolbarWithNavigation from "../common/my-toolbar-with-navigation";
import { Typography, Fab, Backdrop } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import ExpenseSummary from "./widgets/expense-summary";
import BudgetSummary from "./widgets/budget-summary";
import { selectAll, budgetRepeatEnum } from "../../helpers";
import { validateBudget } from "../../modules/budget-module";
import File from "@material-ui/icons/InsertDriveFile";
import Swap from "@material-ui/icons/SwapHoriz";


const styles = {
  fabPrimary: {
    position: 'fixed', bottom: 15, right: 15, zIndex: 2
  },
  fabExpense: {
    position: 'fixed', bottom: 140, right: 23, zIndex: 2
  },
  fabExpenseLabel: {
    position: 'fixed',
    zIndex: 2,
    bottom: 148,
    color: 'white',
    backgroundColor: 'black',
    right: 70,
    padding: '3px 10px',
    borderRadius: 5,
  },
  fabTransfer: {
    position: 'fixed', bottom: 90, right: 23, zIndex: 2
  },
  fabTransferLabel: {
    position: 'fixed',
    zIndex: 2,
    bottom: 98,
    color: 'white',
    backgroundColor: 'black',
    right: 70,
    padding: '3px 10px',
    borderRadius: 5,
  },
  fabTemplate: {
    position: 'fixed', right: 23, zIndex: 2
  },
  fabTemplateLabel: {
    position: 'fixed',
    zIndex: 2,
    color: 'white',
    backgroundColor: 'black',
    right: 70,
    padding: '3px 10px',
    borderRadius: 5,
  },
  backdrop: {
    zIndex: 1
  },
  divider: {
    marginBottom: 20
  }
}

class Dashboard extends Component {
  state = {
    showMenu: false, daily: [], weekly: [], monthly: [], nonRepeating: [],
    expenseTemplates: []
  }

  componentDidMount() {
    this.loadBudgets();
    this.loadExpenseTemplates();
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

  async loadExpenseTemplates() {
    var expenseTemplates = await selectAll("expenseTemplate");
    this.setState({...this.state, expenseTemplates});
  }

  toggleMenu = () => {
    this.setState({ ...this.state, showMenu: !this.state.showMenu });
  }

  newExpense = (id) => {
    this.props.history.push(`/expense/new/${id}`);
  }

  render() {
    return (
      <div style={{paddingBottom: '50px'}}>
        <MyToolbarWithNavigation title="moneytoring" buttons={[]} />
        <div style={{ padding: '10px' }}>
          <ExpenseSummary />
        </div>
        <div style={{ padding: '10px' }}>
          <RenderBudgetGroup items={this.state.nonRepeating} />
          <RenderBudgetGroup items={this.state.daily} />
          <RenderBudgetGroup items={this.state.weekly} />
          <RenderBudgetGroup items={this.state.monthly} />
        </div>
        {this.state.showMenu ?
          <>
            {this.state.expenseTemplates.map((template, index) => 
              <RenderTemplate key={index} keyIndex={Number(index)} data={template} classes={this.props.classes} templateClicked={this.newExpense.bind(this, template.expenseTemplateId)} />
            )}
            <Typography component="p" className={this.props.classes.fabExpenseLabel}>new expense</Typography>
            <Fab onClick={this.newExpense.bind(this, 0)} color="secondary" size="small" className={this.props.classes.fabExpense}>
              <MoneyOffIcon />
            </Fab>
            <Typography component="p" className={this.props.classes.fabTransferLabel}>balance transfer</Typography>
            <Fab onClick={() => {this.props.history.push('/accounts/transfer')}} size="small" color="primary" className={this.props.classes.fabTransfer}>
              <Swap />
            </Fab>
            <Backdrop onClick={this.toggleMenu} open={true} className={this.props.classes.backdrop} />
          </>
          : null}
        <Fab onClick={this.toggleMenu} color="primary" className={this.props.classes.fabPrimary}>
          {this.state.showMenu ? <CloseIcon /> : <AddIcon />}
        </Fab>
      </div>
    );
  }
}

const RenderBudgetGroup = (props) => (
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

const RenderTemplate = (props) => (
  <>
    <Typography component="p" style={{bottom: `${((props.keyIndex+1)*55)+140}px`}} className={props.classes.fabTemplateLabel}>{props.data.templateName}</Typography>
    <Fab onClick={props.templateClicked} style={{bottom: `${((props.keyIndex+1)*50)+140}px`}} color="default" size="small" aria-label="expense" className={props.classes.fabTemplate}>
      <File />
    </Fab>
  </>
)

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard);