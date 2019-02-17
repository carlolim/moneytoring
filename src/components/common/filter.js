import React, { Component } from 'react';
import moment from "moment";
import {
    withStyles, Button, DialogActions,
    DialogContent, DialogTitle, FormControl,
    InputLabel, Select, MenuItem, TextField,
    Input, Checkbox, ListItemText
} from "@material-ui/core";
import PropTypes from 'prop-types';
import { selectAll } from '../../helpers';

const styles = {
    menuProps: {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
            },
        },
    }
}
class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType: 'daily',
            daily: {
                date: moment().format('YYYY-MM-DD')
            },
            weekly: {
                week: ''
            },
            monthly: {
                month: ''
            },
            yearly: {
                year: ''
            },
            custom: {
                from: '',
                to: ''
            },
            accounts: [],
            selectedAccounts: [],
            categories: [],
            selectedCategories: [],
            errors: {
                daily: false,
                weekly: false,
                monthly: false,
                yearly: false,
                from: false,
                to: false,
                selectedAccounts: false,
                selectedCategories: false
            }
        }
    }

    async componentDidMount() {
        let accounts = await selectAll("account");
        let categories = await selectAll("category");
        accounts.unshift({ accountId: 0, name: "All" })
        categories.unshift({ categoryId: 0, name: "All" })
        this.setState({ ...this.state, accounts, categories });

        let currentFilter = localStorage.getItem("expensefilter");
        if (currentFilter !== null && currentFilter !== undefined) {
            currentFilter = JSON.parse(currentFilter);
            if (currentFilter.selectedAccounts !== undefined && currentFilter.selectedCategories !== undefined) {
                this.setState({ ...this.state, selectedAccounts: currentFilter.selectedAccounts, selectedCategories: currentFilter.selectedCategories });
            }
        }
        else {
            currentFilter = {};
        }
    }

    changeViewType = (e) => {
        this.setState({ ...this.state, viewType: e.target.value });
    }

    changeStateValue = (parentProperty, childProperty, e) => {
        this.setState({ ...this.state, [parentProperty]: { ...this.state[parentProperty], [childProperty]: e.target.value } });
    }

    handleApply = () => {
        let startDate = new Date();
        let endDate = new Date();
        let errors = {
            daily: false,
            weekly: false,
            monthly: false,
            yearly: false,
            from: false,
            to: false,
            selectedAccounts: false,
            selectedCategories: false
        };
        let hasError = false;
        switch (this.state.viewType) {
            case 'daily':
                if (this.state.daily.date === '') {
                    hasError = true;
                    errors.daily = true;
                }
                else {
                    startDate = moment(this.state.daily.date).hours(0).minutes(0).seconds(0);
                    endDate = moment(this.state.daily.date).hours(23).minutes(59).seconds(59);
                }
                break;
            case 'weekly':
                if (this.state.weekly.week === '') {
                    hasError = true;
                    errors.weekly = true;
                }
                else {
                    let weekParts = this.state.weekly.week.split('-');
                    let weekNumber = Number(weekParts[1].replace('W', ''));
                    startDate = moment().year(Number(weekParts[0])).week(weekNumber).startOf('week');
                    endDate = moment().year(Number(weekParts[0])).week(weekNumber).endOf('week');
                }
                break;
            case 'monthly':
                if (this.state.monthly.month === '') {
                    hasError = true;
                    errors.monthly = true;
                }
                else {
                    let monthParts = this.state.monthly.month.split('-');
                    startDate = moment().year(Number(monthParts[0])).month(Number(monthParts[1]) - 1).startOf('month');
                    endDate = moment().year(Number(monthParts[0])).month(Number(monthParts[1]) - 1).endOf('month');
                }
                break;
            case 'yearly':
                if (this.state.yearly.year === '' || isNaN(this.state.yearly.year)) {
                    hasError = true;
                    errors.yearly = true;
                }
                else {
                    let year = Number(this.state.yearly.year);
                    startDate = moment().year(year).startOf('year');
                    endDate = moment().year(year).endOf('year');
                }
                break;
            default: //custom range
                if (this.state.custom.from === '') {
                    hasError = true;
                    errors.from = true;
                }
                else if (this.state.custom.to === '') {
                    hasError = true;
                    errors.to = true;
                }
                else {
                    startDate = moment(this.state.custom.from).hours(0).minutes(0).seconds(0);
                    endDate = moment(this.state.custom.to).hours(23).minutes(59).seconds(59);
                }
        }
        
        if (this.state.selectedAccounts.length === 0){
            errors.selectedAccounts = true;
            hasError = true;
        }
        if (this.state.selectedCategories.length === 0) {
            errors.selectedCategories = true;
            hasError = true;
        }

        if (hasError) {
            this.setState({ ...this.state, errors });
        }
        else {
            this.props.applyFilter(startDate, endDate, this.state.viewType, this.state.selectedAccounts, this.state.selectedCategories);
        }
    }

    handleChangeProperty(property, e) {
        let value = e.target.value;
        if (property === "selectedAccounts") {
            let all = value.find(m => m.accountId === 0);
            if (all !== null && all !== undefined) {
                value = this.state.accounts;
            }
        }
        else if (property === "selectedCategories") {
            let all = value.find(m => m.categoryId === 0);
            if (all !== null && all !== undefined) {
                value = this.state.categories;
            }
        }
        this.setState({ ...this.state, [property]: value });
    }

    render() {
        return (
            <>
                <DialogTitle>Filter expense</DialogTitle>
                <DialogContent>

                    <FormControl className="form-control" margin="normal">
                        <InputLabel>Accounts</InputLabel>
                        <Select
                            error={this.state.errors.selectedAccounts}
                            multiple
                            value={this.state.selectedAccounts}
                            onChange={this.handleChangeProperty.bind(this, 'selectedAccounts')}
                            input={<Input id="select-multiple-checkbox1" />}
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

                    <FormControl className="form-control" margin="normal">
                        <InputLabel>Categories</InputLabel>
                        <Select
                            error={this.state.errors.selectedCategories}
                            multiple
                            value={this.state.selectedCategories}
                            onChange={this.handleChangeProperty.bind(this, 'selectedCategories')}
                            input={<Input id="select-multiple-checkbox2" />}
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
                        <InputLabel>View</InputLabel>
                        <Select
                            value={this.state.viewType} onChange={this.changeViewType.bind(this)}>
                            <MenuItem value="daily"><em>Daily</em></MenuItem>
                            <MenuItem value="weekly"><em>Weekly</em></MenuItem>
                            <MenuItem value="monthly"><em>Monthly</em></MenuItem>
                            <MenuItem value="yearly"><em>Yearly</em></MenuItem>
                            <MenuItem value="custom"><em>Custom</em></MenuItem>
                        </Select>
                    </FormControl>

                    {this.state.viewType === 'daily' ?
                        <TextField
                            error={this.state.errors.daily}
                            ref="title"
                            label="Date"
                            value={this.state.daily.date}
                            onChange={this.changeStateValue.bind(this, 'daily', 'date')}
                            margin="normal"
                            type="date"
                            className="form-control"
                        />
                        : null}
                    {this.state.viewType === 'weekly' ?
                        <TextField
                            error={this.state.errors.weekly}
                            ref="title"
                            label="Week"
                            value={this.state.weekly.week}
                            onChange={this.changeStateValue.bind(this, 'weekly', 'week')}
                            margin="normal"
                            type="week"
                            className="form-control"
                        />
                        : null}
                    {this.state.viewType === 'monthly' ?
                        <TextField
                            error={this.state.errors.monthly}
                            ref="title"
                            label="Month"
                            value={this.state.monthly.month}
                            onChange={this.changeStateValue.bind(this, 'monthly', 'month')}
                            margin="normal"
                            type="month"
                            className="form-control"
                        />
                        : null}
                    {this.state.viewType === 'yearly' ?
                        <TextField
                            error={this.state.errors.yearly}
                            ref="title"
                            label="Year"
                            value={this.state.yearly.year}
                            onChange={this.changeStateValue.bind(this, 'yearly', 'year')}
                            margin="normal"
                            className="form-control"
                            type="number"
                        />
                        : null}
                    {this.state.viewType === 'custom' ?
                        <>
                            <TextField
                                error={this.state.errors.from}
                                ref="title"
                                label="From"
                                value={this.state.custom.from}
                                onChange={this.changeStateValue.bind(this, 'custom', 'from')}
                                margin="normal"
                                type="date"
                                className="form-control"
                            />
                            <TextField
                                error={this.state.errors.to}
                                ref="title"
                                label="To"
                                value={this.state.custom.to}
                                onChange={this.changeStateValue.bind(this, 'custom', 'to')}
                                margin="normal"
                                type="date"
                                className="form-control"
                            />
                        </>
                        : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.close} color="secondary">Cancel</Button>
                    <Button onClick={this.handleApply.bind(this)} color="primary">Apply</Button>
                </DialogActions>
            </>
        );
    }
}

Filter.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Filter);