import React, { Component } from 'react';
import Toolbar from "../common/toolbar";
import moment from "moment";
import ModalDanger from "../common/modal-danger";

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
            categories: []
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
                    amount: window.formatMoney(select.result.amount),
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
        let value = window.formatMoney(this.state.amount);
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

        console.log(data);
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
        <div>
            <Toolbar 
                showBackButton={true}
                title="Edit expense"
                buttons={[
                    (<button data-toggle="modal" data-target="#modalDanger" onClick={() => {}}><i className="fas fa-trash-alt"></i></button>),
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
            <ModalDanger title="Confirm" body="Are you sure you want to delete this?" callback={this.handleDelete.bind(this)} />
        </div>
      );
    }
  }
  
  export default EditExpense;
  