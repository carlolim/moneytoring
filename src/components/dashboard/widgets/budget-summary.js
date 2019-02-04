import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { formatMoney } from "../../../helpers";
import { Typography, Card, CardActions, CardContent, Button, LinearProgress } from "@material-ui/core";

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
                        variant="determinate" value={(this.props.budget.spent / this.props.budget.amount) * 100}
                        classes={this.progressBarClassName((this.props.budget.spent / this.props.budget.amount) * 100)}
                    />
                    <div>
                        <Typography variant="caption" className={this.props.classes.lineHeight}>Spent<br />{formatMoney(this.props.budget.spent)}</Typography>
                        <Typography variant="caption" className={`${this.props.classes.lineHeight} ${this.props.classes.floatRight}`}>Remaining<br />{formatMoney(this.props.budget.amount - this.props.budget.spent)}</Typography>
                    </div>



                    {/* <Typography variant="h5" component="h2">asdasd</Typography>
                    <Typography className={this.props.classes.pos} color="textSecondary">adjective</Typography>
                    <Typography component="p">well meaning and kindly.<br />{'"a benevolent smile"'}</Typography> */}
                </CardContent>
                {/* <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions> */}
            </Card>
        )
    }
}

BudgetSummary.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BudgetSummary);