import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import MyToolbar from "../common/my-toolbar";
import moment from "moment";
import { formatMoney, budgetRepeatEnum } from "../../helpers";
import { selectAll } from "../../helpers";
import IconButton from '@material-ui/core/IconButton';
import Save from '@material-ui/icons/Save';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { MenuItem, Input, Checkbox, ListItemText } from "@material-ui/core";


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
            selectedAccounts: [],
            isActive: true,
            repeat: budgetRepeatEnum.none,
            startDate: moment().format('YYYY-MM-DD[T]HH:mm'),
            endDate: moment().format('YYYY-MM-DD[T]HH:mm'),
            amount: 0,
            selectedCategories: [],
            accounts: [],
            categories: [],
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

    componentDidMount = () => {
        selectAll("account", this.loadAccounts);
        selectAll("category", this.loadCategories);
    }

    loadAccounts = (accounts) => {
        accounts.unshift({ accountId: 0, name: 'All' });
        this.setState({ ...this.state, accounts })
    }

    loadCategories = (categories) => {
        categories.unshift({ categoryId: 0, name: 'All' });
        this.setState({ ...this.state, categories });
    }

    handleChangeProperty(property, e) {
        let value = e.target.value;
        console.log(value);
        if (property === "selectedAccounts") {
            let all = value.find(m => m.accountId === 0);
            if (all !== null && all !== undefined) {
                value = this.state.accounts;
            }
        }
        else if (property === "selectedCategories") {
            let all = value.find(m => m.categoryId === 0);
            console.log(all);
            if (all !== null && all !== undefined) {
                value = this.state.categories;
            }
        }
        this.setState({ ...this.state, [property]: value });
    }

    formatCurrency(e) {
        let value = formatMoney(this.state.amount);
        this.setState({ ...this.state, "amount": value });
    }

    handleSave = () => { }

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
                            error={this.state.errors.account}
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
                </div>
            </>
        )
    }
}

NewBudget.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewBudget);