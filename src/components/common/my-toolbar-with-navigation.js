import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavigationLinks from "./navigation-links";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MyToolbarWithNavigation extends Component {
  state = {
    isOpen: false
  };

  toggleDrawer = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render(){
    return (
      <div style={styles.root}>
        <SwipeableDrawer
          open={this.state.isOpen}
          onClose={this.toggleDrawer}
          onOpen={this.toggleDrawer}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer}
                onKeyDown={this.toggleDrawer}>
                  <NavigationLinks />
              </div>
        </SwipeableDrawer>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.toggleDrawer} style={styles.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
            </IconButton>
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

export default MyToolbarWithNavigation;