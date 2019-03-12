import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { 
    Typography, TextField, FormControlLabel, 
    Switch, Dialog, DialogTitle, 
    DialogContent,
    DialogActions, Button,
    DialogContentText
} from "@material-ui/core";
import MyToolbar from "../common/my-toolbar";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete"
import Done from '@material-ui/icons/Done';
import moment from "moment";
import { formatMoney, selectById, updateAsync, remove } from "../../helpers";

const styles = {
}

class EditAccount extends Component {
    state = {
        accountId: 0,
        name: '',
        trackBalance: false,
        balance: '',
        startDate: '',
        errors: {
            name: false,
            trackBalance: false,
            balance: false,
            startDate: false
        },
        showDeleteModal: false
    }

    async componentDidMount() {
        var account = await selectById("account", Number(this.props.match.params.id));
        if (account) {
            account.balance = account.balance ? formatMoney(account.balance) : '';
            account.startDate = account.startDate ? moment(account.startDate).format("YYYY-MM-DD") : '';
            account.trackBalance = account.trackBalance ? account.trackBalance : false;
            this.setState({ ...this.state, ...account });
        }
    }

    handleChangeProperty(property, e) {
        let value = e.target.value;
        if (property === 'trackBalance')
            value = value === 'true';
        this.setState({ ...this.state, [property]: value });
    }

    formatCurrency(e) {
        let value = formatMoney(this.state.balance);
        this.setState({ ...this.state, "balance": value });
    }
    async delete() {
        var result = await remove("account", this.state.accountId);
        if (result) {
            this.props.history.goBack();
        }
    }
    async handleSave() {
        var data = {
            accountId: this.state.accountId,
            name: this.state.name,
            trackBalance: this.state.trackBalance,
            balance: this.state.trackBalance ? parseFloat(this.state.balance.replace(/,/g, '')) : 0,
            startDate: this.state.trackBalance ? new Date(this.state.startDate) : null
        };

        let hasError = false;
        let errors = {
            name: false,
            trackBalance: false,
            balance: false,
            startDate: false
        }
        if (data.name === '') {
            errors.name = true;
            hasError = true;
        }
        if (data.trackBalance && (data.balance === 0 || isNaN(data.balance))) {
            errors.balance = true;
            hasError = true;
        }
        if (data.trackBalance && (this.state.startDate === '' || this.state.startDate === undefined)) {
            errors.startDate = true;
            hasError = true;
        }

        if (hasError) {
            this.setState({ ...this.state, errors });
        }
        else {
            var result = await updateAsync("account", data);
            if (result) {
                this.props.history.push("/accounts");
            }
        }
    }

    render() {
        return (
            <>
                <MyToolbar
                    onBack={() => { this.props.history.goBack() }}
                    showBackButton={true}
                    title="Edit account"
                    buttons={[
                        this.state.accountId !==1 ?
                        (<IconButton onClick={() => {this.setState({...this.state, showDeleteModal: true})}} color="inherit"><DeleteIcon /></IconButton>)
                        : null,
                        (<IconButton onClick={this.handleSave.bind(this)} color="inherit"><Done /></IconButton>)
                    ]}
                />
                <div className="content">
                    {this.state.accountId === 1 ?
                        <Typography component="p">Personal</Typography>
                        :
                        <TextField
                            error={this.state.errors.name}
                            label="Name"
                            value={this.state.name}
                            onChange={this.handleChangeProperty.bind(this, 'name')}
                            margin="normal"
                            className="form-control"
                        />}
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.trackBalance}
                                onChange={this.handleChangeProperty.bind(this, 'trackBalance')}
                                value={!this.state.trackBalance}
                                color="primary"
                            />
                        }
                        label="this account has balance"
                    />
                    {this.state.trackBalance ?
                        <>
                            <TextField
                                error={this.state.errors.balance}
                                label="Balance"
                                value={this.state.balance}
                                onChange={this.handleChangeProperty.bind(this, 'balance')}
                                margin="normal"
                                className="form-control"
                                onBlur={this.formatCurrency.bind(this)}
                            />
                            <TextField
                                error={this.state.errors.startDate}
                                label="Balance start date"
                                type="date"
                                margin="normal"
                                className="form-control"
                                value={this.state.startDate}
                                onChange={this.handleChangeProperty.bind(this, 'startDate')}
                            />
                        </> : null}
                </div>
                <DeleteModal
                    isOpen={this.state.showDeleteModal}
                    close={() => this.setState({ ...this.state, showDeleteModal: false })}
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

EditAccount.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditAccount);