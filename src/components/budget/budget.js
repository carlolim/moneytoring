import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import MyToolbarWithNavigation from "../common/my-toolbar-with-navigation";
import { Typography, Fab, LinearProgress, Select, MenuItem } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { selectAll } from "../../helpers";
import { formatMoney, budgetRepeatEnum } from "../../helpers";


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
    }
}

class Budget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            percent: 100
        }
    }

    componentDidMount = () => {
        selectAll("budget", this.renderItems);
    }

    renderItems = (items) => {
        this.setState({ ...this.state, items });
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
            <>
                <MyToolbarWithNavigation title="Budget" buttons={[
                    <Select
                        className={this.props.classes.filter}
                        value={0}>
                        <MenuItem value={budgetRepeatEnum.none}>All</MenuItem>
                        <MenuItem value={budgetRepeatEnum.daily}>Daily</MenuItem>
                        <MenuItem value={budgetRepeatEnum.weekly}>Weekly</MenuItem>
                        <MenuItem value={budgetRepeatEnum.monthly}>Monthly</MenuItem>
                        <MenuItem value={budgetRepeatEnum.custom}>Custom</MenuItem>
                    </Select>
                ]} />
                <div className="content">
                    <LinearProgress variant="determinate" value={this.state.percent}
                        classes={this.progressBarClassName(this.state.percent)}
                    />
                </div>
                <Fab onClick={() => { this.props.history.push('budget/new') }} color="primary" className={this.props.classes.fab}>
                    <AddIcon />
                </Fab>
            </>
        )
    }
}

Budget.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Budget);