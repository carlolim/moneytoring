import React, { Component } from 'react';
import MyToolbar from "../common/my-toolbar";
import moment from "moment";
import { formatMoney } from "../../helpers";
import IconButton from '@material-ui/core/IconButton';
import Done from '@material-ui/icons/Done';
import Delete from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { selectAll, update } from "../../helpers";
import { DialogTitle, Dialog, Button, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

class EditExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDelete: false,
            expenseId: Number(this.props.match.params.id),
            title: '',
            categoryId: 0,
            amount: '',
            accountId: 0,
            date: moment().format('YYYY-MM-DD[T]HH:mm'),
            description: '',
            accounts: [],
            categories: [],
            errors: {
                title: false,
                category: false,
                amount: false,
                account: false,
                date: false
            }
        }
    }

    componentDidMount() {
        selectAll("account").then((accounts) => {
            this.setState({ ...this.state, accounts });
        });
        selectAll("category").then((categories) => {
            this.setState({ ...this.state, categories });
        });
        this.loadExpense(this.state.expenseId, this);
    }

    loadExpense = (id, component) => {
        const requestDatabase = indexedDB.open("Moneytoring");
        requestDatabase.onsuccess = (event) => {
            var db = event.target.result;
            var transaction = db.transaction(["expense"], "readonly");

            var store = transaction.objectStore("expense");
            var select = store.get(id);

            transaction.oncomplete = (event) => {
                if (!select.result) {
                    this.props.history.push("/expense");
                    return;
                }
                component.setState({
                    ...component.state,
                    title: select.result.title,
                    categoryId: select.result.categoryId,
                    amount: formatMoney(select.result.amount),
                    accountId: select.result.accountId,
                    description: select.result.description,
                    date: moment(select.result.date).format('YYYY-MM-DD[T]HH:mm')
                });
            }
        }
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

    handleSave() {
        var self = this;
        var data = {
            expenseId: this.state.expenseId,
            title: this.state.title,
            categoryId: this.state.categoryId,
            accountId: this.state.accountId,
            amount: parseFloat(this.state.amount.replace(/,/g, '')),
            description: this.state.description,
            date: new Date(this.state.date)
        };

        let hasError = false;
        let errors = {
            title: false,
            category: false,
            amount: false,
            account: false,
            date: false
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
        if (!this.state.date || this.state.date === '') {
            errors.date = true;
            hasError = true;
        }

        if (hasError) {
            this.setState({ ...this.state, errors });
        }
        else {
            update("expense", data, (success) => {
                if (success) {
                    let filter = {
                        from: moment(data.date).hours(0).minutes(0).seconds(0),
                        to: moment(data.date).hours(0).hours(23).minutes(59).seconds(59),
                        viewType: 'daily'
                    };
                    localStorage.setItem("expensefilter", JSON.stringify(filter));
                    self.props.history.push("/expense");
                }
            })
        }
    }

    handleDelete = () => {
        const requestDatabase = indexedDB.open("Moneytoring");
        requestDatabase.onsuccess = (event) => {
            var db = event.target.result;
            var transaction = db.transaction("expense", "readwrite");
            var store = transaction.objectStore("expense");
            store.delete(this.state.expenseId);
            transaction.oncomplete = (event) => {
                this.props.history.push("/expense");
            }
        }
    }

    toggleDeleteModal = () => {
        this.setState({ ...this.state, showDelete: !this.state.showDelete });
    }

    render() {
        return (
            <>
                <MyToolbar
                    onBack={() => { this.props.history.goBack() }}
                    showBackButton={true}
                    title="Add expense"
                    buttons={[
                        (<IconButton onClick={this.toggleDeleteModal.bind(this)} color="inherit"><Delete /></IconButton>),
                        (<IconButton onClick={this.handleSave.bind(this)} color="inherit"><Done /></IconButton>)
                    ]}
                />
                <div className="content">
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
                        error={this.state.errors.date}
                        label="Date"
                        type="datetime-local"
                        margin="normal"
                        className="form-control"
                        value={this.state.date}
                        onChange={this.handleChangeProperty.bind(this, 'date')}
                    />
                    <TextField
                        className="form-control"
                        label="Notes"
                        multiline
                        rows="6"
                        value={this.state.description}
                        onChange={this.handleChangeProperty.bind(this, 'description')}
                        margin="normal"
                    />

                    <Dialog
                        onClose={this.toggleDeleteModal}
                        open={this.state.showDelete}>
                        <DialogTitle>Confirm</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Are you sure you want to delete?</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.toggleDeleteModal} color="primary" autoFocus>Cancel</Button>
                            <Button onClick={this.handleDelete} color="secondary">Delete</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </>
        );
    }
}

export default EditExpense;
