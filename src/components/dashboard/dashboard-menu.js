import React, { Component } from 'react';
import "./dashboard-menu.css";

class DashboardMenu extends Component {
    render() {
      return (
        <div className="menu-holder">
            <div className="sub-action-holder">
                <span className="rubberBand animated badge badge-dark menu-label-first menu-label">new income</span>
                <button className="animated rubberBand round-menu-button btn btn-success menu-first">
                    <i className="fas fa-dollar-sign"></i>
                </button>
                <span className="rubberBand animated badge badge-dark menu-label-second menu-label">new expense</span>
                <button onClick={this.props.newExpense} className="animated rubberBand round-menu-button btn btn-danger menu-second">
                    <i className="fas fa-tags"></i>
                </button>
            </div>
        </div>
      );
    }
  }
  
  export default DashboardMenu;
  