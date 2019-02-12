import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { formatMoney } from "../../../helpers";
import { Typography, Card, CardContent, LinearProgress } from "@material-ui/core";
import { getExpensesOfBudgetLedger } from "../../../modules/budget-module";

const styles = {
    card: {
        minWidth: 275,
        marginBottom: 10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    progressGreen: {
        backgroundColor: '#b2dfdb'
    },
    progressBarGreen: {
        backgroundColor: '#00695c'
    },
    progressYellow: {
        backgroundColor: '#eaec60'
    },
    progressBarYellow: {
        backgroundColor: '#bfc11d'
    },
    progressRed: {
        backgroundColor: '#ec8686'
    },
    progressBarRed: {
        backgroundColor: '#de0b0b'
    },
    lineHeight: {
        lineHeight: 1,
        marginTop: 5,
        display: 'inline-block'
    },
    floatRight: {
        float: 'right',
        textAlign: 'right'
    },
    textCenter: {
        textAlign: 'center'
    }
}


class BudgetSummary extends Component {
    state = {
        spent: 0
    };
    componentDidMount () {
        getExpensesOfBudgetLedger(this.props.budget.ledger[0], this.props.budget.accountIds, this.props.budget.categoryIds).then((expenses) => {
            if (expenses.length > 0) {
                let spent = 0;
                for (var i =0; i<expenses.length; i++) {
                    spent += expenses[i].amount;
                }
                this.setState({...this.state, spent});
            }
        });
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

    render() {
        return (
            <Card className={this.props.classes.card}>
                <CardContent>
                    <Typography className={this.props.classes.title} variant="title" color="textPrimary" gutterBottom>{this.props.budget.name}</Typography>
                    <Typography variant="overline" className={this.props.classes.textCenter}>Total: {formatMoney(this.props.budget.amount)}</Typography>
                    <LinearProgress
                        variant="determinate" value={(this.state.spent / this.props.budget.amount) * 100}
                        classes={this.progressBarClassName((this.state.spent / this.props.budget.amount) * 100)}
                    />
                    <div>
                        <Typography variant="caption" className={this.props.classes.lineHeight}>Spent<br />{formatMoney(this.state.spent)}</Typography>
                        <Typography variant="caption" className={`${this.props.classes.lineHeight} ${this.props.classes.floatRight}`}>Remaining<br />{formatMoney(this.props.budget.amount - this.state.spent)}</Typography>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

BudgetSummary.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BudgetSummary);