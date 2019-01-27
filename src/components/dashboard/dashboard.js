import React, { Component } from 'react';
import MyToolbarWithNavigation from "../common/my-toolbar-with-navigation";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import AttachMoneyICon from "@material-ui/icons/AttachMoney";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import Backdrop from '@material-ui/core/Backdrop';
import ExpenseSummary from "./widgets/expense-summary";
import IncomeSummary from "./widgets/income-summary";


const styles = {
  fabPrimary: {
    position: 'absolute', bottom: '15px', right: '15px', zIndex: 2
  },
  fabExpense: {
    position: 'absolute', bottom: '150px',  right: '23px', zIndex: 2
  },
  fabIncome: {
    position: 'absolute',bottom: '90px', right: '23px', zIndex: 2
  },
  backdrop: {
    zIndex: 1
  }
}

class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {showMenu: false}
    }

    toggleMenu = () => {
      this.setState({...this.state, showMenu: !this.state.showMenu});
    }

    newExpense = () => {
        this.props.history.push('/expense/new');
    }

    render() {
      return (
        <div>
            <MyToolbarWithNavigation title="moneytoring" buttons={[]} />
            {this.state.showMenu ? 
              <>
                <Fab onClick={this.newExpense} className="animated jello" color="secondary" size="small" aria-label="expense" style={styles.fabExpense}>
                  <MoneyOffIcon />
                </Fab>
                <Fab className="animated jello" color="default" size="small" aria-label="income" style={styles.fabIncome}>
                  <AttachMoneyICon />
                </Fab>
                <Backdrop onClick={this.toggleMenu} open={true} style={styles.backdrop} />
              </>
            : null }
            <Fab onClick={this.toggleMenu} color="primary" aria-label="Add" style={styles.fabPrimary}>
              {this.state.showMenu ? <CloseIcon /> : <AddIcon />}
            </Fab>
            <div style={{padding: '10px'}}>
                <ExpenseSummary />
            </div>
            <div style={{padding: '10px'}}>
            </div>
        </div>
      );
    }
  }
  
  export default Dashboard;
  