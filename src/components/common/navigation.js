import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
    render() {
      return (
        <nav id="sidebar">
            <div id="dismiss">
                <i className="fas fa-arrow-left"></i>
            </div>
            <div className="sidebar-header">
                <p></p>
                <h4>moneytoring</h4>
            </div>
            <ul className="list-unstyled components nav-links">
                <li><Link to='/'><i className="fas fa-tachometer-alt mr-2"></i>Dashboard</Link></li>
                <li><Link to='/income'><i className="fas fa-dollar-sign mr-2"></i>Income</Link></li>
                <li><Link to='/expense'><i className="fas fa-tags mr-2"></i>Expense</Link></li>
                {/*<li className="active">
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Home</a>
                    <ul className="collapse list-unstyled" id="homeSubmenu">
                        <li>
                            <a>Home 1</a>
                        </li>
                        <li>
                            <a>Home 2</a>
                        </li>
                        <li>
                            <a>Home 3</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a>About</a>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Pages</a>
                    <ul className="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <a>Page 1</a>
                        </li>
                        <li>
                            <a>Page 2</a>
                        </li>
                        <li>
                            <a>Page 3</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a>Portfolio</a>
                </li>
                <li>
                    <a>Contact</a>
      </li>*/}
            </ul>
        </nav>
      );
    }
  }
  
  export default Navigation;
  