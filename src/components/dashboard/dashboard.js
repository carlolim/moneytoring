import React, { Component } from 'react';
import Toolbar from "../common/toolbar";

class Dashboard extends Component {
    render() {
      return (
        <div>
            <Toolbar title="moneytoring" />
            <div className="content">
              <h1>Dashboard index</h1>
            </div>
        </div>
      );
    }
  }
  
  export default Dashboard;
  