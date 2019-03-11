import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@material-ui/core';
import HomeIcon from "@material-ui/icons/Home";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import ListAlt from "@material-ui/icons/ListAlt";
import Settings from "@material-ui/icons/Settings";
import File from "@material-ui/icons/InsertDriveFile";
import Account from "@material-ui/icons/AccountCircle"
import BackGround from "../../images/aplaya.png"

const styles = {
  background: {
    backgroundImage: `url(${BackGround})`,
    height: 150,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  appDetailsHolder: {
    position: 'relative',
    paddingLeft: 15,
    height: '100%'
  },
  appName: {
    color: 'white',
    position: 'absolute',
    bottom: 24,
    fontSize: 20
  },
  email: {
    color: '#9e9e9e',
    position: 'absolute',
    bottom: 14,
    fontSize: '0.8rem'
  },
  drawer: {
    width: 250
  },
  navLink: {
    textDecoration: 'none'
  }
}

class NavigationLinks extends Component {
  render() {
    return (
      <div className={this.props.classes.drawer}>
        <div className={this.props.classes.background}>
          <div className={this.props.classes.appDetailsHolder}>
            <Typography className={this.props.classes.appName}>moneytoring</Typography>
            <Typography className={this.props.classes.email}>carlojameslim1@gmail.com</Typography>
          </div>
        </div>
        <List>
          <Link to='/' className={this.props.classes.navLink}>
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link to='/accounts' className={this.props.classes.navLink}>
            <ListItem>
              <ListItemIcon>
                <Account />
              </ListItemIcon>
              <ListItemText primary="Accounts" />
            </ListItem>
          </Link>
          <Link to='/expense' className={this.props.classes.navLink}>
            <ListItem>
              <ListItemIcon>
                <MoneyOffIcon />
              </ListItemIcon>
              <ListItemText primary="Expense" />
            </ListItem>
          </Link>
          <Link to='/expensetemplates' className={this.props.classes.navLink}>
            <ListItem>
              <ListItemIcon>
                <File />
              </ListItemIcon>
              <ListItemText primary="Expense templates" />
            </ListItem>
          </Link>
          <Link to='/budget' className={this.props.classes.navLink}>
            <ListItem>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="Budget" />
            </ListItem>
          </Link>
          <Divider />
          <Link to='/settings' className={this.props.classes.navLink}>
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

NavigationLinks.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavigationLinks);