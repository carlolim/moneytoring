import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import MyToolbar from "../common/my-toolbar";
import Done from '@material-ui/icons/Done';
import {
    Typography, FormControl, InputLabel, Select,
    MenuItem, TextField, IconButton, Snackbar, Button,
    InputAdornment
} from "@material-ui/core";
import { selectAll, formatMoney, selectById, updateBulk } from "../../helpers";

const styles = {
    accountItem: {
        borderBottom: 'solid 1px #ccc'
    },
    accountItemAmount: {
        marginLeft: 10
    },
    snackbar: {
        position: 'absolute',
    }
}

class Transfer extends Component {
    state = {
        fromAccount: {
            accountId: 0,
            balance: ''
        },
        toAccount: {
            accountId: 0,
            balance: ''
        },
        amount: '',
        accounts: [],
        errors: {
            fromAccount: false,
            toAccount: false,
            amount: false,
            showSnackbar: false,
            snackbarMessage: '',
        }
    }

    async componentDidMount() {
        var accounts = await selectAll("account");
        this.setState({ ...this.state, accounts });
    }

    handleChangeProperty(property, e) {
        let value = e.target.value;
        if (property === 'fromAccount.accountId' || property === 'toAccount.accountId') {
            value = parseInt(e.target.value);
            let account = this.state.accounts.find(m => m.accountId === value);
            value = { accountId: account.accountId, balance: formatMoney(account.balance) };
            property = property === 'fromAccount.accountId' ? 'fromAccount' : 'toAccount';
            this.setState({ ...this.state, [property]: value }, () => {
                if (this.state.fromAccount.accountId === this.state.toAccount.accountId) {
                    property = property === 'fromAccount' ? 'toAccount' : 'fromAccount';
                    this.setState({ ...this.state, [property]: { accountId: 0, balance: '' } })
                }
            });
            return;
        }

        this.setState({ ...this.state, [property]: value });
    }

    formatCurrency(e) {
        let value = formatMoney(this.state.amount);
        this.setState({ ...this.state, "amount": value });
    }
    closeSnackbar() {
        this.setState({ ...this.state, errors: { ...this.state.errors, showSnackbar: false } });
    }

    allIn() {
        this.setState({...this.state, amount: this.state.fromAccount.balance})
    }
    async handleSave() {
        var data = {
            fromAccount: { ...this.state.fromAccount },
            toAccount: { ...this.state.toAccount },
            amount: parseFloat(this.state.amount.replace(/,/g, ''))
        };

        let hasError = false;
        let errors = {
            fromAccount: false,
            toAccount: false,
            amount: false,
            showSnackbar: false,
            snackbarMessage: '',
        }
        if (data.amount === 0 || isNaN(data.amount)) {
            errors.amount = true;
            hasError = true;
        }
        if (data.fromAccount.accountId === 0) {
            errors.fromAccount = true;
            hasError = true;
        }
        if (data.toAccount.accountId === 0) {
            errors.toAccount = true;
            hasError = true;
        }
        if (data.fromAccount.accountId !== 0 && (parseFloat(data.fromAccount.balance.replace(/,/g, '')) < data.amount)) {
            hasError = true;
            errors.fromAccount = true;
            errors.showSnackbar = true;
            errors.snackbarMessage = "Low balance";
        }

        if (hasError) {
            this.setState({ ...this.state, errors });
        }
        else {
            var fromAccount = await selectById("account", data.fromAccount.accountId);
            var toAccount = await selectById("account", data.toAccount.accountId);
            fromAccount.balance -= data.amount;
            toAccount.balance += data.amount;
            var result = await updateBulk("account", [fromAccount, toAccount]);
            if (result) {
                this.props.history.push('/accounts');
            }
        }
    }

    render() {
        return (
            <>
                <MyToolbar onBack={() => { this.props.history.goBack() }} showBackButton={true} title="Balance transfer"
                    buttons={[
                        (<IconButton onClick={this.handleSave.bind(this)} color="inherit"><Done /></IconButton>)
                    ]} />
                <div className="content">
                    <FormControl className="form-control" margin="normal">
                        <InputLabel>Source account</InputLabel>
                        <Select
                            error={this.state.errors.fromAccount}
                            value={this.state.fromAccount.accountId}
                            onChange={this.handleChangeProperty.bind(this, 'fromAccount.accountId')}>
                            <MenuItem value={0}><em>select source account</em></MenuItem>
                            {this.state.accounts.map(item =>
                                item.trackBalance ?
                                    <MenuItem key={item.accountId} value={item.accountId} className={this.props.classes.accountItem}>
                                        {item.name}<Typography className={this.props.classes.accountItemAmount}>({formatMoney(item.balance)})</Typography>
                                    </MenuItem>
                                    :
                                    <MenuItem disabled={true} key={item.accountId} value={item.accountId} className={this.props.classes.accountItem}>
                                        {item.name}<Typography className={this.props.classes.accountItemAmount}>(doesn't track balance)</Typography>
                                    </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl className="form-control" margin="normal">
                        <InputLabel>Destination account</InputLabel>
                        <Select
                            error={this.state.errors.toAccount}
                            value={this.state.toAccount.accountId}
                            onChange={this.handleChangeProperty.bind(this, 'toAccount.accountId')}>
                            <MenuItem value={0}><em>select destination account</em></MenuItem>
                            {this.state.accounts.map(item =>
                                item.trackBalance ?
                                    <MenuItem key={item.accountId} value={item.accountId} className={this.props.classes.accountItem}>
                                        {item.name}<Typography className={this.props.classes.accountItemAmount}>({formatMoney(item.balance)})</Typography>
                                    </MenuItem>
                                    :
                                    <MenuItem disabled={true} key={item.accountId} value={item.accountId} className={this.props.classes.accountItem}>
                                        {item.name}<Typography className={this.props.classes.accountItemAmount}>(doesn't track balance)</Typography>
                                    </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <TextField
                        error={this.state.errors.amount}
                        label="Amount"
                        value={this.state.amount}
                        onChange={this.handleChangeProperty.bind(this, 'amount')}
                        margin="normal"
                        className="form-control"
                        onBlur={this.formatCurrency.bind(this)}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    <Button onClick={this.allIn.bind(this)} color="primary">all in</Button>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                <Snackbar
                    open={this.state.errors.showSnackbar}
                    autoHideDuration={3000}
                    onClose={this.closeSnackbar.bind(this)}
                    message={<span id="snackbar-fab-message-id">{this.state.errors.snackbarMessage}</span>}
                    className={this.props.classes.snackbar}
                    action={
                        <Button color="inherit" size="small" onClick={this.closeSnackbar.bind(this)}>
                            Close
                        </Button>
                    }
                />
            </>
        )
    }
}

Transfer.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Transfer);