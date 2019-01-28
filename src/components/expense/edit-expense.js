import React, { Component } from 'react';
import MyToolbar from "../common/my-toolbar";
import moment from "moment";
import { formatMoney } from "../../helpers";
import IconButton from '@material-ui/core/IconButton';
import Save from '@material-ui/icons/Save';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class EditExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    componentDidMount () {
        this.loadAccounts(this);
        this.loadCategories(this);
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
                if (!select.result){
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

    loadAccounts = (component) => {
        const requestDatabase = indexedDB.open("Moneytoring");
        requestDatabase.onsuccess = function (event) {
            var db = event.target.result;
            var transaction = db.transaction(["account"], "readonly");
    
            var accountStore = transaction.objectStore("account");
            var selectAccounts = accountStore.getAll();
            transaction.oncomplete = function (event) { 
                component.setState({...component.state, accounts: selectAccounts.result});
            }
        }
    }
    
    loadCategories = (component) => {
        const requestDatabase = indexedDB.open("Moneytoring");
        requestDatabase.onsuccess = function (event) {
            var db = event.target.result;
            var transaction = db.transaction(["category"], "readonly");
    
            var categoryStore = transaction.objectStore("category");
            var selectcategory = categoryStore.getAll();
            transaction.oncomplete = function (event) { 
                component.setState({...component.state, categories: selectcategory.result});
            }
        }
    }

    handleChangeProperty (property, e) {
        let value = e.target.value;
        if (property === 'accountId' || property === 'categoryId') {
            value = parseInt(e.target.value);
        }

        this.setState({...this.state, [property]: value});
    }

    formatCurrency (e) {
        let value = formatMoney(this.state.amount);
        this.setState({...this.state, "amount": value});
    }

    handleSave () {
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

        if(hasError) {
            this.setState({...this.state, errors});
        }
        else {
            const requestDatabase = indexedDB.open("Moneytoring");
            requestDatabase.onsuccess = function (event) {
                var db = event.target.result;
                var transaction = db.transaction("expense", "readwrite");
                var store = transaction.objectStore("expense");
                store.put(data);
                transaction.oncomplete = function (event) {
                    self.props.history.push("/expense");
                }
            }
        }
    }

    handleDelete = () => {
        const requestDatabase = indexedDB.open("Moneytoring");
        requestDatabase.onsuccess = (event) => {
            var db = event.target.result;
            var transaction = db.transaction("expense", "readwrite");
            var store = transaction.objectStore("expense");
            store.delete(this.state.expenseId);
            console.log(1);
            transaction.oncomplete = (event) => {
                window.$('#modalDanger').on('hidden.bs.modal', () => {
                    this.props.history.push("/expense");
                });
                window.$("#modalDanger").modal('hide');
            }
        }
    }

    render() {
      return (
        <>
            <MyToolbar 
                onBack={() => {this.props.history.goBack()}}
                showBackButton={true}
                title="Add expense"
                buttons={[
                    (<IconButton onClick={this.handleSave.bind(this)}  color="inherit"><Save /></IconButton>)
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
            </div>
        </>
      );
    }
  }
  
  export default EditExpense;
  