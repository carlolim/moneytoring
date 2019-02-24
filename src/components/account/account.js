import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
    List,
    ListItem,
    ListItemText,
    Divider,
    Fab, Dialog, DialogTitle, DialogContent,
    DialogActions, Button, TextField,
    ListItemSecondaryAction,
    IconButton,
    DialogContentText
} from "@material-ui/core";
import MyToolbar from "../common/my-toolbar";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete"
import { selectAll, insertAsync, updateAsync, remove } from "../../helpers";

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

    async saveAdd() {
        var name = this.state.new.name;
        this.setState({ ...this.state, new: { ...this.state.new, error: false } });
        if (name === null || name === undefined || name === '') {
            this.setState({ ...this.state, new: { ...this.state.new, error: true } });
        }
        else {
            var result = await insertAsync("account", { name });
            if (result) {
                var accounts = await selectAll("account");
                this.setState({ ...this.state, accounts, new: { ...this.state.new, showModal: false } });
            }
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
                <MyToolbar onBack={() => { this.props.history.goBack() }} showBackButton={true} title="Accounts" buttons={[]} />
                <List>
                    {this.state.accounts.map((account, index) =>
                        <div key={index}>
                            <ListItem button onClick={this.showEditModal.bind(this, account.accountId)}>
                                <ListItemText primary={account.name} secondary={account.accountId === 1 ? "This is the default account, you can't do anything about it." : ""} />
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
                    onClick={() => this.setState({ ...this.state, new: { ...this.state.new, showModal: true } })}
                    className={this.props.classes.addButton}>
                    <AddIcon />
                </Fab>
                <NewModal
                    isOpen={this.state.new.showModal}
                    value={this.state.new.name}
                    error={this.state.new.error}
                    changeValue={(e) => { this.setState({ ...this.state, new: { ...this.state.new, name: e.target.value } }) }}
                    close={() => this.setState({ ...this.state, new: { ...this.state.new, showModal: false, name: '' } })}
                    save={this.saveAdd.bind(this)}
                />
                <EditModal
                    isOpen={this.state.edit.showModal}
                    value={this.state.edit.name}
                    error={this.state.edit.error}
                    changeValue={(e) => { this.setState({ ...this.state, edit: { ...this.state.edit, name: e.target.value } }) }}
                    close={() => this.setState({ ...this.state, edit: { ...this.state.edit, showModal: false } })}
                    save={this.saveEdit.bind(this)}
                />
                <DeleteModal
                    isOpen={this.state.delete.showModal}
                    close={() => this.setState({ ...this.state, delete: { ...this.state.delete, showModal: false } })}
                    delete={this.delete.bind(this)}
                />
            </>
        )
    }
}

const NewModal = (props) => (
    <Dialog
        open={props.isOpen}>
        <DialogTitle>Add new account</DialogTitle>
        <Divider />
        <DialogContent>
            <TextField
                error={props.error}
                className="form-control"
                label="Account name"
                onChange={props.changeValue.bind(this)}
                margin="normal"
            />
        </DialogContent>
        <Divider />
        <DialogActions>
            <Button onClick={props.close} color="default">Cancel</Button>
            <Button onClick={props.save} color="primary" autoFocus>Save</Button>
        </DialogActions>
    </Dialog>
)

const EditModal = (props) => (
    <Dialog
        open={props.isOpen}>
        <DialogTitle>Edit account</DialogTitle>
        <Divider />
        <DialogContent>
            <TextField
                error={props.error}
                className="form-control"
                label="Account name"
                value={props.value}
                onChange={props.changeValue.bind(this)}
                margin="normal"
            />
        </DialogContent>
        <Divider />
        <DialogActions>
            <Button onClick={props.close} color="default">Cancel</Button>
            <Button onClick={props.save} color="primary" autoFocus>Save</Button>
        </DialogActions>
    </Dialog>
)

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