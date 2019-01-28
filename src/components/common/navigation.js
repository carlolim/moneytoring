import React, {Component} from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import NavigationLinks from "./navigation-links";


class Navigation extends Component {
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
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer}
          onOpen={this.toggleDrawer}
          disableBackdropTransition={true}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer}
                onKeyDown={this.toggleDrawer}>
                  <NavigationLinks />
              </div>
      </SwipeableDrawer>
    );
  }
}

export default Navigation;
