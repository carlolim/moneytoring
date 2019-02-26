import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import HomeIcon from "@material-ui/icons/Home";
//import AttachMoneyICon from "@material-ui/icons/AttachMoney";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import ListAlt from "@material-ui/icons/ListAlt";
import Settings from "@material-ui/icons/Settings";
import File from "@material-ui/icons/InsertDriveFile";

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
            <Link to='/expensetemplates' style={{textDecoration: 'none'}}>
              <ListItem>
                <ListItemIcon>
                    <File />
                </ListItemIcon>
                <ListItemText primary="Expense templates" />
              </ListItem>
            </Link>
            {/* <Link to='/income' style={{textDecoration: 'none'}}>
              <ListItem>
                <ListItemIcon>
                    <AttachMoneyICon />
                </ListItemIcon>
                <ListItemText primary="Income" />
              </ListItem>
            </Link> */}
            <Link to='/budget' style={{textDecoration: 'none'}}>
              <ListItem>
                <ListItemIcon>
                    <ListAlt />
                </ListItemIcon>
                <ListItemText primary="Budget" />
              </ListItem>
            </Link>
            <Divider />
            <Link to='/settings' style={{textDecoration: 'none'}}>
              <ListItem>
                <ListItemIcon>
                    <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </Link>
          </List>
        </div>
      );
    }
  }
  
  export default NavigationLinks;