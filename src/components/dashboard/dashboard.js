import React, { Component } from 'react';
import Toolbar from "../common/toolbar";
import FloatingActionButton from '../common/floating-action-button';
import DashboardMenu from './dashboard-menu';
import ExpenseSummary from "./widgets/expense-summary";

class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {showMenu: false}
    }

    toggleMenu = () => {
      this.setState({...this.state, showMenu: !this.state.showMenu});
    }

    newExpense() {
        this.props.history.push('/expense/new');
    }

    render() {
      return (
        <div>
            <Toolbar title="moneytoring" />
            <div className="content">
              <div className="p-2">
                <ExpenseSummary />
              </div>

              <FloatingActionButton 
                className={this.state.showMenu ? "animated rubberBand" : ''}
                callback={this.toggleMenu.bind(this)}
                icon={this.state.showMenu ? <i className="fas fa-times"></i> : <i className="fas fa-plus"></i>}
              />
              {this.state.showMenu ? <DashboardMenu newExpense={this.newExpense.bind(this)} /> : null}
            </div>
        </div>
      );
    }
  }
  
  export default Dashboard;
  