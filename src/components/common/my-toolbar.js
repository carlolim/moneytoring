import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
// import NavigationLinks from "./navigation-links";
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const styles = {
  root: {
    flexGrow: 1,
    paddingTop: 56
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MyToolbar extends Component {
  state = {
    isOpen: false
  };

  toggleDrawer = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div style={styles.root}>
        <AppBar position="fixed">
          <Toolbar>
            {this.props.showBackButton ?
              <IconButton onClick={this.props.onBack} style={styles.menuButton} color="inherit" aria-label="Menu">
                <ArrowBack />
              </IconButton>
              : null}
            <Typography variant="h6" color="inherit" style={styles.grow}>
              {this.props.title}
            </Typography>
            {this.props.buttons.map((item, index) => <span key={index}>{item}</span>)}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default MyToolbar;