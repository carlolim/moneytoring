import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import MyToolbarWithNavigation from "../common/my-toolbar-with-navigation";
import { Typography, Fab, Select, MenuItem, Divider } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { selectAll } from "../../helpers";
import { budgetRepeatEnum } from "../../helpers";
import { getBudgetRepeatTypeForMoment } from "../../modules/budget-module";
import BudgetSummary from "../dashboard/widgets/budget-summary";
import moment from "moment";


const styles = {
    fab: {
        position: 'fixed',
        bottom: 15,
        right: 15
    },
    filter: {
        color: '#fff',
        borderColor: '#fff'
    },
    divider: {
        marginBottom: 20
    }
}

class Budget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nonRepeating: {
                items: []
            },
            weekly: {
                start: moment().startOf("week"),
                end: moment().endOf("week"),
                items: []
            },
            monthly: {
                start: moment().startOf("month"),
                end: moment().endOf("month"),
                items: []
            },
            daily: {
                start: moment().startOf("day"),
                end: moment().endOf("day"),
                items: []
            },
            display: 'all'
        }
    }

    componentDidMount = () => {
        selectAll("budget").then((items) => {
            let daily = [];
            let weekly = [];
            let monthly = [];
            let nonRepeating = [];
            for (var i = 0; i < items.length; i++) {
                let budget = items[i];
                if (budget.repeat) {
                    let ledger = this.validateBudget(budget);
                    if (ledger != null) {
                        budget.ledger = [ledger];
                        if (budget.repeat === budgetRepeatEnum.daily) daily.push(budget);
                        else if (budget.repeat === budgetRepeatEnum.weekly) weekly.push(budget);
                        else if (budget.repeat === budgetRepeatEnum.monthly) monthly.push(budget);
                    }
                }
                else {
                    budget.ledger[0].endDate = budget.noEndDate ? new Date() : budget.ledger[0].endDate;
                    nonRepeating.push(budget);
                }
            }
            this.setState({
                ...this.state,
                daily: { ...this.state.daily, items: daily },
                weekly: { ...this.state.weekly, items: weekly },
                monthly: { ...this.state.monthly, items: monthly },
                nonRepeating: { ...this.state.nonRepeating, items: nonRepeating }
            });
        });
    }

    validateBudget = (budget) => {
        let type = getBudgetRepeatTypeForMoment(budget);
        if (type) {
            if (moment(budget.startDate).startOf(type).toDate() <= moment().startOf(type).toDate() &&
                (budget.noEndDate || moment(budget.endDate).endOf(type).toDate() >= moment().endOf(type))) {
                let ledger = budget.ledger.find(m => m.startDate.toString() === moment().startOf(type).toDate().toString() && m.endDate.toString() === moment().endOf(type).toDate().toString());
                if (ledger === undefined || ledger === null) {
                    ledger = { startDate: moment().startOf(type).toDate(), endDate: moment().endOf(type).toDate(), spent: 0, amount: budget.amount };
                }
                return ledger;
            }
        }
        return null;
    }

    progressBarClassName = (percent) => {
        let result = {
            colorPrimary: this.props.classes.progressGreen,
            barColorPrimary: this.props.classes.progressBarGreen
        }
        if (percent > 50 && percent <= 75) {
            result.colorPrimary = this.props.classes.progressYellow;
            result.barColorPrimary = this.props.classes.progressBarYellow;
        }
        else if (percent > 75) {
            result.colorPrimary = this.props.classes.progressRed;
            result.barColorPrimary = this.props.classes.progressBarRed;
        }
        return result;
    }

    changeDisplay = (event) => {
        this.setState({ ...this.state, display: event.target.value });
    }

    render() {
        return (
            <>
                <MyToolbarWithNavigation title="Budget" buttons={[
                    <Select
                        className={this.props.classes.filter}
                        value="all" onChange={this.changeDisplay.bind(this)}>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                ]} />

                {this.state.display === 'all' ?
                    this.state.nonRepeating.items.map((item, i) =>
                        <div key={i} className="content">
                            <Link style={{ textDecoration: 'none' }} to={`/budget/edit/${item.budgetId}`}>
                                <BudgetSummary budget={item} />
                            </Link>
                        </div>
                    ) : null}

                {this.state.display === 'all' || this.state.display === 'daily' ?
                    <RenderItems items={this.state.daily.items} label="Daily" classes={this.props.classes} />
                    : null}

                {this.state.display === 'all' || this.state.display === 'weekly' ?
                    <RenderItems items={this.state.weekly.items} label="Weekly" classes={this.props.classes} />
                    : null}

                {this.state.display === 'all' || this.state.display === 'monthly' ?
                    <RenderItems items={this.state.monthly.items} label="Monthly" classes={this.props.classes} />
                    : null}

                <Fab onClick={() => { this.props.history.push('budget/new') }} color="primary" className={this.props.classes.fab}>
                    <AddIcon />
                </Fab>
            </>
        )
    }
}

const RenderItems = (props) => (
    <>
        {props.items.length > 0 ?
            <>
                <Divider className={props.classes.divider} />
                <Typography variant="button" align="center">{props.label}</Typography>
                {props.items.map((item, i) =>
                    <div key={i} className="content">
                        <Link style={{ textDecoration: 'none' }} to={`/budget/edit/${item.budgetId}`}>
                            <BudgetSummary budget={item} />
                        </Link>
                    </div>
                )}
            </>
            : null}
    </>
)

Budget.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Budget);