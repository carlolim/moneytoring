import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
    List,
    ListItem,
    ListItemText,
    Divider,
    Fab,
    ListItemSecondaryAction,
    IconButton,
    Typography, Backdrop
} from "@material-ui/core";
import MyToolbarWithNavigation from "../common/my-toolbar-with-navigation";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete"
import CloseIcon from '@material-ui/icons/Close';
import AccountIcon from "@material-ui/icons/AccountCircle";
import Swap from "@material-ui/icons/SwapHoriz";
import { selectAll } from "../../helpers";

const styles = {
    link: {
        textDecoration: 'none'
    },
    addButton: {
        position: 'fixed',
        bottom: 15,
        right: 15
    },
    fabAccount: {
      position: 'fixed', bottom: 140, right: 23, zIndex: 2
    },
    fabAccountLabel: {
      position: 'fixed',
      zIndex: 2,
      bottom: 148,
      color: 'white',
      backgroundColor: 'black',
      right: 70,
      padding: '3px 10px',
      borderRadius: 5,
    },
    fabTransfer: {
      position: 'fixed', bottom: 90, right: 23, zIndex: 2
    },
    fabTransferLabel: {
      position: 'fixed',
      zIndex: 2,
      bottom: 98,
      color: 'white',
      backgroundColor: 'black',
      right: 70,
      padding: '3px 10px',
      borderRadius: 5,
    },
}


class Account extends Component {
    state = {
        accounts: [],
        showMenu: false
    }

    async componentDidMount() {
        var accounts = await selectAll("account");
        this.setState({ ...this.state, accounts });
    }

    toggleMenu = () => {
      this.setState({ ...this.state, showMenu: !this.state.showMenu });
    }

    render() {
        return (
            <>
                <MyToolbarWithNavigation title="Accounts" buttons={[]} />
                <List>
                    {this.state.accounts.map((account, index) =>
                        <div key={index}>
                            <ListItem button onClick={() => this.props.history.push(`accounts/edit/${account.accountId}`)}>
                                <ListItemText primary={account.name} secondary={account.accountId === 1 ? "This is the default account." : ""} />
                            </ListItem>
                            <Divider />
                        </div>
                    )}
                </List>
                {this.state.showMenu ?
                <>
                    <Typography component="p" className={this.props.classes.fabAccountLabel}>new account</Typography>
                    <Fab onClick={() => {this.props.history.push('/accounts/new')}} color="primary" size="small" className={this.props.classes.fabAccount}>
                        <AccountIcon />
                    </Fab>
                    <Typography component="p" className={this.props.classes.fabTransferLabel}>balance transfer</Typography>
                    <Fab onClick={() => {this.props.history.push('/accounts/transfer')}} size="small" color="primary" className={this.props.classes.fabTransfer}>
                        <Swap />
                    </Fab>
                    <Backdrop onClick={this.toggleMenu} open={true} className={this.props.classes.backdrop} />
                </>
                : null}
                <Fab onClick={this.toggleMenu} color="primary" className={this.props.classes.addButton}>
                    {this.state.showMenu ? <CloseIcon /> : <AddIcon />}
                </Fab>
            </>
        )
    }
}

Account.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Account);