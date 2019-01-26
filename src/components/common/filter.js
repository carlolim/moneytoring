import React, { Component } from 'react';
import moment from "moment";

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
                to:''
            }
        }
    }

    changeViewType = (e) => {
        this.setState({...this.state, viewType: e.target.value });
    }

    changeStateValue = (parentProperty, childProperty, e) => {
        this.setState({...this.state, [parentProperty]: { ...this.state[parentProperty], [childProperty]: e.target.value }});
    }

    handleApply = () => {
        let startDate = new Date();
        let endDate = new Date();
        switch(this.state.viewType) {
            case 'daily':
                if(this.state.daily.date === '') {
                    alert ('Select date');
                    return;
                }
                else {
                    startDate = moment(this.state.daily.date).hours(0).minutes(0).seconds(0);
                    endDate = moment(this.state.daily.date).hours(23).minutes(59).seconds(59);
                }
                break;
            case 'weekly':
                if (this.state.weekly.week === '') {
                    alert('Select week');
                    return;
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
                    alert('Select month');
                    return;
                }
                else {
                    let monthParts = this.state.monthly.month.split('-');
                    startDate = moment().year(Number(monthParts[0])).month(Number(monthParts[1]) - 1).startOf('month');
                    endDate = moment().year(Number(monthParts[0])).month(Number(monthParts[1]) - 1).endOf('month');
                }
                break;
            case 'yearly':
                if (this.state.yearly.year === '' || isNaN(this.state.yearly.year)) {
                    alert('Select year');
                    return;
                }
                else {
                    let year = Number(this.state.yearly.year);
                    startDate = moment().year(year).startOf('year');
                    endDate = moment().year(year).endOf('year');
                }
                break;
           default: //custom range
                if(this.state.custom.from === ''){
                    alert('Select date from');
                    return;
                }
                else if(this.state.custom.to === '') {
                    alert('Selecte date to');
                    return;
                }
                else {
                    startDate = moment(this.state.custom.from).hours(0).minutes(0).seconds(0);
                    endDate = moment(this.state.custom.to).hours(23).minutes(59).seconds(59);
                }
        }
        this.props.applyFilter(startDate, endDate);
        this.props.close();
    }

    render() {
        return (
        <div className="modal" id="modalFilterExpense" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Filter expenses</h5>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>View</label>
                            <select value={this.state.viewType} onChange={this.changeViewType.bind(this)} className="form-control">
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                                <option value="custom">Custom range</option>
                            </select>
                        </div>
                        {this.state.viewType === 'daily' ?
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" className="form-control" value={this.state.daily.date} onChange={this.changeStateValue.bind(this, 'daily', 'date')} />
                            </div>
                        : null }
                        {this.state.viewType === 'weekly' ?
                            <div className="form-group">
                                <label>Week</label>
                                <input type="week" className="form-control" value={this.state.weekly.week} onChange={this.changeStateValue.bind(this, 'weekly', 'week')} />
                            </div>
                        : null }
                        {this.state.viewType === 'monthly' ?
                            <div className="form-group">
                                <label>Month</label>
                                <input type="month" className="form-control" value={this.state.monthly.month} onChange={this.changeStateValue.bind(this, 'monthly', 'month')} />
                            </div>
                        : null }
                        {this.state.viewType === 'yearly' ?
                            <div className="form-group">
                                <label>Year</label>
                                <input type="year" className="form-control" value={this.state.yearly.year} onChange={this.changeStateValue.bind(this, 'yearly', 'year')} />
                            </div>
                        : null }
                        {this.state.viewType === 'custom' ?
                            <div>
                                <div className="form-group">
                                    <label>From</label>
                                    <input type="date" className="form-control" value={this.state.custom.from} onChange={this.changeStateValue.bind(this, 'custom', 'from')} />
                                </div>
                                <div className="form-group">
                                    <label>To</label>
                                    <input type="date" className="form-control" value={this.state.custom.to} onChange={this.changeStateValue.bind(this, 'custom', 'to')} />
                                </div>
                            </div>
                        : null }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={this.handleApply.bind(this)}>Apply</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
  
  export default Filter;
  