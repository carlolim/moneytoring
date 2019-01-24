import React, { Component } from 'react';

class ExpenseSummary extends Component {
    render() {
      return (
        <div className="card">
            <div className="card-header pl-1 pr-1 pt-0 pb-0 text-center">
                <button type="button" className="btn btn-light float-left"><i className="fas fa-angle-left"></i></button>
                <span className="mt-2 d-inline-block">Jan 24</span>
                <button type="button" className="btn btn-light float-right"><i className="fas fa-angle-right"></i></button>
            </div>
            <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
            <div className="card-footer text-muted text-right">500.00</div>
        </div>
      );
    }
  }
  
  export default ExpenseSummary;
  