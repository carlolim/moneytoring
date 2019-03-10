import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { Grid, IconButton, Typography } from "@material-ui/core";
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import MyToolbar from "../common/my-toolbar";
import { selectById } from "../../helpers";
import CanvasJSReact from '../../canvassjs/canvasjs.react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const styles = {
    textCenter: {
        textAlign: 'center'
    }
}

class DetailsBudget extends Component {
    state = {
        budget: {
            "budgetId": 0,
            "name": "Loading...",
            "accountIds": [],
            "categoryIds": [],
            "amount": 0,
            "repeat": 0,
            "startDate": new Date(),
            "noEndDate": true,
            "endDate": null,
            "isActive": true,
            "ledger": [
                {
                    "startDate": new Date(),
                    "endDate": new Date(),
                    "spent": 0,
                    "amount": 0
                }
            ],
            "showInDashboard": true,
        },
        filterDate: '',
        options: {
            title: {
                text: "Basic Column Chart in React"
            },
            data: [{
                type: "column",
                dataPoints: [
                    { label: "Apple", y: 10 },
                    { label: "Orange", y: 15 },
                    { label: "Banana", y: 25 },
                    { label: "Mango", y: 30 },
                    { label: "Grape", y: 28 }
                ]
            }]
        }
    }

    async componentDidMount() {
        var budget = await selectById("budget", Number(this.props.match.params.id));
        this.setState({ budget });
    }

    render() {
        return (
            <>
                <MyToolbar
                    onBack={() => { this.props.history.goBack() }}
                    showBackButton={true}
                    title={this.state.budget.name}
                    buttons={[]}
                />
                <Grid container spacing={0}>
                    <Grid className={this.props.classes.textCenter} item xs={2}>
                        <IconButton>
                            <ArrowBackIos />
                        </IconButton>
                    </Grid>
                    <Grid className={this.props.classes.textCenter} item xs={8}>
                        <Typography variant="overline"></Typography>
                    </Grid>
                    <Grid className={this.props.classes.textCenter} item xs={2}>
                        <IconButton>
                            <ArrowForwardIos />
                        </IconButton>
                    </Grid>
                </Grid>
                <CanvasJSChart options={this.state.options}/* onRef = {ref => this.chart = ref} */ />
            </>
        )
    }
}

DetailsBudget.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DetailsBudget);