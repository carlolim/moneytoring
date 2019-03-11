import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
    List,
    ListItem,
    ListItemText,
    Divider,
    Fab, Dialog, DialogTitle, DialogContent,
    DialogActions, Button,
    ListItemSecondaryAction,
    IconButton,
    DialogContentText
} from "@material-ui/core";
import MyToolbarWithNavigation from "../common/my-toolbar-with-navigation";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete"
import { selectAll, updateAsync, remove } from "../../helpers";

const styles = {
    link: {
        textDecoration: 'none'
    },
    addButton: {
        position: 'fixed',
        bottom: 15,
        right: 15
    },
}


class Account extends Component {
    state = {
        accounts: [],
        new: {
            showModal: false,
            name: '',
            error: false
        },
        edit: {
            accountId: 0,
            showModal: false,
            name: '',
            error: false
        },
        delete: {
            accountId: 0,
            showModal: false
        }
    }

    async componentDidMount() {
        var accounts = await selectAll("account");
        this.setState({ ...this.state, accounts });
    }

    showEditModal(accountId) {
        var account = this.state.accounts.find(m => m.accountId === accountId);
        if (account !== null && account !== undefined && account.accountId !== 1) {
            this.setState({ ...this.state, edit: { accountId: account.accountId, name: account.name, error: false, showModal: true } })
        }
    }

    async saveEdit() {
        var name = this.state.edit.name;
        this.setState({ ...this.state, edit: { ...this.state.edit, error: false } });
        if (name === null || name === undefined || name === '') {
            this.setState({ ...this.state, edit: { ...this.state.edit, error: true } });
        }
        else {
            var result = await updateAsync("account", { accountId: this.state.edit.accountId, name });
            if (result) {
                var accounts = await selectAll("account");
                this.setState({ ...this.state, accounts, edit: { ...this.state.edit, showModal: false } });
            }
        }
    }

    async delete() {
        var result = await remove("account", this.state.delete.accountId);
        if (result) {
            var accounts = await selectAll("account");
            this.setState({ ...this.state, accounts, delete: { accountId: 0, showModal: false } });
        }
    }

    render() {
        return (
            <>
                <MyToolbarWithNavigation title="Accounts" buttons={[]} />
                <List>
                    {this.state.accounts.map((account, index) =>
                        <div key={index}>
                            <ListItem button onClick={() => this.props.history.push(`accounts/edit/${account.accountId}`)}>
                                <ListItemText primary={account.name} secondary={account.accountId === 1 ? "This is the default account, you can't delete this" : ""} />
                                {account.accountId !== 1 ?
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={() => this.setState({ ...this.state, delete: { accountId: account.accountId, showModal: true } })}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction> : null}
                            </ListItem>
                            <Divider />
                        </div>
                    )}
                </List>
                <Fab color="primary"
                    onClick={() => this.props.history.push('accounts/new')}
                    className={this.props.classes.addButton}>
                    <AddIcon />
                </Fab>
                <DeleteModal
                    isOpen={this.state.delete.showModal}
                    close={() => this.setState({ ...this.state, delete: { ...this.state.delete, showModal: false } })}
                    delete={this.delete.bind(this)}
                />
            </>
        )
    }
}

const DeleteModal = (props) => (
    <Dialog
        open={props.isOpen}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
            <DialogContentText>Are you sure you want to delete this account?</DialogContentText>
            <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.close} color="primary" autoFocus>Cancel</Button>
            <Button onClick={props.delete} color="secondary">Delete</Button>
        </DialogActions>
    </Dialog>
)

Account.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Account);