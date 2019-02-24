import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import MyToolbar from "../common/my-toolbar";
import moment from "moment";
import { formatMoney, budgetRepeatEnum } from "../../helpers";
import { selectAll, insert } from "../../helpers";
import IconButton from '@material-ui/core/IconButton';
import Save from '@material-ui/icons/Save';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { MenuItem, Input, Checkbox, ListItemText, Switch, FormControlLabel } from "@material-ui/core";


const styles = {
    myClass: {
        font: 20,
        textAlign: 'center',
        width: '100%'
    },
    menuProps: {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
            },
        },
    }
}

class NewBudget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            selectedAccounts: [{ name: 'All', accountId: 0 }],
            isActive: true,
            repeat: budgetRepeatEnum.none,
            startDate: '', //moment().format('YYYY-MM-DD[T]HH:mm'),
            endDate: '',//moment().format('YYYY-MM-DD[T]HH:mm'),
            amount: '0',
            showInDashboard: false,
            selectedCategories: [],
            accounts: [],
            categories: [],
            noEndDate: false,
            errors: {
                name: false,
                selectedAccounts: false,
                repeat: false,
                startDate: false,
                endDate: false,
                amount: false,
                selectedCategories: false
            }
        }
    }

    handleSave = () => {
        var data = {
            name: this.state.name,
            accountIds: this.state.selectedAccounts.map(m => m.accountId),
            categoryIds: this.state.selectedCategories.map(m => m.categoryId),
            amount: parseFloat(this.state.amount.replace(/,/g, '')),
            repeat: this.state.repeat,
            startDate: new Date(this.state.startDate),
            noEndDate: this.state.noEndDate,
            endDate: this.state.endDate,
            isActive: true,
            showInDashboard: this.state.showInDashboard,
            ledger: []
        };
        let hasError = false;
        let errors = {
            name: false,
            selectedAccounts: false,
            repeat: false,
            startDate: false,
            endDate: false,
            amount: false,
            selectedCategories: false
        }
        if (data.name === '') {
            hasError = true;
            errors.name = true;
        }
        if (data.accountIds === null || data.accountIds === undefined || data.accountIds.length === 0) {
            hasError = true;
            errors.selectedAccounts = true;
        }
        if (data.categoryIds === null || data.categoryIds === undefined || data.categoryIds.length === 0) {
            hasError = true;
            errors.selectedCategories = true;
        }
        if (data.amount === 0 || isNaN(data.amount)) {
            errors.amount = true;
            hasError = true;
        }
        if (!this.state.startDate || this.state.startDate === '') {
            hasError = true;
            errors.startDate = true;
        }
        if (!data.noEndDate && (!this.state.endDate || this.state.endDate === '')) {
            hasError = true;
            errors.endDate = true;
        }

        if (hasError) {
            this.setState({ ...this.state, errors });
        }
        else {
            data.endDate = (data.noEndDate) ? null : new Date(data.endDate);

            if (!data.repeat) {
                data.ledger.push({
                    startDate: moment(data.startDate).startOf("day").toDate(),
                    endDate: moment(data.endDate).endOf("day").toDate(),
                    spent: 0,
                    amount: data.amount
                });
            }
            
            insert("budget", data, (success) => {
                if (success) {
                    this.props.history.push("/budget");
                }
            });
        }
    }

    componentDidMount = () => {
        selectAll("account").then((accounts) => {
            accounts.unshift({ accountId: 0, name: 'All' });
            this.setState({ ...this.state, accounts })
        });
        selectAll("category").then((categories) => {
            categories.unshift({ categoryId: 0, name: 'All' });
            this.setState({ ...this.state, categories });
        });
    }
    handleChangeProperty(property, e) {
        let value = e.target.value;
        if (property === "selectedAccounts") {
            let all = value.find(m => m.accountId === 0);
            let allFromState = this.state.selectedAccounts.find(m => m.accountId === 0);
            if (all !== null && all !== undefined && allFromState !== null && allFromState !== undefined) {
                value.shift();
            }
            else if (all !== null && all !== undefined) {
                value = this.state.accounts;
            }
        }
        else if (property === "selectedCategories") {
            let all = value.find(m => m.categoryId === 0);
            let allFromState = this.state.selectedCategories.find(m => m.categoryId === 0);
            if (all !== null && all !== undefined && allFromState !== null && allFromState !== undefined) {
                value.shift();
            }
            else if (all !== null && all !== undefined) {
                value = this.state.categories;
            }
        }
        else if (property === "noEndDate" || property === "showInDashboard") {
            value = value === "true";
            if (value) {
                this.setState({ ...this.state, endDate: '' });
            }
        }
        this.setState({ ...this.state, [property]: value });
    }

    formatCurrency(e) {
        let value = formatMoney(this.state.amount);
        this.setState({ ...this.state, "amount": value });
    }

    render() {
        return (
            <>
                <MyToolbar
                    onBack={() => { this.props.history.goBack() }}
                    showBackButton={true}
                    title="Add budget"
                    buttons={[
                        (<IconButton onClick={this.handleSave.bind(this)} color="inherit"><Save /></IconButton>)
                    ]}
                />
                <div className="content">
                    <TextField
                        error={this.state.errors.name}
                        label="Name"
                        value={this.state.name}
                        onChange={this.handleChangeProperty.bind(this, 'name')}
                        margin="normal"
                        className="form-control"
                    />
                    <FormControl className="form-control" margin="normal">
                        <InputLabel>Accounts</InputLabel>
                        <Select
                            error={this.state.errors.selectedAccounts}
                            multiple
                            value={this.state.selectedAccounts}
                            onChange={this.handleChangeProperty.bind(this, 'selectedAccounts')}
                            input={<Input id="select-multiple-checkbox" />}
                            renderValue={(selected) => selected.map(i => { return i.name }).join(",")}
                            MenuProps={styles.menuProps}>
                            {this.state.accounts.map((account, index) => (
                                <MenuItem key={index} value={account}>
                                    <Checkbox checked={this.state.selectedAccounts.map(f => { return f.accountId }).indexOf(account.accountId) > -1} />
                                    <ListItemText primary={account.name} />
                                </MenuItem>
                            ))}
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
                    />
                    <FormControl className="form-control" margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select
                            error={this.state.errors.selectedCategories}
                            multiple
                            value={this.state.selectedCategories}
                            onChange={this.handleChangeProperty.bind(this, 'selectedCategories')}
                            input={<Input id="select-multiple-checkbox" />}
                            renderValue={(selected) => selected.map(i => { return i.name }).join(",")}
                            MenuProps={styles.menuProps}>
                            {this.state.categories.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    <Checkbox checked={this.state.selectedCategories.map(f => { return f.categoryId }).indexOf(category.categoryId) > -1} />
                                    <ListItemText primary={category.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className="form-control" margin="normal">
                        <InputLabel>Repeat</InputLabel>
                        <Select
                            error={this.state.errors.repeat}
                            value={this.state.repeat}
                            onChange={this.handleChangeProperty.bind(this, 'repeat')}>
                            <MenuItem value={budgetRepeatEnum.none}>None</MenuItem>
                            <MenuItem value={budgetRepeatEnum.daily}>Daily</MenuItem>
                            <MenuItem value={budgetRepeatEnum.weekly}>Weekly</MenuItem>
                            <MenuItem value={budgetRepeatEnum.monthly}>Monthly</MenuItem>
                            <MenuItem value={budgetRepeatEnum.custom}>Custom</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        error={this.state.errors.startDate}
                        label="Start date"
                        type="date"
                        margin="normal"
                        className="form-control"
                        value={this.state.startDate}
                        onChange={this.handleChangeProperty.bind(this, 'startDate')}
                    />

                    <TextField
                        error={this.state.errors.endDate}
                        label="End date"
                        type="date"
                        margin="normal"
                        className="form-control"
                        disabled={this.state.noEndDate}
                        value={this.state.endDate}
                        onChange={this.handleChangeProperty.bind(this, 'endDate')}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.noEndDate}
                                onChange={this.handleChangeProperty.bind(this, 'noEndDate')}
                                value={!this.state.noEndDate}
                                color="primary"
                            />
                        }
                        label="no end date"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.showInDashboard}
                                onChange={this.handleChangeProperty.bind(this, 'showInDashboard')}
                                value={!this.state.showInDashboard}
                                color="primary"
                            />
                        }
                        label="show widget on dashboard"
                    />
                </div>
            </>
        )
    }
}

NewBudget.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewBudget);