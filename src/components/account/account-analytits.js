import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { Typography } from "@material-ui/core";
import { getAccountExpensesBetweenDates } from "../../modules/expense-module";
import { selectById, formatMoney, selectAll } from "../../helpers";
import CanvasJSReact from '../../canvassjs/canvasjs.react';
import MyToolbar from "../common/my-toolbar";
import { getSingleUpdatedBalance } from "../../modules/account-module";

//const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const styles = {
    pieChart: {

    }
}

class AccountAnalytits extends Component {
    state = {
        account: {
            accountId: 0,
            name: 'Loading...',
            trackBalance: false,
            balance: '',
            startDate: '',
            initialBalance: ''
        },
        expenses: [],
        categories: [],
        pieChart: {
            exportEnabled: true,
            animationEnabled: true,
            data: [{
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 12,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    //{ y: 51.08, label: "Chrome" }
                ]
            }]
        }
    }

    async componentDidMount() {
        var account = await getSingleUpdatedBalance(Number(this.props.match.params.id));
        if (account) {
            var expenses = await getAccountExpensesBetweenDates(account.accountId, account.startDate, new Date(), 'desc');
            account.balance = formatMoney(account.balance);
            account.initialBalance = formatMoney(account.initialBalance);
            var categories = await selectAll("category");
            this.setState({ ...this.state, account, expenses, categories });
        }
    }

    render() {
        return (
            <>
                <MyToolbar
                    onBack={() => { this.props.history.goBack() }}
                    showBackButton={true}
                    title={this.state.account.name}
                    buttons={[]}
                />
                <div className="content">
                    <CanvasJSChart options={this.state.pieChart} />
                </div>
            </>
        )
    }
}

AccountAnalytits.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AccountAnalytits);