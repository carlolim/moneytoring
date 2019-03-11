import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import MyToolbar from "../common/my-toolbar";
import {
    Typography, FormControl, InputLabel, Select,
    MenuItem
} from "@material-ui/core";
import { selectAll, formatMoney } from "../../helpers";

const styles = {
    accountItem: {
        borderBottom: 'solid 1px #ccc'
    },
    accountItemAmount: {
        right: 20,
        position: 'absolute'
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
        accounts: [],
        errors: {
            fromAccount: false,
            toAccount: false,
            fromAmount: false,
            toAmount: false
        }
    }

    async componentDidMount() {
        var accounts = await selectAll("account");
        this.setState({ ...this.state, accounts });
    }

    handleChangeProperty(property, e) {
        let value = e.target.value;
        if (property === 'fromAccount[accountId]' || property === 'toAccount.accountId') {
            value = parseInt(e.target.value);
        }

        this.setState({ ...this.state, [property]: value });
    }

    render() {
        return (
            <>
                <MyToolbar onBack={() => { this.props.history.goBack() }} showBackButton={true} title="Balance transfer" buttons={[]} />
                <div className="content">
                    <FormControl className="form-control" margin="normal">
                        <InputLabel>Source account</InputLabel>
                        <Select
                            error={this.state.errors.account}
                            value={this.state.fromAccount.accountId}
                            onChange={this.handleChangeProperty.bind(this, 'fromAccount[accountId]')}>
                            <MenuItem value={0}><em>select source account</em></MenuItem>
                            {this.state.accounts.map(item =>
                                <MenuItem key={item.accountId} value={item.accountId} className={this.props.classes.accountItem}>
                                    {item.name}<Typography className={this.props.classes.accountItemAmount}>{formatMoney(item.balance)}</Typography>
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl className="form-control" margin="normal">
                        <InputLabel>Destination account</InputLabel>
                        <Select
                            error={this.state.errors.account}
                            value={this.state.toAccount.accountId}
                            onChange={this.handleChangeProperty.bind(this, 'toAccount.accountId')}>
                            <MenuItem value={0}><em>select destination account</em></MenuItem>
                            {this.state.accounts.map(item =>
                                <MenuItem key={item.accountId} value={item.accountId} className={this.props.classes.accountItem}>
                                    {item.name}<Typography className={this.props.classes.accountItemAmount}>{formatMoney(item.balance)}</Typography>
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
            </>
        )
    }
}

Transfer.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Transfer);