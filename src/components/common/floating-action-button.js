import React, { Component } from 'react';
import './floating-action-button.css';

class FloatingActionButton extends Component {
    render() {
      return (
          <button onClick={this.props.callback} className={this.props.className + " btn btn-primary btn-lg floating-action-button"}>
              {this.props.icon ? this.props.icon : <i className="fas fa-plus"></i>}
          </button>
      );
    }
  }
  
export default FloatingActionButton;