import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { Grid, IconButton } from "@material-ui/core";
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import MyToolbar from "../common/my-toolbar";
import { selectById } from "../../helpers";

const styles = {
    textCenter: {
        textAlign: 'center'
    }
}

class DetailsBudget extends Component {
    state = {
        title: "Loading...",
        budget: undefined
    }

    async componentDidMount() {
        var budget = await selectById("budget", Number(this.props.match.params.id));
        this.setState({ budget, title: budget.name });
    }

    render() {
        return (
            <>
                <MyToolbar
                    onBack={() => { this.props.history.goBack() }}
                    showBackButton={true}
                    title={this.state.title}
                    buttons={[]}
                />
                <Grid container spacing={0}>
                    <Grid className={this.props.classes.textCenter} item xs={2}>
                        <IconButton>
                            <ArrowBackIos />
                        </IconButton>
                    </Grid>
                    <Grid className={this.props.classes.textCenter} item xs={8}>
                        gm niko
                    </Grid>
                    <Grid className={this.props.classes.textCenter} item xs={2}>
                        <IconButton>
                            <ArrowForwardIos />
                        </IconButton>
                    </Grid>
                </Grid>
            </>
        )
    }
}

DetailsBudget.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DetailsBudget);