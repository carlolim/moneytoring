import React, { Component } from 'react';
import Toolbar from "../common/toolbar";
import moment from "moment";

class NewExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            categoryId: 0,
            amount: '',
            accountId: 0,
            description: '',
            date: moment().format('YYYY-MM-DD[T]HH:mm'),
            accounts: [],
            categories: []
        }
    }

    componentDidMount () {
        this.loadAccounts(this);
        this.loadCategories(this);
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
        let value = window.formatMoney(this.state.amount);
        this.setState({...this.state, "amount": value});
    }

    handleSave () {
        var self = this;
        var data = {
            title: this.state.title,
            categoryId: this.state.categoryId,
            accountId: this.state.accountId,
            amount: parseFloat(this.state.amount.replace(/,/g, '')),
            description: this.state.description,
            date: new Date(this.state.date)
        };
        if (data.title === '') {
            alert('Title is required');
            this.refs["title"].focus();
            return;
        }
        else if (data.amount === 0 || isNaN(data.amount)) {
            alert('Amount is required');
            this.refs["amount"].focus();
            return;
        }
        else if (data.accountId === 0) {
            alert('Select account');
            this.refs["account"].focus();
            return;
        }
        else if (!this.state.date || this.state.date === '') {
            alert('Date is required');
            this.refs["date"].focus();
            return;
        }

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

    render() {
      return (
        <div>
            <Toolbar 
                showBackButton={true}
                title="Add expense"
                buttons={[
                    (<button onClick={this.handleSave.bind(this)}><i className="fas fa-save"></i></button>)
                ]}
            />
            <div className="content">
                <div className="p-3">
                    <div className="form-group">
                        <select ref="account" className="form-control" value={this.state.accountId} onChange={this.handleChangeProperty.bind(this, 'accountId')}>
                            <option>-select account-</option>
                            {this.state.accounts.map(item => <option key={item.accountId} value={item.accountId}>{item.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <input placeholder="Title" type="text" ref="title" className="form-control" value={this.state.title} onChange={this.handleChangeProperty.bind(this, 'title')} />
                    </div>
                    <div className="form-group">
                        <input placeholder="Amount" onBlur={this.formatCurrency.bind(this)} ref="amount" type="text" className="form-control text-right" value={this.state.amount} onChange={this.handleChangeProperty.bind(this, 'amount')} />
                    </div>
                    <div className="form-group">
                        <select className="form-control" value={this.state.categoryId} onChange={this.handleChangeProperty.bind(this, 'categoryId')}>
                            <option>-select category-</option>
                            {this.state.categories.map(item => <option key={item.categoryId} value={item.categoryId}>{item.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <input placeholder="Date" type="datetime-local" ref="date" className="form-control" value={this.state.date} onChange={this.handleChangeProperty.bind(this, 'date')} />
                    </div>
                    <div className="form-group">
                        <textarea placeholder="Description" rows="5" className="form-control" value={this.state.description} onChange={this.handleChangeProperty.bind(this, 'description')}></textarea>
                    </div>
                </div>
            </div>
        </div>
      );
    }
  }
  
  export default NewExpense;
  