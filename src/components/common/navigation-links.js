import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from "@material-ui/icons/Home";
import AttachMoneyICon from "@material-ui/icons/AttachMoney";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";

class NavigationLinks extends Component {
    render() {
      return (
        <div style={{width: '250px'}}>
          <List>
            <Link to='/' style={{textDecoration: 'none'}}>
              <ListItem>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            <Link to='/expense' style={{textDecoration: 'none'}}>
              <ListItem>
                <ListItemIcon>
                    <MoneyOffIcon />
                </ListItemIcon>
                <ListItemText primary="Expense" />
              </ListItem>
            </Link>
            <Link to='/income' style={{textDecoration: 'none'}}>
              <ListItem>
                <ListItemIcon>
                    <AttachMoneyICon />
                </ListItemIcon>
                <ListItemText primary="Income" />
              </ListItem>
            </Link>
          </List>
        </div>
      );
    }
  }
  
  export default NavigationLinks;