import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { SwipeableDrawer, BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import Swap from "@material-ui/icons/SwapHoriz";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";

const styles = {
}

class BottomShortcuts extends Component {
    state = {
        showDrawer: false
    }
    render () {
        return (
            <SwipeableDrawer
                anchor="bottom"
                open={this.state.showDrawer}
                onClose={() => { this.setState({ showDrawer: false }) }}
                onOpen={() => { this.setState({ showDrawer: true }) }}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction onClick={() => window.location.href = `${process.env.PUBLIC_URL}/accounts/transfer`} label="balance transfer" icon={<Swap />} />
                    <BottomNavigationAction onClick={() => window.location.href = `${process.env.PUBLIC_URL}/expense/new/0`} label="new expense" icon={<MoneyOffIcon />} />
                </BottomNavigation>
            </SwipeableDrawer>
        )
    }
}

BottomShortcuts.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BottomShortcuts);