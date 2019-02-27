import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import MyToolbar from "../common/my-toolbar";
import { formatMoney, insertAsync, selectAll } from "../../helpers";
import IconButton from '@material-ui/core/IconButton';
import Done from '@material-ui/icons/Done';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const styles = {
    myClass: {
        font: 20,
        textAlign: 'center',
        width: '100%'
    }
}

class NewExpenseTemplate extends Component {
    state = {
        templateName: '',
        title: '',
        categoryId: 0,
        amount: '',
        accountId: 0,
        description: '',
        accounts: [],
        categories: [],
        errors: {
            templateName: false,
            title: false,
            category: false,
            amount: false,
            account: false
        }
    }

    async componentDidMount() {
        var accounts = await selectAll("account");
        var categories = await selectAll("category");
        this.setState({...this.state, accounts, categories});
    }

    handleChangeProperty(property, e) {
        let value = e.target.value;
        if (property === 'accountId' || property === 'categoryId') {
            value = parseInt(e.target.value);
        }

        this.setState({ ...this.state, [property]: value });
    }
    
    formatCurrency(e) {
        let value = formatMoney(this.state.amount);
        this.setState({ ...this.state, "amount": value });
    }


    async handleSave() {
        var data = {
            templateName: this.state.templateName,
            title: this.state.title,
            categoryId: this.state.categoryId,
            accountId: this.state.accountId,
            amount: parseFloat(this.state.amount.replace(/,/g, '')),
            description: this.state.description
        };

        let hasError = false;
        let errors = {
            templateName: false,
            title: false,
            category: false,
            amount: false,
            account: false
        }
        if(data.templateName === '') {
            errors.templateName = true;
            hasError = true;
        }
        if (data.title === '') {
            errors.title = true;
            hasError = true;
        }
        if (data.amount === 0 || isNaN(data.amount)) {
            errors.amount = true;
            hasError = true;
        }
        if (data.accountId === 0) {
            errors.account = true;
            hasError = true;
        }
        if (data.categoryId === 0) {
            errors.category = true;
            hasError = true;
        }

        if (hasError) {
            this.setState({ ...this.state, errors });
        }
        else {
            var result = await insertAsync("expenseTemplate", data);
            if (result) {
                this.props.history.push("/expensetemplates");
            }
        }
    }

    render () {
        return (
            <>
                <MyToolbar
                    onBack={() => { this.props.history.goBack() }}
                    showBackButton={true}
                    title="Add expense template"
                    buttons={[
                        (<IconButton onClick={this.handleSave.bind(this)} color="inherit"><Done /></IconButton>)
                    ]}
                />
                <div className="content">
                    <TextField
                        error={this.state.errors.templateName}
                        label="Template name"
                        value={this.state.templateName}
                        onChange={this.handleChangeProperty.bind(this, 'templateName')}
                        margin="normal"
                        className="form-control"
                    />
                    <FormControl className="form-control" margin="normal">
                        <InputLabel>Account</InputLabel>
                        <Select
                            error={this.state.errors.account}
                            value={this.state.accountId}
                            onChange={this.handleChangeProperty.bind(this, 'accountId')}>
                            <MenuItem value={0}><em>select account</em></MenuItem>
                            {this.state.accounts.map(item => <MenuItem key={item.accountId} value={item.accountId}>{item.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField
                        error={this.state.errors.title}
                        label="Title"
                        value={this.state.title}
                        onChange={this.handleChangeProperty.bind(this, 'title')}
                        margin="normal"
                        className="form-control"
                    />
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
                            error={this.state.errors.category}
                            value={this.state.categoryId}
                            onChange={this.handleChangeProperty.bind(this, 'categoryId')}>
                            <MenuItem value={0}><em>select category</em></MenuItem>
                            {this.state.categories.map(item => <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField
                        className="form-control"
                        label="Notes"
                        multiline
                        rows="6"
                        value={this.state.description}
                        onChange={this.handleChangeProperty.bind(this, 'description')}
                        margin="normal"
                    />
                </div>
            </>
        )
    }
}

NewExpenseTemplate.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewExpenseTemplate);