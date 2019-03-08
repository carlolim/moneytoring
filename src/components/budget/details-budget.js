import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import MyToolbar from "../common/my-toolbar";
import { selectById } from "../../helpers";

const styles = {
}

class DetailsBudget extends Component {
    state = {
        title: "Loading...",
        budget: undefined
    }

    async componentDidMount () {
        var budget = await selectById("budget", Number(this.props.match.params.id));
        this.setState({budget, title: budget.name});
    }

    render () {
        return (
            <>
                <MyToolbar 
                    onBack={() => { this.props.history.goBack() }}
                    showBackButton={true}
                    title={this.state.title}
                    buttons={[]}
                />
                <Grid container spacing={0}>
                </Grid>
            </>
        )
    }
}

DetailsBudget.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DetailsBudget);