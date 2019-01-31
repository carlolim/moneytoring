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
        super (props);
        this.state = {
            name: '',
            selectedAccounts: [],
            isActive: true,
            repeat: budgetRepeatEnum.none,
            startDate: moment().format('YYYY-MM-DD[T]HH:mm'),
            endDate: moment().format('YYYY-MM-DD[T]HH:mm'),
            amount: 0,
            categoryIds: [],
            accounts: [],
            categories: [],
            errors: {
                name: false,
                selectedAccounts: false,
                repeat: false,
                startDate: false,
                endDate: false,
                amount: false,
                categoryIds: false
            }
        }
    }

    componentDidMount = () => {
        selectAll("account", this.loadAccounts);
        selectAll("category", this.loadCategories);
    }

    loadAccounts = (accounts) => {
        this.setState({...this.state, accounts: {accountId: 0, name: 'All'}, accounts})
    }

    loadCategories = (categories) => {
        this.setState({...this.state, categories: [ {categoryId: 0, name: 'All'}, categories]});
    }

    handleChangeProperty (property, e) {
        let value = e.target.value;
        // if (property === "accountIds") {
        //     let options = e.target.value;
        //     value = [];
        //     console.log(options.length);
        //     for (let i = 0; i < options.length; i++) {
        //         if(options[i].selected) {
        //             value.push(options[i].accountId);
        //         }
        //     }
        // }

        this.setState({...this.state, [property]: value});
    }

    handleSave = () => {}

    render () {
        return (
            <>
            <MyToolbar 
                onBack={() => {this.props.history.goBack()}}
                showBackButton={true}
                title="Add budget"
                buttons={[
                    (<IconButton onClick={this.handleSave.bind(this)}  color="inherit"><Save /></IconButton>)
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
                        renderValue={selected => {console.log(selected);selected.join(', ')}}
                        MenuProps={styles.menuProps}>
                        {this.state.accounts.map(account => (
                            <MenuItem key={account.accountId} value={account.accountId}>
                                <Checkbox checked={this.state.selectedAccounts.map(f => {return f.accountId}).indexOf(account.accountId) > -1} />
                                <ListItemText primary={account.name} />
                            </MenuItem>
                        ))}
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